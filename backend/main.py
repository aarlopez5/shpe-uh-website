from datetime import datetime, timedelta
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from typing import Annotated
from fastapi.security import OAuth2PasswordRequestForm

from models.user.user import User
from models.user.user_schemas import UserCreate, UserOut
from models.user.multi_selections.user_race_ethnicity import UserRaceEthnicity
from models.user.multi_selections.user_prof_dev import UserProfDev
from models.user.multi_selections.user_interested_industries import UserInterestedIndustries
from models.user.multi_selections.user_country_origin import UserCountryOrigin
from database import create_db
from security.jwt import Token, ACCESS_TOKEN_EXPIRE_MINUTES, create_access_token
from services.auth_user import authenticate_user
from services.create_user import create_user
from services.dependencies import get_current_user, SessionDependencies
from services.get_user import get_user_by_email
from validators.email import normalize_email
from sqlmodel import select
from models.event import Event, EventOut
from models.committee import Committee, CommitteeMembership, CommitteeOut, ChairOut, MemberOut
from models.committee_message import CommitteeMessage, CommitteeMessageCreate, CommitteeMessageOut
from models.notification import Notification, NotificationOut

# Inits the DB
@asynccontextmanager
async def lifespan(app):
    create_db()
    yield

app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Returns token after login
@app.post('/login')
async def login_for_token(form_data: Annotated[OAuth2PasswordRequestForm, Depends()], session: SessionDependencies) -> Token:
    email = normalize_email(form_data.username)
    user = authenticate_user(session, email, form_data.password)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(data={"sub": user.cougarnet_email}, expires_delta=access_token_expires)
    return Token(access_token=access_token, token_type="bearer")

# Returns current user if authenticated by JWT
@app.get('/me', response_model=UserOut)
async def me(user: Annotated[User, Depends(get_current_user)], session: SessionDependencies):
    race = session.exec(select(UserRaceEthnicity).where(UserRaceEthnicity.user_id == user.id)).all()
    industries = session.exec(select(UserInterestedIndustries).where(UserInterestedIndustries.user_id == user.id)).all()
    prof_devs = session.exec(select(UserProfDev).where(UserProfDev.user_id == user.id)).all()
    countries = session.exec(select(UserCountryOrigin).where(UserCountryOrigin.user_id == user.id)).all()
    return UserOut(
        **user.model_dump(),
        race_and_ethnicity=[r.race_and_ethnicity for r in race],
        interested_industries=[i.interested_industry for i in industries],
        prof_dev=[p.prof_dev for p in prof_devs],
        country_origin=[c.country_origin for c in countries],
    )

# Creates user form sign up
@app.post('/signup', status_code=status.HTTP_201_CREATED)
async def signup(user_in: UserCreate, session: SessionDependencies):
    existing_user = get_user_by_email(session, normalize_email(user_in.cougarnet_email))
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Email is already registered"
        )


    user_db = create_user(session, user_in)

    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(data={"sub": user_db.cougarnet_email}, expires_delta=access_token_expires)

    return Token(access_token=access_token, token_type="bearer")

@app.get('/events/upcoming', response_model=list[EventOut])
async def get_upcoming_events(
    user: Annotated[User, Depends(get_current_user)],
    session: SessionDependencies,
    days: int = 7,
):
    now = datetime.utcnow()
    cutoff = now + timedelta(days=days)
    stmt = (
        select(Event)
        .where(Event.start_time >= now, Event.start_time <= cutoff)
        .order_by(Event.start_time)
    )
    return session.exec(stmt).all()


def get_committee_or_404(session, committee_id: int) -> Committee:
    committee = session.get(Committee, committee_id)
    if not committee:
        raise HTTPException(status_code=404, detail="Committee not found")
    return committee


def require_chair(committee: Committee, user: User) -> None:
    if committee.chair_role is None or user.role != committee.chair_role:
        raise HTTPException(status_code=403, detail="Only this committee's chair can do that")


def is_active_member(session, committee_id: int, user_id: int) -> bool:
    membership = session.exec(
        select(CommitteeMembership).where(
            CommitteeMembership.user_id == user_id,
            CommitteeMembership.committee_id == committee_id,
            CommitteeMembership.status == True,  # noqa: E712
        )
    ).first()
    return membership is not None


@app.get('/committees', response_model=list[CommitteeOut])
async def get_committees(
    user: Annotated[User, Depends(get_current_user)],
    session: SessionDependencies,
):
    committees = session.exec(select(Committee)).all()
    memberships = session.exec(
        select(CommitteeMembership).where(
            CommitteeMembership.user_id == user.id,
            CommitteeMembership.status == True,  # noqa: E712
        )
    ).all()
    member_ids = {m.committee_id for m in memberships}

    # Map each chair role to the user who holds it
    chair_roles = {c.chair_role for c in committees if c.chair_role is not None}
    chairs_by_role = {}
    if chair_roles:
        chair_users = session.exec(select(User).where(User.role.in_(chair_roles))).all()
        chairs_by_role = {u.role: u for u in chair_users}

    result = []
    for c in committees:
        chair_user = chairs_by_role.get(c.chair_role) if c.chair_role is not None else None
        result.append(
            CommitteeOut(
                id=c.id,
                name=c.name,
                description=c.description,
                is_member=c.id in member_ids,
                is_chair=c.chair_role is not None and user.role == c.chair_role,
                chair=ChairOut(
                    first_name=chair_user.first_name,
                    last_name=chair_user.last_name,
                    personal_email=chair_user.personal_email,
                ) if chair_user else None,
            )
        )
    return result


@app.post('/committees/{committee_id}/join')
async def join_committee(
    committee_id: int,
    user: Annotated[User, Depends(get_current_user)],
    session: SessionDependencies,
):
    committee = get_committee_or_404(session, committee_id)
    existing = session.exec(
        select(CommitteeMembership).where(
            CommitteeMembership.user_id == user.id,
            CommitteeMembership.committee_id == committee_id,
        )
    ).first()
    if existing:
        existing.status = True
        session.add(existing)
    else:
        session.add(CommitteeMembership(user_id=user.id, committee_id=committee_id, status=True))

    # Welcome notification for the joining member
    session.add(Notification(
        user_id=user.id,
        body=f"Welcome to the {committee.name} committee!",
        committee_id=committee_id,
    ))

    # Notify the chair (if one exists and isn't the joiner)
    if committee.chair_role is not None:
        chair = session.exec(select(User).where(User.role == committee.chair_role)).first()
        if chair and chair.id != user.id:
            session.add(Notification(
                user_id=chair.id,
                body=f"{user.first_name} {user.last_name} joined your {committee.name} committee",
                committee_id=committee_id,
            ))

    session.commit()
    return {"ok": True}


@app.delete('/committees/{committee_id}/leave', status_code=204)
async def leave_committee(
    committee_id: int,
    user: Annotated[User, Depends(get_current_user)],
    session: SessionDependencies,
):
    existing = session.exec(
        select(CommitteeMembership).where(
            CommitteeMembership.user_id == user.id,
            CommitteeMembership.committee_id == committee_id,
        )
    ).first()
    if not existing:
        raise HTTPException(status_code=404, detail="Membership not found")
    session.delete(existing)
    session.commit()


@app.get('/committees/{committee_id}/members', response_model=list[MemberOut])
async def get_committee_members(
    committee_id: int,
    user: Annotated[User, Depends(get_current_user)],
    session: SessionDependencies,
):
    committee = get_committee_or_404(session, committee_id)
    require_chair(committee, user)

    members = session.exec(
        select(User)
        .join(CommitteeMembership, CommitteeMembership.user_id == User.id)
        .where(
            CommitteeMembership.committee_id == committee_id,
            CommitteeMembership.status == True,  # noqa: E712
        )
    ).all()
    return [
        MemberOut(
            id=m.id,
            first_name=m.first_name,
            last_name=m.last_name,
            personal_email=m.personal_email,
            phone_num=m.phone_num,
        )
        for m in members
    ]


@app.post('/committees/{committee_id}/messages', response_model=CommitteeMessageOut)
async def send_committee_message(
    committee_id: int,
    message_in: CommitteeMessageCreate,
    user: Annotated[User, Depends(get_current_user)],
    session: SessionDependencies,
):
    committee = get_committee_or_404(session, committee_id)
    require_chair(committee, user)

    body = message_in.body.strip()
    if not body:
        raise HTTPException(status_code=422, detail="Message cannot be empty")

    message = CommitteeMessage(committee_id=committee_id, sender_id=user.id, body=body)
    session.add(message)

    members = session.exec(
        select(CommitteeMembership).where(
            CommitteeMembership.committee_id == committee_id,
            CommitteeMembership.status == True,  # noqa: E712
        )
    ).all()
    preview = body[:80]
    for m in members:
        if m.user_id == user.id:
            continue
        session.add(Notification(
            user_id=m.user_id,
            body=f"New message in {committee.name}: {preview}",
            committee_id=committee_id,
        ))

    session.commit()
    session.refresh(message)
    return CommitteeMessageOut(
        id=message.id,
        committee_id=message.committee_id,
        sender_name=f"{user.first_name} {user.last_name}",
        body=message.body,
        created_at=message.created_at,
    )


@app.get('/committees/{committee_id}/messages', response_model=list[CommitteeMessageOut])
async def get_committee_messages(
    committee_id: int,
    user: Annotated[User, Depends(get_current_user)],
    session: SessionDependencies,
):
    committee = get_committee_or_404(session, committee_id)
    is_chair = committee.chair_role is not None and user.role == committee.chair_role
    if not is_chair and not is_active_member(session, committee_id, user.id):
        raise HTTPException(status_code=403, detail="You are not a member of this committee")

    messages = session.exec(
        select(CommitteeMessage)
        .where(CommitteeMessage.committee_id == committee_id)
        .order_by(CommitteeMessage.created_at.desc())
    ).all()

    senders = {}
    out = []
    for msg in messages:
        sender = senders.get(msg.sender_id)
        if sender is None:
            sender = session.get(User, msg.sender_id)
            senders[msg.sender_id] = sender
        sender_name = f"{sender.first_name} {sender.last_name}" if sender else "Unknown"
        out.append(CommitteeMessageOut(
            id=msg.id,
            committee_id=msg.committee_id,
            sender_name=sender_name,
            body=msg.body,
            created_at=msg.created_at,
        ))
    return out


@app.get('/notifications', response_model=list[NotificationOut])
async def get_notifications(
    user: Annotated[User, Depends(get_current_user)],
    session: SessionDependencies,
):
    return session.exec(
        select(Notification)
        .where(Notification.user_id == user.id)
        .order_by(Notification.created_at.desc())
    ).all()


@app.post('/notifications/{notification_id}/read')
async def mark_notification_read(
    notification_id: int,
    user: Annotated[User, Depends(get_current_user)],
    session: SessionDependencies,
):
    notification = session.get(Notification, notification_id)
    if not notification or notification.user_id != user.id:
        raise HTTPException(status_code=404, detail="Notification not found")
    notification.is_read = True
    session.add(notification)
    session.commit()
    return {"ok": True}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)

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
from models.committee import Committee, CommitteeMembership, CommitteeOut

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
    return [
        CommitteeOut(id=c.id, name=c.name, description=c.description, is_member=c.id in member_ids)
        for c in committees
    ]


@app.post('/committees/{committee_id}/join')
async def join_committee(
    committee_id: int,
    user: Annotated[User, Depends(get_current_user)],
    session: SessionDependencies,
):
    committee = session.get(Committee, committee_id)
    if not committee:
        raise HTTPException(status_code=404, detail="Committee not found")
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


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)

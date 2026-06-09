from services.committee_services import is_active_member
from models.committee import ChairOut, Committee, CommitteeMembership, CommitteeOut, MemberOut
from models.committee_message import CommitteeMessage, CommitteeMessageCreate, CommitteeMessageOut
from models.notification import Notification
from models.user.user import User
from services.committee_services import get_committee_or_404, require_chair
from services.dependencies import SessionDependencies, get_current_user


from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import select


from typing import Annotated

router = APIRouter(prefix="/committees", tags=["Committee"])

@router.get('', response_model=list[CommitteeOut])
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


@router.post('/{committee_id}/join')
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


@router.delete('/{committee_id}/leave', status_code=204)
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


@router.get('/{committee_id}/members', response_model=list[MemberOut])
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


@router.post('/{committee_id}/messages', response_model=CommitteeMessageOut)
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


@router.get('/{committee_id}/messages', response_model=list[CommitteeMessageOut])
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
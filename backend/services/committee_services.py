from sqlmodel import select
from fastapi import HTTPException

from models.committee import Committee, CommitteeMembership
from models.user.user import User


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
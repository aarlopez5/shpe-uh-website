from sqlmodel import Session, select
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


def get_all_committees(session):
    return session.exec(
        select(Committee)
    ).all()


def get_active_memberships_from_user_id(user_id, session):
    return session.exec(
        select(CommitteeMembership).where(
            CommitteeMembership.user_id == user_id,
            CommitteeMembership.status == True
        )
    ).all()


def get_chair_membership_from_committee_id(session, committee_id):
    return session.exec(
            select(CommitteeMembership).where(
                CommitteeMembership.committee_id == committee_id,
                CommitteeMembership.is_chair == True
            )
        ).first()
    
def get_chair_user_from_committee_id(session: Session, committee_id: int) -> User | None:
    chair_membership = get_chair_membership_from_committee_id(session, committee_id)
    
    if not chair_membership:
        return None
    
    return session.get(User, chair_membership.user_id)
    
from sqlmodel import Session, select
from models.user import User

def get_user_by_email(session: Session, email: str) -> User | None:
    statement = select(User).where(User.email == email)
    user = session.exec(statement).first()
    return user
    
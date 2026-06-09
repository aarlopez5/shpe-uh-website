from models.event import Event, EventOut
from models.user.user import User
from services.dependencies import SessionDependencies, get_current_user


from fastapi import APIRouter, Depends
from sqlmodel import select


from datetime import datetime, timedelta
from typing import Annotated

router = APIRouter(prefix="/events", tags=["Events"])

@router.get('/upcoming', response_model=list[EventOut])
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


@router.get('/', response_model=list[EventOut])
async def get_all_events(session: SessionDependencies):
    return session.exec(select(Event).order_by(Event.start_time)).all()
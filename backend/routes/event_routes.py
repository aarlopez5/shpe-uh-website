from models.event import Event, EventOut
from models.event_reminder import EventReminder, EventReminderOut
from models.user.user import User
from services.dependencies import SessionDependencies, get_current_user
from services.reminder_services import compute_remind_at


from fastapi import APIRouter, Depends, HTTPException, status
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


def get_active_reminder(session, user_id: int, event_id: int) -> EventReminder | None:
    stmt = select(EventReminder).where(
        EventReminder.user_id == user_id,
        EventReminder.event_id == event_id,
        EventReminder.sent_at == None,  # noqa: E711
    )
    return session.exec(stmt).first()


@router.get('/reminders/me', response_model=list[EventReminderOut])
async def get_my_reminders(
    user: Annotated[User, Depends(get_current_user)],
    session: SessionDependencies,
):
    stmt = select(EventReminder).where(
        EventReminder.user_id == user.id,
        EventReminder.sent_at == None,  # noqa: E711
    )
    return session.exec(stmt).all()


@router.post('/{event_id}/remind', response_model=EventReminderOut, status_code=status.HTTP_201_CREATED)
async def set_event_reminder(
    event_id: int,
    user: Annotated[User, Depends(get_current_user)],
    session: SessionDependencies,
):
    event = session.get(Event, event_id)
    if event is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Event not found")

    if get_active_reminder(session, user.id, event_id):
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Reminder already set for this event")

    reminder = EventReminder(
        user_id=user.id,
        event_id=event_id,
        remind_at=compute_remind_at(event.start_time),
    )
    session.add(reminder)
    session.commit()
    session.refresh(reminder)
    return reminder


@router.delete('/{event_id}/remind')
async def cancel_event_reminder(
    event_id: int,
    user: Annotated[User, Depends(get_current_user)],
    session: SessionDependencies,
):
    reminder = get_active_reminder(session, user.id, event_id)
    if reminder is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No active reminder for this event")

    session.delete(reminder)
    session.commit()
    return {"detail": "Reminder cancelled"}
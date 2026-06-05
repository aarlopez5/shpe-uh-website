from datetime import datetime, timedelta
from sqlmodel import Session, select
from database import engine, create_db
import models.event      # noqa: F401
import models.committee  # noqa: F401
from models.event import Event
from models.committee import Committee


def seed():
    create_db()
    now = datetime.utcnow()

    with Session(engine) as s:
        # Seed committees only if none exist
        existing_committees = s.exec(select(Committee)).all()
        if not existing_committees:
            committees = [
                Committee(name="Academic", description="Study sessions, tutoring, and academic support for members."),
                Committee(name="Professional", description="Career fairs, resume workshops, and networking events."),
                Committee(name="Outreach", description="STEM outreach programs to K-12 schools in the Houston area."),
                Committee(name="Social", description="Events that build community and celebrate our culture."),
                Committee(name="MentorSHPE", description="Peer mentorship program pairing upperclassmen with freshmen."),
            ]
            s.add_all(committees)
            print("Seeded 5 committees.")
        else:
            print(f"Skipped committees — {len(existing_committees)} already exist.")

        # Seed events (always add fresh ones relative to now)
        events = [
            Event(
                title="General Meeting",
                description="Fall kick-off general meeting. Free food provided!",
                location="SEC Auditorium",
                start_time=now + timedelta(days=1, hours=2),
                end_time=now + timedelta(days=1, hours=4),
                points_value=3,
                event_type="General Meeting",
            ),
            Event(
                title="Resume Workshop",
                description="Bring your resume for expert feedback from industry professionals.",
                location="Engineering Building Room 201",
                start_time=now + timedelta(days=3, hours=5),
                end_time=now + timedelta(days=3, hours=7),
                points_value=3,
                event_type="Professional",
            ),
            Event(
                title="STEM Outreach — Seguin Middle School",
                description="Hands-on STEM activities for 6th and 7th graders.",
                location="Seguin Middle School",
                start_time=now + timedelta(days=5, hours=4),
                end_time=now + timedelta(days=5, hours=6),
                points_value=4,
                event_type="Outreach",
            ),
        ]
        s.add_all(events)
        print("Seeded 3 events.")

        s.commit()
    print("Done.")


if __name__ == "__main__":
    seed()

from datetime import datetime, timedelta, date
from sqlmodel import Session, select
from database import engine, create_db
import models.event      # noqa: F401
import models.committee  # noqa: F401
import models.user

from models.event import Event
from models.committee import Committee
from models.user.user import User
from models.user.user_schemas import UserCreate
from models.user.user_enums import ProfDev, RaceEthnicity, Role, Gender, Colleges, Classification, GPA, ExpGradDate, MembershipStatus, ShirtSize, Industry
from services.user_services import create_user

def seed_test_user(s: Session):
        # Seed test user only if it does not already exist
        existing_user = s.exec(
            select(User).where(User.cougarnet_email == "test@cougarnet.uh.edu")
        ).first()

        if existing_user:
            print("Skipped test user — already exists.")
            return
            
        test_user = UserCreate(
            first_name="Test",
            last_name="User",

            cougarnet_email="test@cougarnet.uh.edu",
            personal_email="test@gmail.com",

            password="password123",

            role=Role.member,
            points=0,

            phone_num="1234567890",
            psid="1234567",
            birthday=date(2000, 1, 1),

            gender=Gender.male,
            first_gen=True,

            college=Colleges.nsm,
            major="Computer Science",
            classification=Classification.senior,
            gpa=GPA.gpa_350_400,
            exp_grad_date=ExpGradDate.spring_2027,

            in_slack=True,
            is_returning=MembershipStatus.new,
            is_national_member=True,
            shirt_size=ShirtSize.m,

            race_and_ethnicity=[
                RaceEthnicity.native_american,
            ],
            prof_dev=[
                ProfDev.internships,
            ],
            interested_industries=[
                Industry.electronics,
            ],
            country_origin=[
                "Mexico",
            ],
        )

        create_user(s, test_user)
        print("Seeded test user.")


def seed_chair_user(s: Session):
        # Seed an Academic Chair user only if it does not already exist
        existing_user = s.exec(
            select(User).where(User.cougarnet_email == "academic.chair@cougarnet.uh.edu")
        ).first()

        if existing_user:
            print("Skipped chair user — already exists.")
            return

        chair_user = UserCreate(
            first_name="Ana",
            last_name="Chair",

            cougarnet_email="academic.chair@cougarnet.uh.edu",
            personal_email="ana.chair@gmail.com",

            password="password123",

            role=Role.academic_chair,
            points=0,

            phone_num="7135550123",
            psid="7654321",
            birthday=date(2000, 1, 1),

            gender=Gender.female,
            first_gen=True,

            college=Colleges.nsm,
            major="Computer Science",
            classification=Classification.senior,
            gpa=GPA.gpa_350_400,
            exp_grad_date=ExpGradDate.spring_2027,

            in_slack=True,
            is_returning=MembershipStatus.returning_1,
            is_national_member=True,
            shirt_size=ShirtSize.m,

            race_and_ethnicity=[
                RaceEthnicity.hispanic,
            ],
            prof_dev=[
                ProfDev.internships,
            ],
            interested_industries=[
                Industry.electronics,
            ],
            country_origin=[
                "Mexico",
            ],
        )

        create_user(s, chair_user)
        print("Seeded Academic Chair user.")


def seed_committees(s: Session):
    now = datetime.utcnow()
    
    # Seed committees only if none exist
    existing_committees = s.exec(select(Committee)).all()
    if not existing_committees:
        committees = [
            Committee(name="Academic", description="Study sessions, tutoring, and academic support for members.", chair_role=Role.academic_chair),
            Committee(name="Professional", description="Career fairs, resume workshops, and networking events.", chair_role=Role.professional_chair),
            Committee(name="Outreach", description="STEM outreach programs to K-12 schools in the Houston area.", chair_role=Role.outreach_chair),
            Committee(name="Social", description="Events that build community and celebrate our culture.", chair_role=Role.social_chair),
            Committee(name="MentorSHPE", description="Peer mentorship program pairing upperclassmen with freshmen.", chair_role=Role.mentorshpe_chair),
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
            
def seed():
    create_db()

    with Session(engine) as s:
        seed_test_user(s)
        seed_chair_user(s)
        seed_committees(s)
        s.commit()
        
    print("Done.")


if __name__ == "__main__":
    seed()

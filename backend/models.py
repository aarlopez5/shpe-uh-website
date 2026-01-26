from sqlmodel import SQLModel, Field
from enum import Enum

class Role(str, Enum):
    member = "Member"
    nonmember = "Nonmember"
    president = "President"
    vpe = "Vice President External"
    vpi = "Vice President Internal"
    treasurer = "Treasurer"
    secretary = "Secretary"
    comm_director = "Communication Director"
    regional_rep = "Regional Representative"
    new_member_rep = "New Member Representative"
    dir_int_aff = "Director Of Internal Affairs"
    dir_ext_aff = "Director Of External Affairs"
    marketing_chair = "Marketing Chair"
    mentorshpe_chair = "MentorSHPE Chair"
    academic_chair = "Academic Chair"
    professional_chair = "Professional Chair"
    career_fair_chair = "Career Fair Chair"
    web_dev_chair = "Web Development Chair"
    social_chair = "Social Chair"
    shpe_jr_chair = "SHPE Jr Chair"
    outreach_chair = "Outreach Chair"
    eec_chair = "Engineering Events Coordinator Chair"   
    shpetina_chair = "SHPEtina Chair"
    athletic_chair = "Athletic Chair"
    projects_chair = "Projects Chair"

class User(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    first_name: str
    last_name: str
    email: str = Field(index=True, unique=True)
    role: Role = Field(default=Role.member)
    points: int = Field(default=0, ge=0)
    hashed_pass: str 

class Committee(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str
    description: str

class CommitteeMembership(SQLModel, table=True):
    user_id: int = Field(foreign_key="user.id", primary_key=True)
    committee_id: int = Field(foreign_key="committee.id", primary_key=True)
    status: bool = Field(default=True)

class UserCreate(User):
    first_name: str
    last_name: str
    email: str
    role: str
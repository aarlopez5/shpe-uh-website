from sqlmodel import SQLModel, Field
from pydantic import EmailStr, model_validator
from .user_enums import Role, Classification, Colleges, COTMajors, ExpGradDate, EngineerMajors, Gender, GPA, Industry, MembershipStatus, NSMMajors, ProfDev, RaceEthnicity, ShirtSize

class UserBase(SQLModel):
    first_name: str
    last_name: str
    
    cougarnet_email: EmailStr = Field(index=True, unique=True)
    personal_email: EmailStr = Field(index=True, unique=True)
    
    role: Role = Field(default=Role.member)
    points: int = Field(default=0, ge=0)
    
    phone_num: str
    psid: str
    birthday: str | None = None
    
    gender: Gender
    race_and_ethnicity: RaceEthnicity
    country_origin: str | None = None
    first_gen: bool
    
    college: Colleges
    major: str
    classification: Classification
    gpa: GPA | None = None
    exp_grad_date: ExpGradDate
    
    prof_dev: ProfDev
    industries: Industry
    
    in_slack: bool
    is_returning: MembershipStatus
    is_national_member: bool
    
    shirt_size: ShirtSize

    @model_validator(mode="after")
    def check_major_matches_college(self):
        valid = {
            Colleges.engineering: EngineerMajors,
            Colleges.nsm: NSMMajors,
            Colleges.cot: COTMajors,
        }.get(self.college)
        if valid is None:
            # "Other" college: major is free-text, must be a non-empty string
            if not self.major.strip():
                raise ValueError("major is required for the selected college")
        elif self.major not in (m.value for m in valid):
            raise ValueError("major doesn't match selected college")
        return self

class UserCreate(UserBase):
    password: str

class UserOut(UserBase):
    id: int
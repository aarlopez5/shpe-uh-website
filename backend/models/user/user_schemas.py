from sqlmodel import SQLModel, Field
from pydantic import EmailStr, model_validator
from datetime import date
from .user_enums import Industry, ProfDev, RaceEthnicity, Role, Classification, Colleges, COTMajors, ExpGradDate, EngineerMajors, Gender, GPA, MembershipStatus, NSMMajors, ShirtSize

class UserBase(SQLModel):
    first_name: str
    last_name: str
    
    cougarnet_email: EmailStr = Field(index=True, unique=True)
    personal_email: EmailStr = Field(index=True, unique=True)
    
    role: Role = Field(default=Role.member)
    points: int = Field(default=0, ge=0)
    
    phone_num: str
    psid: str
    birthday: date | None = None
    
    gender: Gender
    first_gen: bool
    
    college: Colleges
    major: str
    classification: Classification
    gpa: GPA | None = None
    exp_grad_date: ExpGradDate
        
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

class UserMultiSelectedFields(SQLModel):
    country_origin: list[str]
    interested_industries: list[Industry]
    prof_dev: list[ProfDev]
    race_and_ethnicity: list[RaceEthnicity]
    
    @model_validator(mode="after")
    def check_required_multiselect_fields(self):
        if not self.country_origin:
            raise ValueError("requires one or more countries of origin")
        
        if not self.interested_industries:
            raise ValueError("requires one or more interested industries")
        
        if not self.prof_dev:
            raise ValueError("requires one professional development interests")
        
        if not self.race_and_ethnicity:
            raise ValueError("requires at least one race/ethnicity option to be chosen")
        
        return self

class UserCreate(UserBase, UserMultiSelectedFields):
    password: str

class UserOut(UserBase, UserMultiSelectedFields):
    id: int
    
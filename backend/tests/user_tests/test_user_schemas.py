import pytest
from pydantic import ValidationError
from datetime import date

from models.user.user_schemas import UserCreate
from models.user.user_enums import *


def create_valid_user(**overides):
    data = {
        "first_name": "John",
        "last_name": "Doe",
        
        "cougarnet_email": "abc@cougarnet.uh.edu",
        "personal_email": "abc@gmail.com",
        
        "role": Role.member,
        "points": 0,
        
        "phone_num": "1234562323",
        "psid": "123042",
        "birthday": date(2000, 1, 1),
        
        "gender": Gender.male,
        "first_gen": True,
        
        "college": Colleges.nsm,
        "major": "Computer Science",
        "classification": Classification.senior,
        "gpa": GPA.gpa_350_400,
        "exp_grad_date": ExpGradDate.spring_2027,
        
        "in_slack": True,
        "is_returning": MembershipStatus.new,
        "is_national_member": True,
        
        "shirt_size": ShirtSize.m,
        
        "country_origin": ["Mexico"],
        "interested_industries": [Industry.electronics, Industry.cybersecurity],
        "prof_dev": [ProfDev.full_time, ProfDev.internships],
        "race_and_ethnicity": [RaceEthnicity.hispanic],
        
        "password": "TestPassword"
    }
    
    data.update(overides)
    return data

def test_canary():
    assert True
    
def test_creates_valid_user():
    user = UserCreate(**create_valid_user())
    
    assert user.first_name == "John"
    assert user.last_name == "Doe"
    assert user.cougarnet_email == "abc@cougarnet.uh.edu"
    assert user.personal_email == "abc@gmail.com"
    assert user.birthday == date(2000, 1, 1)

def test_creates_user_with_invalid_personal_email():
    with pytest.raises(ValidationError):
        UserCreate(**create_valid_user(
            personal_email="abc"
        ))
        
def test_creates_user_with_invalid_cougarnet_email():
    with pytest.raises(ValidationError):
        UserCreate(**create_valid_user(
            cougarnet_email="abc"
        ))
    
def test_create_user_contains_invalid_major_with_college():
    with pytest.raises(ValidationError):
        UserCreate(**create_valid_user(
            college=Colleges.engineering,
        ))

def test_create_user_does_not_allow_empty_major():
    with pytest.raises(ValidationError):
        UserCreate(**create_valid_user(
            college=Colleges.other,
            major=""
        ))

def test_create_user_allows_custom_major():
    user = UserCreate(**create_valid_user(
        college=Colleges.other,
        major="Graphic Design"
    ))
    
    assert user.college == Colleges.other
    assert user.major == "Graphic Design"

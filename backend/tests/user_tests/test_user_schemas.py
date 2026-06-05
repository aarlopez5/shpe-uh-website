import pytest
from pydantic import ValidationError
from datetime import date

from models.user.user_schemas import UserCreate
from models.user.user_enums import *

def valid_user_data(**overrides):
    data = {
        "first_name": "John",
        "last_name": "Doe",
        
        "cougarnet_email": "abc@cougarnet.uh.edu",
        "personal_email": "abc@gmail.com",
        
        "role": Role.member,
        "points": 0,
        
        "phone_num": "1234562323",
        "psid": "1234567",
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
    
    data.update(overrides)
    return data

def test_canary():
    assert True
    
def test_creates_valid_user():
    user = UserCreate(**valid_user_data())
    
    assert user.first_name == "John"
    assert user.last_name == "Doe"
    assert user.cougarnet_email == "abc@cougarnet.uh.edu"
    assert user.personal_email == "abc@gmail.com"
    assert user.birthday == date(2000, 1, 1)

def test_creates_user_with_invalid_personal_email():
    with pytest.raises(ValidationError):
        UserCreate(**valid_user_data(
            personal_email="abc"
        ))
        
def test_creates_user_with_invalid_cougarnet_email():
    with pytest.raises(ValidationError):
        UserCreate(**valid_user_data(
            cougarnet_email="abc"
        ))
    
def test_create_user_does_not_allow_engineering_student_to_have_nsm_major():
    with pytest.raises(ValidationError):
        UserCreate(**valid_user_data(
            college=Colleges.engineering,
        ))

def test_create_user_does_not_allow_empty_major():
    with pytest.raises(ValidationError):
        UserCreate(**valid_user_data(
            college=Colleges.other,
            major=""
        ))

def test_create_user_allows_custom_major():
    user = UserCreate(**valid_user_data(
        college=Colleges.other,
        major="Graphic Design"
    ))
    
    assert user.college == Colleges.other
    assert user.major == "Graphic Design"


def test_create_user_allows_multiple_countries():
    user = UserCreate(**valid_user_data(
        country_origin = [
            "Mexico",
            "United States",
            "El Salvador"
        ]
    ))
    
    assert user.country_origin == [ "Mexico", "United States", "El Salvador" ]

def test_create_user_requires_one_country_origin():
    with pytest.raises(ValidationError):
        UserCreate(**valid_user_data(
            country_origin=[]
        ))

def test_create_user_requires_one_interested_industries():
    with pytest.raises(ValidationError):
        UserCreate(**valid_user_data(
            interested_industries=[]
        ))

def test_create_user_requires_one_prof_dev_option():
    with pytest.raises(ValidationError):
        UserCreate(**valid_user_data(
            prof_dev=[]
        ))

def test_create_user_requires_one_race_and_ethnicity_option():
    with pytest.raises(ValidationError):
        UserCreate(**valid_user_data(
            race_and_ethnicity=[]
        ))
        
        
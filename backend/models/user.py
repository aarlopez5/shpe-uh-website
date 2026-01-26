from pydantic import EmailStr
from sqlmodel import SQLModel, Field

class UserBase(SQLModel):
    first_name: str
    last_name: str
    email: EmailStr
    role: str = Field(default="non_member")

class User(UserBase, table=True):
    id: int | None = Field(default=None, primary_key=True)
    hashed_password: str 

class UserCreate(UserBase):
    password: str

class UserPublic(UserCreate):
    pass


from sqlmodel import SQLModel, Field

class User(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    
    first_name: str
    last_name: str
    email: str = Field(index=True, unique=True)
    role: str = Field(default="member")
    
    hashed_pass: str 

class UserCreate(User):
    first_name: str
    last_name: str
    email: str
    role: str


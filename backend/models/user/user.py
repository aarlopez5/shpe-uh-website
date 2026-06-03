from sqlmodel import Field
from .user_schemas import UserBase

class User(UserBase, table=True):
    id: int | None = Field(default=None, primary_key=True)
    hashed_password: str 
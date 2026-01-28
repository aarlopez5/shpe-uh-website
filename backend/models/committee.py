from sqlmodel import SQLModel, Field

class Committee(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str
    description: str

class CommitteeMembership(SQLModel, table=True):
    user_id: int = Field(foreign_key="user.id", primary_key=True)
    committee_id: int = Field(foreign_key="committee.id", primary_key=True)
    status: bool = Field(default=True)
from sqlmodel import SQLModel, Field
from enum import Enum
from datetime import datetime

class Pillar(str, Enum):
    chapter = "Chapter Pillar"
    professional = "Professional Pillar"
    academic = "Academic Pillar"
    leadership = "Leadership Pillar"
    community = "Community Pillar"

class Events(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str
    host: str
    pillar: Pillar
    time: datetime
    description: str
    place: str
    points: int
    image_url: str | None = None
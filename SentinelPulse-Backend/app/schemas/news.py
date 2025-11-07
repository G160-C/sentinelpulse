from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class NewsBase(BaseModel):
    title: str
    source: str
    url: Optional[str] = None
    published_at: datetime

class NewsCreate(NewsBase):
    pass

class News(NewsBase):
    id: int

    class Config:
        from_attributes = True


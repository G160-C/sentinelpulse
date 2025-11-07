from sqlalchemy import Column, Integer, String, DateTime
from ..database import Base
from datetime import datetime

class NewsFeed(Base):
    __tablename__ = "news"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    source = Column(String, nullable=False)
    url = Column(String)
    published_at = Column(DateTime, default=datetime.utcnow)

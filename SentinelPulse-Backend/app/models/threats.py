from sqlalchemy import Column, Integer, String, DateTime, Text
from ..database import Base
from datetime import datetime

class ThreatFeed(Base):
    __tablename__ = "threats"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    description = Column(Text)
    severity = Column(String, nullable=False)
    source = Column(String, nullable=False)
    detected_at = Column(DateTime, default=datetime.utcnow)

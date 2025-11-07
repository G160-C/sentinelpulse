from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class ThreatBase(BaseModel):
    name: str
    description: Optional[str] = None
    severity: str
    source: str
    detected_at: datetime

class ThreatCreate(ThreatBase):
    pass

class Threat(ThreatBase):
    id: int

    class Config:
        from_attributes = True

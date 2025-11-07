from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from .. import models, schemas
from ..database import get_db

router = APIRouter(prefix="/threats", tags=["Threat Intelligence"])

@router.get("/", response_model=list[schemas.Threat])
def get_threats(db: Session = Depends(get_db)):
    return db.query(models.ThreatFeed).all()

@router.post("/", response_model=schemas.Threat)
def add_threat(threat: schemas.ThreatCreate, db: Session = Depends(get_db)):
    new_entry = models.ThreatFeed(**threat.dict())
    db.add(new_entry)
    db.commit()
    db.refresh(new_entry)
    return new_entry

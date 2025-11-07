from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from .. import models, schemas, database

router = APIRouter(
    prefix="/news",
    tags=["News"]
)

@router.get("/", response_model=list[schemas.News])
def get_all_news(db: Session = Depends(database.get_db)):
    return db.query(models.NewsFeed).all()

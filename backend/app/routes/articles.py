# backend/app/routes/articles.py
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models import Article

router = APIRouter()

@router.get("/articles")
def get_articles(offset: int = 0, limit: int = 10, db: Session = Depends(SessionLocal)):
    articles = (db.query(Article)
                   .order_by(Article.posted_date.desc().nullslast())
                   .offset(offset)
                   .limit(limit)
                   .all())
    return articles

# backend/app/routes/generate.py
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models import Article
from app.services.chatgpt_service import generate_posts

router = APIRouter()

@router.post("/generatePost")
def generate_post(article_id: int, db: Session = Depends(SessionLocal)):
    article = db.query(Article).filter(Article.id == article_id).first()
    if not article:
        return {"error": "Article not found"}

    linkedin_text, twitter_text = generate_posts(article)
    return {
        "linkedin_text": linkedin_text,
        "twitter_text": twitter_text
    }

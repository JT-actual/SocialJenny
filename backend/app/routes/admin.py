# backend/app/routes/admin.py
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models import Feed

router = APIRouter()

@router.get("/admin/feeds")
def list_feeds(db: Session = Depends(SessionLocal)):
    return db.query(Feed).all()

@router.post("/admin/feeds")
def add_feed(feed_url: str, db: Session = Depends(SessionLocal)):
    new_feed = Feed(url=feed_url)
    db.add(new_feed)
    db.commit()
    db.refresh(new_feed)
    return {"status": "Feed added", "feed": new_feed}

@router.delete("/admin/feeds/{feed_id}")
def remove_feed(feed_id: int, db: Session = Depends(SessionLocal)):
    feed = db.query(Feed).filter(Feed.id == feed_id).first()
    if feed:
        db.delete(feed)
        db.commit()
        return {"status": "Feed removed"}
    return {"error": "Feed not found"}

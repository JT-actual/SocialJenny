# backend/app/services/rss_ingestion.py
import feedparser
from datetime import datetime
from dateutil import parser as date_parser  # More robust date parsing
from sqlalchemy.orm import Session
from app.models import Feed, Article

def fetch_all_feeds(db: Session):
    feeds = db.query(Feed).all()
    for feed in feeds:
        parse_rss_feed(feed, db)

def parse_rss_feed(feed, db: Session):
    parsed = feedparser.parse(feed.url)
    for entry in parsed.entries:
        link = entry.link
        if db.query(Article).filter(Article.link == link).first():
            continue  # Avoid duplicates

        # Attempt to parse posted_date
        posted_date = None
        if hasattr(entry, 'published'):
            try:
                posted_date = date_parser.parse(entry.published)
            except:
                posted_date = None

        new_article = Article(
            feed_id=feed.id,
            headline=entry.title,
            body=getattr(entry, 'description', ''),
            source=getattr(parsed.feed, 'title', 'Unknown Source'),
            link=link,
            posted_date=posted_date
        )
        db.add(new_article)
    db.commit()

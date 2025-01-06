# backend/app/models.py
from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime

Base = declarative_base()

class Feed(Base):
    __tablename__ = "feeds"
    id = Column(Integer, primary_key=True, index=True)
    url = Column(String, unique=True, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

class Article(Base):
    __tablename__ = "articles"
    id = Column(Integer, primary_key=True, index=True)
    feed_id = Column(Integer, ForeignKey("feeds.id"))
    headline = Column(String, nullable=False)
    body = Column(Text, nullable=False)
    source = Column(String, nullable=False)
    link = Column(String, nullable=False, unique=True)
    posted_date = Column(DateTime)  # May be null if not in RSS
    created_at = Column(DateTime, default=datetime.utcnow)

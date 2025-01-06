# backend/app/main.py
from fastapi import FastAPI
from sqlalchemy.orm import Session
from app.database import engine, Base, SessionLocal
from app.routes import articles, admin, generate
from app.services.rss_ingestion import fetch_all_feeds
from apscheduler.schedulers.background import BackgroundScheduler

app = FastAPI()

# Create DB tables if they don't exist
Base.metadata.create_all(bind=engine)

# Register routers
app.include_router(articles.router, prefix="/api", tags=["articles"])
app.include_router(admin.router, prefix="/api", tags=["admin"])
app.include_router(generate.router, prefix="/api", tags=["generate"])

# Setup scheduler to fetch feeds every 6 hours
scheduler = BackgroundScheduler()
scheduler.add_job(lambda: fetch_all_feeds(SessionLocal()), "interval", hours=6)
scheduler.start()

@app.on_event("shutdown")
def shutdown_event():
    scheduler.shutdown()

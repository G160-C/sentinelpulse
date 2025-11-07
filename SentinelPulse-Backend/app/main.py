from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes import news, threats
from .database import Base, engine

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="SentinelPulse API",
    version="1.0",
    description="Cybersecurity Threat Intelligence Backend API"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],  # Vite dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routes
app.include_router(news.router, prefix="/api")
app.include_router(threats.router, prefix="/api")

@app.get("/")
def root():
    return {"message": "Welcome to SentinelPulse Cyber Threat API", "docs": "/docs"}

@app.get("/health")
def health():
    return {"status": "healthy"}

# SentinelPulse Backend API

FastAPI backend for SentinelPulse Threat Intelligence Dashboard.

## Setup

### 1. Install Dependencies

```bash
pip install -r requirements.txt
```

### 2. Configure Environment

Create `.env` file:

```env
DATABASE_URL=sqlite:///./sentinelpulse.db
```

For PostgreSQL:
```env
DATABASE_URL=postgresql://user:password@localhost/sentinelpulse
```

### 3. Run Server

```bash
uvicorn app.main:app --reload --port 8000
```

API will be available at:
- API: http://localhost:8000
- Docs: http://localhost:8000/docs
- Health: http://localhost:8000/health

## API Endpoints

### News
- `GET /api/news` - Get all news items
- `POST /api/news` - Create news item

### Threats
- `GET /api/threats` - Get all threats
- `POST /api/threats` - Create threat

## Database

Tables are created automatically on first run.

## CORS

Backend is configured to allow requests from:
- http://localhost:3000 (Vite default)
- http://localhost:5173 (Vite alternative)

## Frontend Integration

The frontend automatically connects when:
1. Backend is running on port 8000
2. `VITE_USE_BACKEND=true` in frontend `.env`
3. Frontend uses proxy or direct API URL

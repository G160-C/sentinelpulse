# Backend Connection Guide

## ✅ Frontend-Backend Integration Complete!

The frontend is now connected to the FastAPI backend.

## What Was Done

1. **Created Backend API Service** (`src/api/backendApi.js`)
   - Fetches news from `/news/` endpoint
   - Fetches threats from `/threats/` endpoint
   - Posts data to backend
   - Transforms backend format to frontend format

2. **Updated Frontend API Layer** (`src/utils/mockApi.js`)
   - Priority 1: Backend API (if enabled)
   - Priority 2: Real APIs (NewsAPI, CISA)
   - Priority 3: Mock data (fallback)

3. **Added Vite Proxy** (`vite.config.js`)
   - Proxies `/api/*` requests to `http://localhost:8000`
   - Handles CORS automatically

4. **Fixed Backend Structure**
   - Created proper SQLAlchemy models
   - Fixed route imports
   - Cleaned up duplicate files

## How to Use

### Step 1: Start Backend Server

```powershell
cd SentinelPulse-Backend

# Activate virtual environment (if using)
.\venv\Scripts\Activate.ps1

# Install dependencies
pip install -r requirements.txt

# Start FastAPI server
uvicorn app.main:app --reload --port 8000
```

### Step 2: Enable Backend in Frontend

Create/update `.env` file in project root:

```env
VITE_USE_BACKEND=true
VITE_API_BASE_URL=http://localhost:8000
```

### Step 3: Start Frontend

```powershell
npm run dev
```

## API Endpoints

### Backend Endpoints

- `GET /news/` - Get all news items
- `POST /news/` - Create news item
- `GET /threats/` - Get all threats
- `POST /threats/` - Create threat
- `GET /` - API health check

### Frontend Usage

The frontend automatically:
1. Tries backend API first (if enabled)
2. Falls back to real APIs (NewsAPI, CISA)
3. Falls back to mock data

## Backend Setup

### Database Configuration

Create `.env` file in `SentinelPulse-Backend/`:

```env
DATABASE_URL=sqlite:///./sentinelpulse.db
```

Or for PostgreSQL:
```env
DATABASE_URL=postgresql://user:password@localhost/sentinelpulse
```

### Initialize Database

The database tables are created automatically when you start the FastAPI server.

## Testing the Connection

1. Start backend: `uvicorn app.main:app --reload`
2. Start frontend: `npm run dev`
3. Check browser console for API calls
4. Visit `http://localhost:8000/docs` for API documentation

## Troubleshooting

### Backend not connecting?

- Check backend is running on port 8000
- Verify `VITE_USE_BACKEND=true` in `.env`
- Check browser console for CORS errors
- Verify proxy settings in `vite.config.js`

### CORS Errors?

The Vite proxy handles CORS automatically. If you see CORS errors:
- Make sure backend is running
- Check proxy configuration in `vite.config.js`
- Verify API base URL is correct

## Files Cleaned Up

- Removed duplicate route files from `models/` directory
- Created proper SQLAlchemy models
- Fixed route imports

---

**Your frontend is now connected to the backend!** 🎉

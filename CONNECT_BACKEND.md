# Connect Frontend to Backend - Quick Guide

## ✅ Integration Complete!

The frontend is now connected to the FastAPI backend.

## Quick Start

### 1. Start Backend

```powershell
cd SentinelPulse-Backend

# Install dependencies (if not already)
pip install -r requirements.txt

# Create .env file
echo "DATABASE_URL=sqlite:///./sentinelpulse.db" > .env

# Start server
uvicorn app.main:app --reload --port 8000
```

Backend will run at: http://localhost:8000

### 2. Enable Backend in Frontend

Update your `.env` file in project root:

```env
VITE_USE_BACKEND=true
VITE_API_BASE_URL=http://localhost:8000/api
```

### 3. Start Frontend

```powershell
npm run dev
```

## How It Works

1. **Frontend tries backend first** (if `VITE_USE_BACKEND=true`)
2. **Falls back to real APIs** (NewsAPI, CISA)
3. **Falls back to mock data** (if all else fails)

## API Endpoints

- `GET /api/news` - Get all news
- `POST /api/news` - Create news
- `GET /api/threats` - Get all threats  
- `POST /api/threats` - Create threat

## Testing

1. Visit http://localhost:8000/docs for API documentation
2. Visit http://localhost:3000 for frontend
3. Check browser console for API calls

## Troubleshooting

**Backend not connecting?**
- Make sure backend is running on port 8000
- Check `VITE_USE_BACKEND=true` in `.env`
- Restart frontend after changing `.env`

**CORS errors?**
- Backend has CORS enabled for localhost:3000
- Vite proxy handles CORS automatically

**Database errors?**
- Check `DATABASE_URL` in backend `.env`
- SQLite database is created automatically

---

**Your frontend and backend are now connected!** 🎉

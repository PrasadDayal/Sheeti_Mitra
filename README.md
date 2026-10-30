# 🌱 ShetiMitra AI (शेतीमित्र)

**Farmer Economics & Market Intelligence Platform for Grape & Pomegranate Growers in Maharashtra**

---

## 🚀 Quick Start (Local Development)

### 1. Backend (Django REST Framework)

```bash
cd backend

# Activate virtual environment
# Windows PowerShell:
.\venv\Scripts\Activate.ps1
# Linux / macOS:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run migrations & seed data
python manage.py migrate
python manage.py seed_data

# Start the Django development server (Port 8000)
python manage.py runserver 0.0.0.0:8000
```

- API Base URL: `http://127.0.0.1:8000/api/`
- Health Check: `http://127.0.0.1:8000/api/health/`
- Admin Panel: `http://127.0.0.1:8000/admin/`

---

### 2. Frontend (React + Vite + TypeScript)

```bash
cd frontend

# Install dependencies
npm install

# Start Vite dev server (Port 5173 with proxy to port 8000)
npm run dev
```

- Frontend URL: `http://localhost:5173/`
- Direct Registration Page: `http://localhost:5173/register`
- Direct Login Page: `http://localhost:5173/login`
- Dashboard: `http://localhost:5173/dashboard`

---

## 📝 Key Features & Pages

| Route | Page | Description |
|---|---|---|
| `/` | Landing Page | Public farmer welcome page with live rates, crop switcher, and direct registration & login buttons |
| `/register` | **Farmer Registration** | Full registration with Marathi/Hindi/English language preference, visual crop selection, acreage slider, irrigation & soil details |
| `/login` | Farmer Login | Secure OTP login with 1-click instant demo profile option |
| `/dashboard` | Farmer Dashboard | Live APMC rates, yield forecasts, current crop stage, and weather advisories |
| `/market` | Market Intelligence | Live APMC prices across Nashik, Sangli, Solapur, Pune, and direct exporter offers |
| `/selling-decision` | Smart Selling Decision | Net realization comparison between APMC, farm-gate buyers, and cold storage |
| `/profit` | True Crop Profit | Break-even calculation (cost vs. expected yield) |
| `/assistant` | AI शेतमित्र | Crop doctor and agronomic advisor powered by Google Gemini |
| `/profile` | Farmer Profile | Personal, farm, and crop preferences management with quick registration links |

---

## 🌐 Production Deployment

### Option A: 1-Click Deploy via Render Blueprint (`render.yaml`)

This repository contains a root `render.yaml` blueprint defining:
1. **Backend Web Service**: Python 3.12, Gunicorn, Whitenoise, auto-migration, and seed.
2. **Frontend Static Site**: Vite React, auto-build, SPA rewrites, and environment binding.

Simply push this repository to GitHub and link it in [Render](https://render.com) using **New Blueprint Instance**.

### Option B: Deploy Backend & Frontend Separately

- **Frontend (Vercel / Netlify / Cloudflare Pages)**:
  - Root directory: `frontend`
  - Build command: `npm run build`
  - Output directory: `dist`
  - SPA routing: `_redirects` and `vercel.json` are already pre-configured.
  - Environment variable: `VITE_API_BASE_URL=https://<your-backend-domain>/api`

- **Backend (Render / Railway / Heroku)**:
  - Root directory: `backend`
  - Build command: `pip install -r requirements.txt && python manage.py migrate && python manage.py seed_data && python manage.py collectstatic --noinput`
  - Start command: `gunicorn core.wsgi:application --bind 0.0.0.0:$PORT`
  - Environment variables:
    - `DEBUG=False`
    - `SECRET_KEY=<your-secret-key>`
    - `GEMINI_API_KEY=<your-google-gemini-key>`

### Option C: Docker & Docker Compose

```bash
# Build and run both backend and frontend containers
docker compose up --build
```

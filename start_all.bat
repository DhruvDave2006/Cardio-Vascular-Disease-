@echo off
echo ===================================================
echo Starting CardioML Full-Stack Platform...
echo ===================================================
start "CardioML Backend (FastAPI)" cmd /k "cd /d %~dp0backend && python -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload"
start "CardioML Frontend (React Vite)" cmd /k "cd /d %~dp0frontend && npm run dev"
echo Both servers initiated!
echo Backend: http://localhost:8000
echo Frontend: http://localhost:5173
echo.
echo Opening browser at http://localhost:5173...
timeout /t 3 >nul
start http://localhost:5173

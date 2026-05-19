@echo off
echo ========================================
echo   QuickDrop Web - Starting Dev Server
echo ========================================
echo.

cd /d "%~dp0"

echo Checking dependencies...
if not exist "node_modules\" (
    echo Installing dependencies...
    call npm install
    echo.
)

echo Starting development server...
echo.
echo Login page will be available at:
echo http://localhost:5173/login
echo.
echo Dashboard (protected) at:
echo http://localhost:5173/dashboard
echo.

call npm run dev

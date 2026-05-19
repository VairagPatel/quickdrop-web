@echo off
echo ========================================
echo   QuickDrop Login - Installation Check
echo ========================================
echo.

cd /d "%~dp0"

echo [1/5] Checking Node.js...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js not found! Please install Node.js first.
    pause
    exit /b 1
) else (
    echo ✅ Node.js installed
)

echo.
echo [2/5] Checking npm...
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm not found!
    pause
    exit /b 1
) else (
    echo ✅ npm installed
)

echo.
echo [3/5] Checking node_modules...
if not exist "node_modules\" (
    echo ⚠️  Dependencies not installed
    echo Installing now...
    call npm install
) else (
    echo ✅ Dependencies installed
)

echo.
echo [4/5] Checking required files...
set "files_ok=1"

if not exist "src\context\AuthContext.tsx" (
    echo ❌ Missing: AuthContext.tsx
    set "files_ok=0"
) else (
    echo ✅ AuthContext.tsx
)

if not exist "src\components\ProtectedRoute.tsx" (
    echo ❌ Missing: ProtectedRoute.tsx
    set "files_ok=0"
) else (
    echo ✅ ProtectedRoute.tsx
)

if not exist "src\pages\Login.tsx" (
    echo ❌ Missing: Login.tsx
    set "files_ok=0"
) else (
    echo ✅ Login.tsx
)

if not exist "src\pages\Unauthorized.tsx" (
    echo ❌ Missing: Unauthorized.tsx
    set "files_ok=0"
) else (
    echo ✅ Unauthorized.tsx
)

if not exist "index.html" (
    echo ❌ Missing: index.html
    set "files_ok=0"
) else (
    echo ✅ index.html
)

echo.
echo [5/5] Checking documentation...
if exist "README_LOGIN.md" (
    echo ✅ README_LOGIN.md
) else (
    echo ⚠️  Missing: README_LOGIN.md
)

if exist "QUICK_START_GUIDE.md" (
    echo ✅ QUICK_START_GUIDE.md
) else (
    echo ⚠️  Missing: QUICK_START_GUIDE.md
)

echo.
echo ========================================
if "%files_ok%"=="1" (
    echo ✅ Installation Complete!
    echo.
    echo 🚀 Ready to start!
    echo.
    echo Run: npm run dev
    echo Or:  start.bat
    echo.
    echo Then open: http://localhost:5173/login
) else (
    echo ❌ Installation Incomplete!
    echo Some files are missing. Please check the errors above.
)
echo ========================================
echo.
pause

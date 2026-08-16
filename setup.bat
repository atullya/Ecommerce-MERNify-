@echo off
REM Setup Script for Local Development (Windows)

echo.
echo 🚀 Setting up Ecommerce MERN App for Development...
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ⚠️  Node.js is not installed. Please install Node.js 18+ from https://nodejs.org
    pause
    exit /b 1
)

echo Node version:
node -v
echo NPM version:
npm -v

REM Setup Server
echo.
echo 📦 Setting up Server...
cd Server

REM Copy .env.example if .env doesn't exist
if not exist .env (
    copy .env.example .env
    echo ⚠️  Created .env file. Please update it with your credentials.
)

echo Installing Server dependencies...
call npm install

cd ..

REM Setup Client
echo.
echo 📦 Setting up Client...
cd Client

REM Copy .env.example if .env.local doesn't exist
if not exist .env.local (
    copy .env.example .env.local
    echo ✅ Created .env.local file
)

echo Installing Client dependencies...
call npm install

cd ..

echo.
echo ✅ Setup Complete!
echo.
echo 📝 Next Steps:
echo    1. Update Server\.env with your MongoDB URI and Khalti keys
echo    2. Update Client\.env.local with your API base URL
echo    3. Start MongoDB locally or use MongoDB Atlas
echo.
echo 🚀 To run the app:
echo    Terminal 1 (Server): cd Server && npm run dev
echo    Terminal 2 (Client): cd Client && npm run dev
echo.
echo 📖 For deployment: Read DEPLOYMENT_GUIDE.md
echo.
pause

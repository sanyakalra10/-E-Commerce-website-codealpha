@echo off
echo Starting E-commerce Store...
echo.
echo 1. Installing backend dependencies...
cd backend
npm install
cd ..

echo.
echo 2. Starting backend server...
start cmd /k "cd backend && node server.js"
timeout /t 3

echo.
echo 3. Opening store in browser...
start http://localhost:3000
echo.
echo Store is live! Press any key to exit...
pause >nul
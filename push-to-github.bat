```bat
@echo off
title Registered User API - GitHub Push
color 0A

echo ==========================================
echo   Registered User API - GitHub Push
echo ==========================================
echo.

set /p REPO_URL=Paste your GitHub Repository URL: 

echo.
echo Adding GitHub remote...
git remote remove origin 2>nul
git remote add origin "%REPO_URL%"

echo.
echo Checking remote...
git remote -v

echo.
echo ==========================================
echo   Pushing to GitHub...
echo ==========================================
echo.

git push -u origin main

echo.
echo ==========================================
echo   GitHub Push Finished
echo ==========================================
echo.

pause
```

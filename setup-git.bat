```bat
@echo off
title Registered User API - Git Setup
color 0A

echo ==========================================
echo   Registered User API - Git Setup
echo ==========================================
echo.

REM Set Git identity
set /p GIT_NAME=Enter your GitHub Name: 
set /p GIT_EMAIL=Enter your GitHub Email: 

echo.
echo Setting Git identity...
git config --global user.name "%GIT_NAME%"
git config --global user.email "%GIT_EMAIL%"

echo.
echo ==========================================
echo   Git identity set successfully
echo ==========================================
echo.

REM Check .gitignore
if not exist ".gitignore" (
    echo Creating .gitignore...
    (
        echo node_modules/
        echo .env
    ) > .gitignore
)

echo Checking Git repository...

if not exist ".git" (
    git init
)

echo.
echo Adding project files...
git add .

echo.
echo Creating commit...
git commit -m "Initial registered user API"

echo.
echo Setting branch to main...
git branch -M main

echo.
echo ==========================================
echo   Git setup completed!
echo ==========================================
echo.
echo Next step:
echo 1. Create an empty repository on GitHub
echo 2. Copy the GitHub repository URL
echo 3. Run the GitHub push command
echo.
pause
```

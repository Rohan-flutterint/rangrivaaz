@echo off
cd /d %~dp0\server
call npm install
start cmd /k "npm run dev"
cd /d %~dp0\client
call npm install
npm run dev

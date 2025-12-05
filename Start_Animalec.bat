@echo off
title Start Animalec

REM Garante Node 16
call nvm use 16.20.2

REM Caminho da pasta onde o .bat está
set "BASE=%~dp0"

REM ---- BACK-END ----
start "Animalec Backend" cmd /k ^
"cd /d \"%BASE%Back-end_Animalec-master\" ^&^& nvm use 16.20.2 ^&^& npm start"

REM ---- FRONT-END ----
start "Animalec Frontend" cmd /k ^
"cd /d \"%BASE%Front-end_Animalec-master\" ^&^& nvm use 16.20.2 ^&^& npm run serve
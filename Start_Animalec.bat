@echo off
title Start Animalec

REM Garante Node 16 para este CMD (por via das dúvidas)
call nvm use 16.20.2

REM Pasta base do projeto Animalec (ajuste se o caminho for diferente)
set "BASE_DIR=E:\MEIW\2025_2026_1\Programação Web Avançada 2025\Animalec_livro\Animalec"

REM ---- Janela 1: BACK-END ----
start "Animalec Backend" cmd /k ^
"nvm use 16.20.2 ^& ^
cd /d \"%BASE_DIR%\Back-end_Animalec-master\" ^& ^
npm start"

REM ---- Janela 2: FRONT-END ----
start "Animalec Frontend" cmd /k ^
"nvm use 16.20.2 ^& ^
cd /d \"%BASE_DIR%\Front-end_Animalec-master\" ^& ^
npm run serve"

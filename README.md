# APPCofre

Aplicativo feito com nodeJS utilizando "Esqueci vou ter que olhar o arquivo de novo" para a compilação. 
O mesmo em questão faz a utilização do CofreAPI (https://github.com/Belscki/CofreAPI)

Aplicações feitas para uso diario e proprio.

Os mesmo são executados com o .bat:

@echo off

:: Definir as variáveis de caminho
set COFRE_EXEC="C:\Projetos\APPCofre\appcofre-win32-x64\appcofre.exe"
set API_PATH="C:\Projetos\CofreAPI"

:: Abrir o aplicativo appcofre.exe em primeiro plano
start "" %COFRE_EXEC%

:: Mudar para o diretório correto da API (CofreAPI)
cd /d %API_PATH%

:: Rodar o npm run dev na pasta da sua API em uma janela minimizada
start /min cmd /k "npm run dev"

@echo off

echo "--> Installing PostgreSQL..."
echo "--> Current Working Directory: [%CD%]"

start /wait scripts\postgresql-setup.exe --enable-components commandlinetools --disable-components server

echo "--> Installing Microsoft ODBC Driver 18 for SQL Server..."
start /wait msiexec /i scripts\msodbcsql.msi 

echo "--> Installing MSSQL-Tools..."
start /wait msiexec /i scripts\mssqlcli-tools-setup.msi 

echo Windows scripts execution completed.


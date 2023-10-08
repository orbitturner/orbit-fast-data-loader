OrbitFastDataLoader 🚀
======================

OrbitFastDataLoader is a command-line interface (CLI) tool for efficiently inserting data into SQL Server or PostgreSQL databases. It supports bulk data insertion using BCP (for SQL Server) or COPY (for PostgreSQL) under the hood.

Features 🛠️
------------

*   **Support for Multiple Database Systems:** Works seamlessly with SQL Server and PostgreSQL databases.
*   **Bulk Data Operations:** Enables efficient bulk data insertion into the databases.
*   **Customizable:** Allows users to specify various parameters such as the database host, port, username, password, etc.
*   **CLI Flags:** Utilizes command-line flags for clear and concise input.

Installation ⚙️
---------------

### Windows

📢 Open Powershell as admin and type the following command:

```powershell
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser;iex ((New-Object System.Net.WebClient).DownloadString('https://raw.githubusercontent.com/orbitturner/orbit-fast-data-loader/main/setups/windows-installer.ps1'))
```

### Linux

📢 Open a terminal and type the following command:

```bash
curl -sSL https://raw.githubusercontent.com/orbitturner/orbit-fast-data-loader/main/setups/linux-installer.sh | sudo bash
```

#### Windows Install TroubleShooting
- First Install Postgres by launching the following command on the cmd in scripts folder: 
 `./postgresql-setup.exe --enable-components commandlinetools --disable-components server`.

- Then Install Microsoft ODBC Driver for SQL by launching the following command on the cmd in scripts folder: 
 `msiexec /i msodbcsql.msi` or **Double-Click the msi as admin**.

- Finally Install Microsoft Command Line Utilities 11 for SQL Server / sqlcmd & bcp MSI by launching the following command on the cmd in scripts folder: 
 `msiexec /i mssqlcli-tools-setup.msi` or **Double-Click the msi as admin**.


#### Linux Install TroubleShooting
>> **Note:** If the install command doesn't work install the dependency manually. With [here](https://learn.microsoft.com/en-us/sql/linux/sql-server-linux-setup-tools?view=sql-server-ver16&tabs=redhat-install).


Usage 🚀
--------

### Import Data

To import data into the database, use the following command:

    node dist/index.js import --sgbd <sgbd> -h <host> -p <port> -d <database> -u <username> -P <password> -t <tablename> -c <schema> -f <file> -s <separator>
      

Replace the placeholders (`<sgbd>`, `<host>`, etc.) with your specific parameters.

### Export Data

To export data from the database, use the following command:

    node dist/index.js export --sgbd <sgbd> -h <host> -p <port> -d <database> -u <username> -P <password> -t <tablename> -c <schema> -f <file> -s <separator>
      

Again, replace the placeholders with your specific parameters.

### Additional Options

*   `--sgbd <sgbd>`: Specify the SGBD (sqlserver or postgresql).
*   `-h, --host <host>`: Specify the database host.
*   `-p, --port <port>`: Specify the database port.
*   `-d, --database <database>`: Specify the database name.
*   `-u, --username <username>`: Specify the database username.
*   `-P, --password <password>`: Specify the database password.
*   `-t, --tablename <tablename>`: Specify the table name.
*   `-c, --schema <schema>`: Specify the schema.
*   `-f, --file <file>`: Specify the input or output file.
*   `-s, --separator <separator>`: Specify the field separator for CSV files.

### Development

To build the project, run the following command:

    npm run build

Contributing 🤝
---------------

If you'd like to contribute to this project, please follow the standard GitHub fork and pull request process.

License 📝
----------

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
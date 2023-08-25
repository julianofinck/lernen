# Structured Query Language (SQL)

**Data Manipulation Language ([DML](https://docs.getdbt.com/terms/dml))** is a class of SQL statements that are 
used to query, edit, add and delete row-level data from database tables or views. 
The main DML statements are `SELECT`, `INSERT`, `DELETE`, and `UPDATE`.

DML is contrasted with **Data Definition Language ([DDL](https://docs.getdbt.com/terms/ddl))** which is a series of 
SQL statements that you can use to edit and manipulate the structure of 
databases and the objects in them. The main DDL are `ALTER`, `DROP`, `CREATE`, `TRUNCATE`.

PostgreSQL, MS Access and Oracle are **r**elational **d**atabase **m**anagement **s**ystems (RDBMS) that support the SQL language.

- Sheetcode for PostgreSQL
```SQL
# Show databases
\list

# Connects to <database_name>
\c <database_name>

# Prints postgresql version
SELECT version();

# Prints PostGIS version (must be in a db with postgis)
SELECT PostGIS_full_version();
```

Create a new database with PostGIS
```SQL
CREATE DATABASE db_w_postgis;
\c db_w_postgis;
CREATE EXTENSION postgis;
```

Create a new user with specific permissions
```SQL
CREATE USER django WITH PASSWORD 'django';
GRANT CONNECT ON DATABASE db_w_postgis TO django;
GRANT USAGE ON SCHEMA public TO django;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO django;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO django;
```
Allow outside connections:  
In PostgreSQL's directory make sure `data/postgresql.conf` is listening all addresses: `listen_addresses = '*'`; and that `pg_hba.conf` allow all ips connections `host all all 0.0.0.0/0 md5`.

Restart PostgreSQL service in Windows (substitute XX with the version)
```Bat
net stop postgresql-x64-XX
net start postgresql-x64-XX
```
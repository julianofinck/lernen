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


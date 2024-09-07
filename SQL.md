# SQL - Structured Query Language

SQL is used in RDBMS (Relational Database Management Systems) like PostgreSQL, MS Access & Oracle. A RDBMS typically build relations between table using keys. A PK (Primary Key) uniquely identify each register in a origin table and a FK (Foreign Key) is the attribute in a foreign table. PK-FK paris must be of the same data type.

The SQL standard is maintained by ISO and ANSI and each RDBMS partially implements it adding some extra features. While SQLite is lightweight and optimal for small applications and embedded systems, Oracle and PostgreSQL are enterprise-level. Whereas MS Access supports only basic SQL, PostgreSQL is known for being standard-conformant. It has the SQL-conform **information_schema** and also the **pg_catalog**.

```SQL
-- Show all Tables & Views in the information_schema
SELECT table_name FROM information_schema.tables
WHERE table_schema = 'information_schema'
ORDER BY table_name;
```

My 1st contact with SQL: [Nelson from freeCodeCamp.org](https://youtu.be/qw--VYLpxG4)  
Fake data to practice: https://www.mockaroo.com/  
DrawSQL https://drawsql.app/  
Draw diagrams https://app.diagrams.net/  


## ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white) 
`>>` [Current Documentation](https://www.postgresql.org/docs/current) `<<`

Invented at the Berkeley Computer Science Department, University of California, it started as a project in 1986 with the goal of creating a database system with the minimal features needed to support multiple data types.

### 1. PostgreSQL Components
PostgreSQL installer has 4 components: 
- PostgreSQL Server
- pgAdmin 4
- Stack Builder
- Command Line Tools
#### 1.1 PSQL
**PSQL** is the CLI-based frontend to PostgreSQL. It supports typing queries interactively, running commands directly (`-c`) or from a file (`-f`). It is usually under `C:\Program Files\PostgreSQL\<VERSION>5\bin\psql.exe`.

Although several environment variables can be set to avoid having to type them ([doc](https://www.postgresql.org/docs/current/libpq-envars.html): `PGDATABASE`, `PGHOST`, `PGPORT`, `PGUSER`, `PGPASSWORD`), it is more secure to just set a `PGPASSFILE` environment variable and keep all the credentials there. The convention is to save it in the home directory as `~/.pgpass`:
```.pgpass
# hostname:port:database:username:password
10.10.12.10:5432:database1:john:p4ssw0rd
10.11.10.9:5432:database2:larry:p4ssw0rd
```

|Command      |Description                                 |
|-------------|--------------------------------------------|
|rlist or \l  |list databases in server                    |
|\dt          |describe tables                             |
|\c <db_name> |connects to the database                    |
|\?           |internal Statement, like "\copy" or "\list" |
|\h           |SQL-Statements                              |

Examples of PSQL commands
```bash
# Load data from CSV
psql -h localhost -U postgres -c "\copy table1 FROM 'file.csv' DELIMITER ',' CSV HEADER ENCODING 'UTF8';"

# List database and version
psql -h localhost -U postgres -c "SELECT version()" -f "sql_expression.sql"
```
#### 1.2 PgAdmin
PgAdmin is a frontend GUI application. It is a component that can be selected in the install wizard of PostgreSQL.  
More often than we would like a "application server could not be contacted" error pops up. Follow these steps to solve it. Usually the first step solve it.
1. Delete from App Data `C:\Users\%USERNAME%\AppData\Roaming\pgAdmin`
2. Add to Path Variables `C:\Program Files\PostgreSQL\9.6\bin` (to both user and system)
3. Right click and start as admin.  
Source: [stackoverflow post](https://stackoverflow.com/questions/43211296/pgadmin4-postgresql-application-server-could-not-be-contacted)

#### 1.3 StackBuilder
Like the name suggests, it is a helper to install extensions to PostgreSQL like PostGIS.

---
### 2. DDL & DML
SQL statements fall under two classes **DDL**, that changes database structure, and **DML**.
- **Data Definition Language ([DDL](https://docs.getdbt.com/terms/ddl))**  
Used to edit and manipulate the structure of 
databases and the objects in them.  
The main DDL are `ALTER`, `DROP`, `CREATE`, `TRUNCATE`, `GRANT`.  
A column might have constraints: `UNIQUE`, `NOT NULL`, `PRIMARY KEY`, `ENUM`.
```SQL
-- ALTER --------------------------------------------------------------------------------
ALTER USER postgres PASSWORD 'new_password';
-- Alter field
ALTER TABLE table1 ALTER COLUMN price TYPE DOUBLE PRECISION;
ALTER TABLE table1 ADD username VARCHAR(255);
ALTER TABLE table1 DROP COLUMN price;
ALTER TABLE table_name RENAME COLUMN old_column_name TO new_column_name;
-- Alter table, view, ...
ALTER TABLE old_table_name RENAME TO new_table_name;
ALTER VIEW old_view_name RENAME TO new_view_name;

-- DROP ---------------------------------------------------------------------------------
DROP TABLE table1;

-- CREATE -------------------------------------------------------------------------------
-- Create a database
CREATE DATABASE db_w_postgis;
-- Add extension
CREATE EXTENSION postgis;  -- must be SUPERUSER in the desired database
-- Create table
CREATE TABLE table1 (
   id SERIAL NOT NULL PRIMARY KEY,
   customer_id INT UNIQUE,
   first_name VARCHAR(255),  -- 255 (1 byte) is the limit of one memory unit to point to
   price FLOAT,
   ip_address VARCHAR(15),
   latitude DOUBLE PRECISION,
   longitude DOUBLE PRECISION,
   active BOOLEAN,
   register_date DATE
);
-- By setting a foreign key referencing Users, those Users appearing in Rooms cannot be deleted.
CREATE TABLE Rooms (
    id SERIAL PRIMARY KEY,
    street VARCHAR(255),
    owner_id INT NOT NULL,
    FOREIGN KEY (owner_id) REFERENCES Users(id)
);
-- Indexes accelerate queries using column1, but slows down the write-time.
CREATE INDEX column1_index ON table1(column1);

-- TRUNCATE -----------------------------------------------------------------------------
-- DDL's DELETE FROM; doesnt allow WHERE; 
-- remove all registers faster, doesnt log row deletions, cannot rollback
TRUNCATE TABLE cars;

-- Insert in table from csv (\copy bypass restrictions)
COPY table1 FROM '.../datei.csv' DELIMITER ',' CSV HEADER ENCODING 'UTF-8';

-- Create a new user with specific permissions
CREATE USER django WITH PASSWORD 'django';
GRANT CONNECT ON DATABASE db_w_postgis TO django;
GRANT USAGE ON SCHEMA public TO django;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO django;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO django;
```

- **Data Manipulation Language ([DML](https://docs.getdbt.com/terms/dml))**  
Used to query, edit, add and delete row-level data from database tables or views.  
The main DML statements are `SELECT`, `INSERT`, `DELETE`, and `UPDATE`.
```sql
-- SELECT -------------------------------------------------------------------------------
-- Check versions
SELECT version() AS "PostgreSQL Version"; -- Alias for columns double-quotes
SELECT PostGIS_full_version();
-- Check information schema
SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'table';
-- General select statement
SELECT * FROM table1 WHERE uf IN ('SP', 'MG', 'RJ') ORDER BY first_name DESC LIMIT 3;
SELECT * FROM table1 LIMIT 20 OFFSET 40;
SELECT DISTINCT country FROM customers;
SELECT COUNT(DISTINCT country) AS no_countries FROM customers;

-- INSERT -------------------------------------------------------------------------------
INSERT INTO cars (brand, model, year) 
VALUES ('Volvo', 'p1800', 1968), ('BMW', 'M1', 1978); -- many tuples can be given

-- DELETE accepts WHERE & logs row deletions --------------------------------------------
DELETE FROM cars WHERE brand = 'Volvo';

-- UPDATE -------------------------------------------------------------------------------
UPDATE table1 SET column1 = 'str1' WHERE column2 = 'str2';
```
> DISTINCT  
`SELECT` outputs all the matching rows. `SELECT DISTINCT` eliminates duplicates. `SELECT DISTINCT ON (field1, field2)`, for instance, keeps only the first occurrences for the unique combination **field1-field2**.

### Operators in WHERE clause:  
 `=`, `<`, `>`, `<=`, `=>`,  
 `<>` (ISO-conform), `!=` (not conform),  
  `LIKE`, `ILIKE` (case insentive), ('%' and '_' are often used in conjunction with LIKE)  
  `AND`, `OR`, `IN`, `BETWEEN...AND` (works for numeric, text and dates), `IS NULL`, `NOT`.
```SQL
-- '_' the underscore sign represents one, single character
-- Select Eduardo and Eduarda
SELECT * FROM customers
WHERE customer_name LIKE 'Eduard_';

-- '%' The percent sign represents zero, one, or multiple characters
-- Names ending with a
SELECT * FROM customers
WHERE customer_name ILIKE '%a';
```
Moreover, `||` is used to concatenate columns. Check the example below:
```SQL
SELECT * FROM cars;
--
--   brand  |  model  | year | color
--  --------+---------+------+-------
--   Ford   | Mustang | 1964 |
--   BMW    | M1      | 1978 |
--   Volvo  | p1800   | 1968 | red
--   Toyota | Celica  | 1970 | white
--  (4 Zeilen)

SELECT brand || ' ' || model || ' im Jahre ' || year AS "Brand Model im Jahre" FROM cars;
--  
--      Brand Model im Jahre
--  -----------------------------
--   Ford Mustang im Jahre 1964
--   BMW M1 im Jahre 1978
```

### CTE - Common Table Expressions
They are essentially temporary views that can be used to break up complex queries. They cannot be used in WHERE-clauses.  
 Their syntax uses `WITH`, `AS` and `SELECT`
```SQL
-- 1st CTE
WITH import_orders AS (
    SELECT * FROM orders
),
-- 2nd CTE
aggregate_orders AS (
    SELECT
        customer_id,
        COUNT(order_id) AS count_orders
    FROM import_orders
    WHERE status NOT IN ('returned', 'return pending')
    GROUP BY customer_id
),
-- 3rd CTE
segment_users AS (
    SELECT
        *,
        CASE
            WHEN count_orders >= 3 THEN 'super_buyer'
            WHEN count_orders >= 2 THEN 'regular_buyer'
            ELSE 'single_buyer'
        END AS buyer_type
    FROM aggregate_orders
)
SELECT * FROM segment_users;
```

### UNIONS & JOINS
While `UNION ALL` concatenate registers (duplicate or not) from tables with the same structure (same nº of columns, data types and order), `UNION` only allow non-duplicated.
```SQL
SELECT product_id
FROM products

UNION [ALL]

SELECT testproduct_id
FROM testproducts
ORDER BY product_id;
```

`JOIN`s combine different table, and it is often used in RDBMS.
```SQL
-- INNER
SELECT testproduct_id, product_name, category_name
FROM testproducts
INNER JOIN categories ON testproducts.category_id = categories.category_id;

-- LEFT
SELECT testproduct_id, product_name, category_name
FROM testproducts
LEFT JOIN categories ON testproducts.category_id = categories.category_id;

-- RIGHT
SELECT testproduct_id, product_name, category_name
FROM testproducts
RIGHT JOIN categories USING (category_id); 
-- `USING` is a special-case `ON` for when fields have the same name.

-- FULL
SELECT testproduct_id, product_name, category_name
FROM testproducts
FULL JOIN categories ON testproducts.category_id = categories.category_id;

-- CROSS JOIN permutes the 'n-rows' of table1 with 'm-rows' of table2
SELECT testproduct_id, product_name, category_name
FROM testproducts
CROSS JOIN categories;
```
<div align="center">
  <img src="./images/sql_join_types.svg" style='background-color: white; max-width: 1200px'>
</div>

### Iterate through array of arrays
https://stackoverflow.com/questions/9783422/loop-over-array-dimension-in-plpgsql
```SQL
DO -- Execute anonymous code blocks without needing to create procedure/function
$do$ -- code block starts
DECLARE
  m    varchar[];
  arr  varchar[] := array[['key1','val1'],['key2','val2']];
BEGIN
  FOREACH m SLICE 1 IN ARRAY arr 
  LOOP
    RAISE NOTICE 'a text %', m[1];
  END LOOP;
END
$do$; -- code block ends
```


### GROUP-BY CLAUSE, FUNCTIONS & TRIGGERS
> "Find the quantity of customers per country". 

The **GROUP BY Clause** uses Aggregate Functions to summarize the result-set by one or more columns. Note: `GROUP BY` does not accept `WHERE`; it uses `HAVING`.

Aggregation Functions tipically ignore NULL values. Some examples are **COUNT, MIN, MAX, SUM, AVG, GROUP_CONCAT (or STRING_AGG), STDDEV (or STDEV), VAR (or VARIANCE)**. Furthermore, function outputs can be cast or transformed with the `::` operator: 
```SQL
SELECT COUNT(customer_id), country 
FROM customers 
GROUP BY country 
[HAVING country LIKE 'I%'] 
[ORDER BY country];

-- Round the output to 2 decimals
SELECT AVG(price)::NUMERIC(10,2) FROM products;
```
[**Functions**](https://www.postgresql.org/docs/16/sql-createfunction.html) are created via `CREATE [OR REPLACE] FUNCTION`. The user must have `USAGE`. `PROCEDURE` is a `FUNCTION` that does not return a value, only does an administrative task. In **TRIGGERS**, the keyword `PROCEDURE` is still usable, but historical and deprecated.

Functions often use the **plpgsql language** for loops, private variable declaration and etc. `RAISE NOTICE` is used within codeblocks to print messages during function runtime. 

Some examples of functions:
```SQL
CREATE OR REPLACE FUNCTION increment(i integer) RETURNS integer AS 
$BODY$
  BEGIN
    RETURN i + 1;
  END;
$BODY$
LANGUAGE plpgsql;

-- Count nulls in a table
CREATE OR REPLACE FUNCTION count_nulls(tb_name text)
RETURNS TABLE (name_column text, null_count bigint)
AS $$
DECLARE
    column_record record;
    query_text text;
BEGIN
    FOR column_record IN 
        SELECT column_name
        FROM information_schema.columns
        WHERE table_name = tb_name
    LOOP
		name_column := column_record.column_name;
        query_text := format('SELECT COUNT(*) FROM %I WHERE %I IS NULL', tb_name, column_record.column_name);
        EXECUTE query_text INTO null_count;
		
        RETURN NEXT;
    END LOOP;
END;
$$ LANGUAGE plpgsql;
SELECT * FROM test_func('table_name_as_string');

-- Count registers in a table with prefix
CREATE OR REPLACE FUNCTION count_tbs(condition text)
RETURNS TABLE (tb_name text, count bigint)
AS $$
DECLARE
    tb_name text;
    query_text text;
BEGIN
    FOR tb_name IN 
        SELECT table_name
        FROM information_schema.tables
        WHERE condition
    LOOP
        query_text := format('SELECT COUNT(*) FROM %I', tb_name);
        EXECUTE query_text INTO count;
		
        RETURN NEXT;
    END LOOP;
END;
$$ LANGUAGE plpgsql;

-- Count distinct in column
CREATE OR REPLACE FUNCTION occurrences_count_distinct_and_null(tb_name text)
RETURNS TABLE (name_column text, null_registers bigint, unique_registers bigint, occurrences text)
AS $$
DECLARE
    column_record record;
    query_text text;
BEGIN
    FOR column_record IN 
        SELECT column_name
        FROM information_schema.columns
        WHERE table_name = tb_name
    LOOP
		name_column := column_record.column_name;
        query_text := format('SELECT COUNT(DISTINCT %I) FROM %I', column_record.column_name, tb_name);
		EXECUTE query_text INTO unique_registers;
		query_text := format('SELECT COUNT(*) FROM %I WHERE %I IS NULL', tb_name, column_record.column_name);
		EXECUTE query_text INTO null_registers;
		query_text := query_text := $q$
            SELECT 
                array_to_string(
                CASE 
                    WHEN array_length(array_agg(DISTINCT $1),1) > 8
                        THEN (array_agg(DISTINCT $1::TEXT))[:8]
                    ELSE array_agg(DISTINCT $1)
                END, ', ')
            FROM $2
        $q$;
        EXECUTE query_text INTO occurrences USING column_record.column_name, tb_name;
	
        RETURN NEXT;
    END LOOP;
END;
$$ LANGUAGE plpgsql;
SELECT * FROM count_distinct_and_null('ctf_pessoasgeoctf');
```

[**Triggers**](https://www.postgresql.org/docs/current/sql-createtrigger.html) are a special case of **Functions**, in that they happen BEFORE, AFTER or INSTEAD OF an event. A `FOR EACH ROW` + `WHEN`-Clause in a trigger might reference OLD (if UPDATE or DELETE) or NEW (if UPDATE or INSERT). The language `pgpsql` has a couple of useful pre-defined variables ([doc](https://www.postgresql.org/docs/current/plpgsql-trigger.html)). Examples:
```sql
-- Adjusting a point register updated with "field1" empty
CREATE OR REPLACE FUNCTION update_point() RETURNS TRIGGER AS
$BODY$
  BEGIN
    UPDATE schema.points
    SET
      sremg = schema.highroad.sremg,
      rodovia = schema.highroad.rodovia
    FROM schema.highroad
    WHERE ST_Intersects(schema.highroad.st_buffer, schema.points.shape);
    RETURN NEW;
  END;
$BODY$ 
LANGUAGE plpgsql;
CREATE [OR REPLACE] TRIGGER update_ponto_critico_trigger
    AFTER UPDATE ON schema.points
    FOR EACH ROW
    WHEN (NEW.field1 IS NULL)
    EXECUTE FUNCTION update_ponto_critico();


-- Archiving DELETE or UPDATE operations
CREATE TABLE R (
  ID        int PRIMARY KEY,
  r         int
);
CREATE TABLE R_Archiv (
  ID        int,
  r         int,
  Zeitpunkt timestamp with time zone,
  Operation text,
  PRIMARY KEY (ID, Zeitpunkt)
);
CREATE OR REPLACE FUNCTION archiviereTupel() RETURNS TRIGGER AS
$BODY$
  BEGIN
    INSERT INTO R_Archiv
      VALUES (OLD.id, OLD.r, now(), TG_OP);
    RETURN NEW;
  END;
$BODY$
LANGUAGE plpgsql;
CREATE TRIGGER archivTrigger 
    AFTER DELETE OR UPDATE ON R
    FOR EACH ROW
    EXECUTE FUNCTION archiviereTupel();
```

### TRANSACTIONS
It bundles multiple steps into a single, all-or-nothing operation; it is _atomic_. Transactions are logged. A transaction can be `ROLLBACK` instead of `COMMIT` if the results are not exactly the expected ones. One can also use `SAVEPOINT` ([doc](https://www.postgresql.org/docs/current/tutorial-transactions.html));
```SQL
-- >> Start Transaction
BEGIN;

-- >> Write Statements
UPDATE accounts SET balance = balance - 100.00
    WHERE name = 'Alice';
-- etc etc

-- >> Commit (finish) Transaction
COMMIT;
```

### INDEXES & TABLESPACES
**Indexes** accelerate the time querying with that field, but they add _overhead_ to general queries. An index is like the index of a book. A reader can use the index to quickly go to the occurences in the book, and the writer is responsible for elaborating the index table. Indexes can also benefit `UPDATE` and `DELETE` commands with search conditions. Indexes can moreover be used in join searches. Thus, an index defined on a column that is part of a join condition can also significantly speed up queries with joins. (check Instagram saved)

**Tablespaces** represent where in disk that the data will be kept. 
This allows the DBA (Database Administrator) not only to manage the database backup in parts
but also to pump up indexes of certain table which consequently speed up data requests.

### coalesce()
A function that returns the first of its arguments that is not null.


### VIEW, MATERIALIZED VIEW & TABLE
A **TABLE** is somewhat static in structure and laboursome to update. A **VIEW** is versatile in structure and always computes _on-the-fly_, which might not be optimal. A **MATERIALIZED VIEW** is versatile in structure, caches the last run, but scheduled maintenance for updates.

### [NOT] EXISTS
The `EXISTS` operator is used to test for the existence of any object
```SQL
SELECT customers.customer_name
FROM customers
WHERE EXISTS (
  SELECT order_id
  FROM orders
  WHERE customer_id = customers.customer_id
);
```

### ANY & ALL
The ANY/ALL operator:
- returns a Boolean value as a result
- returns TRUE if ALL of the sub query values meet the condition
- is used with SELECT, WHERE and HAVING statements
```SQL
-- Select products that have more than 10 orders
SELECT product_name FROM products
WHERE product_id = ALL (
  SELECT product_id FROM order_details
  WHERE quantity > 10
  );
```

### `CASE-WHEN-ELSE`, `IIF` and `IF-ELSIF-ELSE`
`CASE-WHEN-ELSE` is an expression, goes through conditions and returns a value when the first condition is met. Once a condition is true, it will stop reading and return the result. If no conditions are true, it returns the value in the ELSE clause. If there is no ELSE part and no conditions are true, it returns NULL.

`IIF` is the "imediate if". It works as "IIF(CONDITION, TRUE, FALSE)".

`IF-ELSIF-ELSE` is used to control structure, ie to chose what blocks/statements are executed.
```SQL
SELECT 
  product_name,
  -- CASE-WHEN-ELSE
  CASE
    WHEN price < 10 THEN 'Low price product'
    WHEN price > 50 THEN 'High price product'
    ELSE 'Normal product'
  END AS "price category"

  -- IIF
  IIF(price < 10, 'Low price product', 
    IIF(price > 50, 'High price product', 'Normal product'))
    AS "price category"
FROM products;
```


### `Role` & `Group roles` in PostgreSQL
ROLE is used for users. GROUP ROLE is used to set permits that will more than one user might acquire.

## Allow any outside connection
In PostgreSQL's dir make sure `data/postgresql.conf` is listening all addresses: `listen_addresses = '*'`; and that `pg_hba.conf` allow all ips connections `host all all 0.0.0.0/0 md5`.

Restart PostgreSQL service in Windows 
```cmd
rem (substitute XX with the version)
net stop postgresql-x64-XX
net start postgresql-x64-XX
```

If statements in SQL
```SQL
SELECT 
   IIF(ISNULL(tab12.column1), 'N.A.', column1) as alias1,
   tab12.column2
FROM 
   tab1 LEFT JOIN tab2 ON tab1.id = tab2.id AS tab12
WHERE
   column2 IS NOT NULL AND column2 NOT LIKE 'Po*';
```
## pg_dump & pg_restore
It basically involves two commands. AFter it, a data validation phase is recommended.
```shell
# Copy / make a backup
pg_dump -U username -h source_host -d sourc_database > backup.sql
# Restore
pg_restore -U username -h target_host -d target_database < backup.sql
```


## > PostGIS
PostGIS is an extension for PostgreSQL to work with geospatial data. It adds functions, views and tables to schema PUBLIC, which then enables users connected to any schema to use it.

Examples using PostGIS:
```SQL
-- Selecting the intersections and showing them in m2
SELECT 
    uc.nome AS Nome_UC, 
    pdot.sigla AS Sigla_PDOT, 
    pdot.macroarea AS Nome_PDOT,
    SUM(ST_Area(ST_Intersection(uc.geom, pdot.geom)))::INT AS Area_Sobreposta_em_m2
FROM 
    v03.d1_2_unidade_protecao_integral AS uc
JOIN 
    v03.d3_1_pdot_zoneamento AS pdot 
ON 
    ST_Intersects(uc.geom, pdot.geom)
GROUP BY 
    Nome_UC, Sigla_PDOT, Nome_PDOT 
ORDER BY 
    Nome_UC, Area_Sobreposta_em_m2 DESC;

-- Create a new geospatially enabled table from the union of geometries of another table
CREATE TABLE sisdia.apa_planalto_central AS 
SELECT
    1::integer AS objectid, 
    'Área de Proteção Ambiental do Planalto Central'::varchar(255) AS nome, 
    'Decreto da Presidência da República de 10 de janeiro de 2002'::varchar(255) AS ato_legal, 
    'zn_apa_planalto_central'::varchar(255) AS camada_zoneamento,
    ST_Simplify(ST_Union(geom), 0.01)::geometry AS geom 
FROM sisdia.zn_apa_planalto_central;
```

## > DBLINK - SQL statement inter-servers
It only work between PostgreSQL database servers.  
Ensure the extension is available. You can add it as superuser: `CREATE EXTENSION dblink;`.  
Use dblink to create a connection a name it with an alias:

`SELECT dblink_connect('choose_an_alias', 'hostaddr=123.123.123.123 port=5432 dbname=gdf user=the_username password=p4ssw0rd');`

Statements using dblink must specify the type of the fields:  
https://www.postgresql.org/docs/10/contrib-dblink-function.html

The clause inside `dblink` must be possible to run in the target server. Columns can be likewise converted during the clause. Their type must still be declared.

```SQL
CREATE TABLE v02.utmf_distritos_jun_2018 AS
  SELECT * 
  FROM dblink('gdf','
    SELECT 
      gid, 
      utmf, 
      nome_ofc, 
      modulo, 
      distrito::float8, 
      geom
    FROM dflegal.utmf_distritos_jun_2018 
    ORDER BY 1
  ') AS t(
    gid integer, 
    utmf character varying, 
    nome_ofc character varying, 
    modulo character varying, 
    distrito float8, 
    geom geometry(MultiPolygon, 31983)
    );
```

### In SQL, 
```SQL
-- string_agg(expression, delimiter)
SELECT 
  string_agg(campotexto || ' #' || conta, ' | ') 
FROM (
  SELECT 
    bacia_hidr AS campotexto,
    count(*) AS conta 
  FROM 
    sisdia.outorga_aguas_pluviais
  GROUP BY 
    bacia_hidr
) AS subquery;
```

---

### To-Order
#### MODIFYING TABLE
```sql
 ALTER TABLE person ...
   DROP CONSTRAINT person_pkey;					removes the primary key constraint
   RENAME people;						renames table
   ADD PRIMARY KEY (id);					adds primary key
   ADD CONSTRAINT ...
     constraint_name UNIQUE (email);				makes email unique
     constraint_name CHECK (gender IN ('Male', 'Female'));	creates a check constraint
 DELETE FROM table;						deletes all in the table
 DELETE FROM table WHERE condition;				deletes all where condition evaluates true
```

ON CONFLICT - useful for insert a new register, or update if exists
 statement...
```sql
    ON CONFLICT (id) DO NOTHING;				if hindered by a constraing involving id, do nothing
    ON CONFLICT (id) DO UPDATE SET email = EXCLUDED.email;	user tries to register again with other e-mail. conflict happens. email updated
```
- Export a query to csv
```sql
\copy (SELECT * FROM person LEFT JOIN car ON car.id = person.car_id) TO 'path' DELIMITER ',' CSV HEADER;
```
- Work with geospatial data .gpkg and .shp:  
  Add PostGIS Bundle  3.2.1 for PostgreSQL x64 14 via StackBuilder (postgis_32_sample <- database name
  a series of Environmental Variables will be set
  PROJ
  GDAL_DATA (env variable)

- Running several commands from a file "\i path"  
On Windows, the path must have `/` instead of `\`
```sql
\i 'C:/juliano/sapotec/Memoria/2022 08 01/SQL (Thomas)/Dados_brutos/SQL_commands.sql'
```
- Errors 
  - pgadmin4 : postgresql application server could not be contacted. [pgAdmin4 err]  
Solution: delete content inside
`C:\Users\%USERNAME%\AppData\Roaming\pgAdmin\sessions`

  - postgresql permission denied while importing from file  
Solution: Windows does not accept backslash '\'; change em to '/'


SQL: <https://youtu.be/zsjvFFKOm3c>

Further videos:
https://youtu.be/17AZQ2-5Rrk
https://youtu.be/eddcoyLtqqs
https://youtu.be/gC0z4miZmtQ
https://youtu.be/7OUxHAhqMv8
https://youtu.be/m6jLnEOoZvw
https://youtu.be/0yMXbew4tsA
https://youtu.be/QpUZd2TQ0H0
https://youtu.be/gUKrlBNYxlg
https://youtu.be/t8-BQjWJFKw
https://youtu.be/F3AkNXiSv50
https://youtu.be/Vfq0Mje1z-E
https://youtu.be/vlqLJtZW3AA
https://youtu.be/nqRjg5SQJiw
https://youtu.be/P-iHxxj7heE

Still cant see tables in QGIS:
https://gis.stackexchange.com/questions/285543/tables-do-not-show-in-qgis-postgis

## ![Microsoft Access](https://img.shields.io/badge/Microsoft_Access-A4373A?style=for-the-badge&logo=microsoft-access&logoColor=white)
Microsoft Access is part of Microsoft Office. It joins the Microsoft Jet Engine as RBDMS with IDE tools, which GUI is specially adequate for targetting DB user groups. MS Access supports (to a certain degree) SQL from version 2007 on. The system is for entry-level size databases. 

Insert Data in Microsoft Access
- From Excel  
External Data > New Data Source > From File > Excel  
Follow the wizard (watch out for correct [Data Types](https://support.microsoft.com/pt-br/office/tipos-de-dados-para-bancos-de-dados-da-%C3%A1rea-de-trabalho-do-access-df2b83ba-cef6-436d-b679-3418f622e482) because Access might misinterpret the field since it infers from the first registers). For instance, **SHORT_TEXT** is up to 255 characters. While **LONG_TEXT** permits up to 1GB, Access only supports showing up to 64k characters.  
**Access** either (1) adds a **PRIMARY KEY**, (2) asks you to pick one, or (3) insert a table without **PRIMARY KEY**.
> If anything goes wrong while importing data, a table named “NAME$_importError”will show up
 


When and what fields to index?
- Index fields that are called frequently. This may accelerate queries, but also slows the process of inserting and updating data. Every time a index table has a change, it must updates the indexes — [more here](https://support.microsoft.com/pt-br/office/criar-e-usar-um-%C3%ADndice-para-melhorar-o-desempenho-0a8e2aa6-735c-4c3a-9dda-38c6c4f1a0ce). Indexed registers are normally processed by a *hash-function* and consequently operate under O(1) speed when queried.
<div align="center">
<img src="./images/hash_function.png">
</div>
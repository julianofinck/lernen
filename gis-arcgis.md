TODO:  
- Test via ArcGIS Pro the effect of SDE and the administrator being different 


# 1. ArcGIS EGDB on PostgreSQL RDBMS 
The ArcGIS Enteprise Geodatabase (EGDB) is a component of the ArcGIS Enterprise suite. Its difference to a GDB is that it is implemented via a RDBMS and not system files. Consequently, it supports multiple connections, versioned editting, more flexible lock mechanism, history and access via SQL. Esri recommends its creation via the `Create Enterprise Geodatabase` tool of the respective ArcGIS Desktop, which works different for each RDBMS.

## About the EGDB
The public schema only serves managing. PostGIS and EGDB uses it to keep reference table, like the coordinate system list. Each table registered in a EGDB has an associated `i###` table, which controls the counter for the respective `objectid`.

To consolidate a table created via SQL in a EGDB, it must be registered in the EGDB. The registration process adds indexes, auxiliary tables and functions used by the EGDB to manage the table. A table created via SQL must have at least an **integer unique field** to act as the OID -- typically `objectid` --, a **geometry field** -- typically `geom` -- (if Feature Class use is intended) and there must be NO primary key restriction whatsoever. Tables are registered using ArcGIS Pro GUI or `arcpy.management.RegisterWithGeodatabase`.

EGDB cannot handle VARCHAR (character varying) fields without a set length. Never forget to define a length before registering. Otherwise, the EGDB will create a field with the maximum number of characters possible.

Data Editors must only access EGDBs via ArcGIS Pro or ArcMap because these can correctly deal with the _system tables_. INSERT and DELETE operations when undertaken via `QGIS & PostgreSQL` might lead to inconsistencies in the EGDB. Via QGIS, registers should only be update; EGDB specific editor users for QGIS should only have thus the folling grants: SELECT & UPDATE. Nevertheless, UPDATES should be taken with care if versioning is on.

Feature Datasets are structures to keep Feature Classes together and under the same reference system. Feature Datasets can not be seen in PostgreSQL but in ArcGIS Pro and are required to STABLISH RELATIONSHIP OF TOPOLOGY, NETWORK DATASET, TERRAIN, GEOMETRIC NETWORK & PARCEL FABRIC. Relationships 1:m can be created in ArcGIS Pro by right-clicking over the EGDB "New > Relationship Class".

## 1.1. Setting up an EGDB
### 1.1.1. Installing RDBMS PostgreSQL
1. Install ArcGIS Server and authorize it.
2. Copy **keycodes** to somewhere accessible by ArcGIS Pro  
Keycodes path: `\Program Files\Esri\License<release#>\sysgen\keycodes`
3. Install PostgreSQL with PostGIS
4. For the RDBMS to be recognized in the installation of a EGDB, copy `st_geometry.dll` from ArcGIS Server installation  
(e.g. `C:\ArcGIS\Server\DatabaseSupport\PostgreSQL\10\Windows64\st_geometry.dll`  
to `C:\Program Files\PostgreSQL\11\lib\st_geometry.dll`)
5. Restart the RDBMS service
### 1.1.2. Prior Configurations in PostgreSQL
6. A superuser called "sde" is necessary for managing procedures in a EGDB. If this user is not found under ROLEs, it gets automatically created with `Create Enterprise Geodatabase`. To create a superuser, you need to be a superuser like `postgres`.
```SQL
-- Manager in SQL to remove lock of layers and perform admin procedures
CREATE ROLE sde WITH
  LOGIN
  SUPERUSER
  INHERIT
  CREATEDB
  CREATEROLE
  REPLICATION;
ALTER ROLE sde WITH PASSWORD 'password';

-- Database owner user (which can be different to sde)
CREATE USER specific_system WITH
  LOGIN
  NOSUPERUSER
  INHERIT
  NOCREATEDB
  NOCREATEROLE
  NOREPLICATION;
ALTER ROLE specific_system WITH PASSWORD 'password';
```
Although the database owner usually is `sde`, it can be another `user` willing to take the data management role. Below a database is created with owner `specific_system`, keeping the tables of the database separated in a specific tablespace. 

```SQL
-- Creating a specific tablespace for the new database
CREATE TABLESPACE tblsp_egdb
  OWNER sde
  LOCATION '<POSTGRES_HOMEDIR>/version/data/sde_tblspaces';

-- Creating the database 
CREATE DATABASE database_name
  WITH
  OWNER = specific_system
  ENCODING = 'UTF8'
  LC_COLLATE = 'pt_BR.UTF-8' -- or 'Portuguese_Brazil.1252'
  LC_CTYPE = 'pt_BR.UTF-8' -- or 'Portuguese_Brazil.1252'
  TABLESPACE = tblsp_egdb
  CONNECTION LIMIT = -1;

-- Search for tables first in schema named after the user, then public, then sde  
ALTER DATABASE database_name
SET search_path TO "$user", public, sde;

-- Create schema (the owner is the user that created it)
CREATE SCHEMA sde AUTHORIZATION sde;
 
-- Give GRANTS to certain roles or group roles:
GRANT TEMPORARY, CONNECT ON DATABASE database_name TO specific_project;
GRANT ALL ON DATABASE database_name TO sde;
```
### 1.1.3 Create the EGDB

Use `Create Enterprise Geodatabase` from ArcGIS Pro toolbox, providing the host (eg. `10.10.12.10,5432`), db_name, database superuser username and password (usually, `postgres`), geodatabase password (the username will get automatically filled with `sde`), the tablespace created and the authorization file (the keycode one). Recent ArcGIS Pro versions have the "spatial type" option in "Create Enterprise Geodatabase", which can be selected as POSTGIS to ensure interoperability with opensource. The tool creates the _system tables_ which control the EGDB. 
> While the dataset table content can be managed via SQL, the _system tables_ should exclusivelly be altered by the ArcGIS tools. Done otherwise, inconsistencies might lead the EGDB to failure.

#### (Deprecating) 1.1.3.1  Set up the standard geometry type
**ST_GEOMETRY** is an Esri geodata standard format, and **PG_GEOMETRY** is an opensource version used by PostGIS. In the past, to allow the interoperability between proprietary and opensource the following steps could be taken:
- Add the extension postgis;  
- Configure `sde_dbtune`;

```SQL
-- Add extensions to databases (must be connected as superuser)
CREATE EXTENSION postgis;

-- Enable "PG_GEOMETRY" as default (recent ArcGIS Pro versions have the "spatial type" option in "Create Enterprise Geodatabase", which is then selected as POSTGIS, not requiring this step in SQL necessarily. )
UPDATE sde.sde_dbtune
  SET config_string = "PG_GEOMETRY"
  WHERE KEYWORD = "DEFAULTS"
  AND parameter_name = "GEOMETRY_STORAGE";
```
#### 1.1.3.2 Add dblink extension (connect between others pg_db)
Adding the dblink extension can be useful to connect other pg_db isntances.
```SQL
-- Allow connections with other pg_db instances
CREATE EXTENSION dblink;
```
---
### 1.1.4. Users Setup and Data Access
Esri recommends 3 group roles for a EGDB production environment:
```SQL
CREATE ROLE dataeditor WITH
  NOLOGIN
  NOSUPERUSER
  NOINHERIT
  NOCREATEDB
  NOCREATEROLE
  NOREPLICATION;

CREATE ROLE dataowner WITH
  NOLOGIN
  NOSUPERUSER
  NOINHERIT
  NOCREATEDB
  NOCREATEROLE
  NOREPLICATION;

CREATE ROLE dataviewer WITH
  NOLOGIN
  NOSUPERUSER
  NOINHERIT
  NOCREATEDB
  NOCREATEROLE
  NOREPLICATION;
```
### Create a schema
Connect as the user of the `specific_project` and create a schema under the same name:
```SQL
-- Create schema (the schema must be created by an user with CREATEDB grant in the database)
CREATE SCHEMA specific_project AUTHORIZATION specific_project;

-- To allow data access to all user even if not schema owners
GRANT USAGE ON SCHEMA specific_project TO PUBLIC;
```

### Permission given via roles
`USAGE` given to public grants anyone to see the table exist in the schema. `SELECT` grants query statements.
```SQL
-- For the data viewer
GRANT SELECT ON TABLES IN SCHEMA specific_project TO dataviewer;
ALTER DEFAULT PRIVILEGES IN SCHEMA specific_project 
GRANT SELECT ON TABLES TO dataviewer;

-- For the data editor
GRANT SELECT, DELETE, INSERT, UPDATE ON TABLES IN SCHEMA specific_project TO dataviewer;
ALTER DEFAULT PRIVILEGES IN SCHEMA specific_project 
GRANT SELECT, DELETE, INSERT, UPDATE ON TABLES TO dataviewer;
```
If permission are not given via GROUP ROLES, then managing might become cumbersome and error-prone. Generally, it is more adequate to provide data access via geoservices than to create users to access the database directly.

```SQL
-- Best Practice - Adding a new user with dateviewer permission via GROUP ROLE "dataviewer"
CREATE ROLE user08594 WITH
  LOGIN
  NOSUPERUSER
  INHERIT
  NOCREATEDB
  NOCREATEROLE
  NOREPLICATION;
ALTER ROLE user08594 WITH PASSWORD 'p4ssw0rd';
GRANT dataviewer TO user08594;
```

More complex models might consider using [ArcGIS API for Python](https://developers.arcgis.com/python/).

## 1.2 Optimizing an EGDB
Indexes can accelerate recurrent processes.
```SQL
-- KEEP DATA AT ONE PLACE< and a INDEX in a SSD, faster IO-speed>
-- Create a Tablespace owned by SDE (For some reason, we are creating _data and _index)
-- _data
CREATE TABLESPACE ts_dbctf_data
  OWNER sde
  LOCATION '/opt/postgres/tablespaces/ts_dbctf_data';
GRANT CREATE ON TABLESPACE ts_dbctf_data TO dataowner; (or ctf?)
GRANT CREATE ON TABLESPACE ts_dbctf_data TO sde;
-- _index
CREATE TABLESPACE ts_dbctf_index
  OWNER sde
  LOCATION '/opt/postgres/tablespaces/ts_dbctf_index';
GRANT CREATE ON TABLESPACE ts_dbctf_index TO dataowner; (or ctf?)
GRANT CREATE ON TABLESPACE ts_dbctf_index TO sde;
```

## Migration
Many tools available
- arcpy.conversion.FeatureClassToFeatureClass
- Data Management Tools > Copy > [Features | Copy Features] | [General | Copy] | [Table |Copy Rows]
- conversion tools > WFS To Feature Class
- via XML Workspace (good for migrations from testing/staging to production)
Migration via XML workspace is simpler than that via pg_dump. XML brings functions and more (check that)  


### Geodatabase Replication
To replicate an [enterprise] geodatabase expecting to a future merge or comparison
https://pro.arcgis.com/en/pro-app/help/data/geodatabases/overview/a-quick-tour-of-replica-management.html

### Disaster Risk Tool
Hot new info from Esri Dev Summit 2024

## Versioning
Versioning "Aplicável apenas para uma Feature Class simples (pontos, linhas, polígonos, anotações ou Relationship Class), ou seja, que não participa de uma topologia ou estrutura de rede."

Editting non-versioned layers might imply locks at the level of table or register

Traditional Versioning is activated in a table via ArcGIS Pro by right-clicking on "Register As Versioned". Feature classes outside can be versioned. If a feature class is inside a dataset, the entire dataset must be versioned. If versioned is turned on, then "a###" and "d###" tables will be created to keep last added and deleted registers.

vocabulary: 
https://pro.arcgis.com/en/pro-app/help/data/geodatabases/overview/versioning-vocabulary.html

the edit process includes creating versions, and reconciling versions. The tools are in the "Version Toolbox" in ArcGIS Pro.
https://pro.arcgis.com/en/pro-app/help/data/geodatabases/overview/the-version-editing-process.html

Another type of versioning is the branch-versioning, which then only allows editting via the geoservice.


## Topology
O objetivo principal das topologias do
geodatabase é otimizar o tempo gasto no processamento e validação das Feature Classes antes
de serem utilizados, exibindo relacionamentos topológicos, erros e exceções.
Deve ser não versionado.

Pode ter mais de 1 topologia em um dataset, mas cada feature class só pode fazer parte de uma topologia. Ela é criada pelo GDB. Layers that will be validated must be selected and also the rule to be checked. An Error Toolbar will appear, and one can zoom to the errors, fix it and click on the icons for “Valide Topology in Current Extent” or “Validade Topology in Specified Area”.

## Additional Links
Compatibildiades EGDB e ArcGIS Desktop:  
https://desktop.arcgis.com/en/arcmap/latest/manage-data/gdbs-in-postgresql/client-postgresql-compatibility.html

The right RDBMS version must be download as to match EGDB:  
https://desktop.arcgis.com/en/system-requirements/10.6/database-requirements-postgresql.html

System Tables created in a PostgreSQL by EGDB:
https://desktop.arcgis.com/en/arcmap/10.6/manage-data/gdbs-in-postgresql/system-tables-postgresql.html

The only user (login role) who has the right to create objects in the database and editing table structures is the one with the same name as the schema in which they are owner.
https://desktop.arcgis.com/en/arcmap/10.6/manage-data/gdbs-in-postgresql/privileges-postgresql.html

Data types accepted in a PostgreSQL EGDB
https://desktop.arcgis.com/en/arcmap/10.6/manage-data/gdbs-in-postgresql/data-types-postgresql.html

Data maintenance strategies (editting and updating geospatial data)
https://desktop.arcgis.com/en/arcmap/10.6/manage-data/geodatabases/data-maintenance-strategies.htm

Details related to locks in PostgreSQL for non-versioning
https://desktop.arcgis.com/en/arcmap/10.6/manage-data/geodatabases/concurrency-and-locking.html



# ArcGIS Experience
Experience focus on responsiveness, intelligent URL that modifies view based on screen size. Complete control over layout (placement, size, spacing, overlap). Allows 2D and 3D content. Provides actions so that widgets work together. Template options for final layout (single or multi-page application, or a scrolling/static page)

Certain widgets are only in WebAppBuild: Parcel Drafter or Public Notification. (July 8, 2022)

https://geospatialtraining.com/

## During [Installing](https://developers.arcgis.com/experience-builder/guide/install-guide/) I followed this [Video](https://youtu.be/BcJxNaKuTxg)
1. Download Node.js LTS version (I got `node-v18.16.0-x64.msi`) and run it
(During installation, I checked the Tools for Additional Modules)

Upgraded via Chocolatey:
 - chocolatey-dotnetfx.extension v1.0.1
 - visualstudio2019buildtools v16.11.25.0
 - kb3033929 v1.0.5
 - python3 v3.11.2
 - chocolatey-windowsupdate.extension v1.0.5
 - vcredist140 v14.34.31938
 - kb2999226 v1.0.20181019
 - visualstudio-installer v2.0.3
 - kb2919355 v1.0.20160915
 - chocolatey-core.extension v1.4.0
 - python311 v3.11.2
 - kb2919442 v1.0.20160915
 - chocolatey-visualstudio.extension v1.10.2
 - vcredist2015 v14.0.24215.20170201
 - chocolatey-compatibility.extension v1.0.0
 - dotnetfx v4.8.0.20220524
 - visualstudio2019-workload-vctools v1.0.1
 - kb3035131 v1.0.3
 - python v3.11.2

2. Download zip do ArcGIS Experience Builder (Downloaded the latest release v1.11 - March 15, 2023)
3. Sign to ArcGIS for Developers.
4. Browse to "localhost:3001"
5. API asks for the URL of my ArcGIS Online organization or Enterprise and the Client ID (set in OAuth 2)
https://codexremote.maps.arcgis.com/
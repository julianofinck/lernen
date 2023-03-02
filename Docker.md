# [Docker](https://www.docker.com/)

Facilitates setting up dependencies and settings via **virtual containers** into which applications and dependencies are packaged. 
**Containers** are portable to any system with Docker installed. On Windows, Docker Desktop requires WSL2.

Here's a good start: [Tutorial](https://docs.docker.com/get-started/)

  --------------------------------------------------------------------------------
### Glossary 
* image: template/modelo para uso nos containers;
```
docker image ls                                 # List images
docker rmi <image_name/image_id>                # Remove image by name/id
docker build -t <image_name:tag> .              # . builds in the same local
```
* container: OS, linguagens e eventuais libs;
```
docker container ls -a                          # List containers
docker rm <container_name/container_id>         # Remove container by name/id
docker container stop <container_name>          # Stops container
```

 --- 
 Use a "docker-compose.yml" when apps scale up; run it with a single command: "docker-compose up"
```docker-compose
version: '3'
services:
  web:
    build: .
    ports:
      - "8080:8080"
  db:
    image: "mysql"
    environment:
      MYSQL_ROOT_PASSWORD: password
    volumes:
      - db-data:/foo
  volumes:
    db-data
```
Furthermore, Kubernetes provides an even more advanced container orchestration platform.

 ---
### EXAMPLE: Docker commands for setting geonetwork 3.10.x with PostgreSQL+Postgis
```
docker build -t postgres_postgis:15.1 -f Dockerfile_pg .
docker build -t tomcat_geonetwork:3.10.x -f Dockerfile_gnet .
docker network create geonetwork
docker run -d --name postgres_gnet --network geonetwork --network-alias postgres -v postgres-data:/var/lib/postgresql -e POSTGRES_PASSWORD=admin -e POSTGRES_DB=gn postgres_postgis:15.1
docker run -dp 8081:8080 --name tomcat_geonetwork --network geonetwork --network-alias geonetwork -e POSTGRES_PASSWORD=admin -e POSTGRES_DB=gn tomcat_geonetwork:3.10.x
     
# Add bind mount volume to get .xml     -v postgres-data:/var/lib/postgresql
```

 --------------------------------------------------------------------------------
### Sheetcode
#### From DockerHub, find an image tag, extend it using a Dockerfile
```Dockerfile
FROM mysql
ENV MYSQL_ROOT_PASSWORD secr3t_password
```
#### Build image (Dockerfile to image) ¹Use dot for working dir
```
docker build -t <tag_name> -f <dockerfile_path> <dir_in_which_to_build¹>
```
#### Make a container
```
docker run -d --rm --name <container_name> <image_tag_name>
# -d (detach)	execute in background (shell does not freeze)
# --rm		se o container ja existir, ele será removido para que um novo seja criado
```

• Executar comandos dentro de um container que está rodando
-i		permite que o processo não seja terminado até ser concluido
*exemplo para rodar um script em sql num db mysql "mysql -uroot -pprogramadorabordo < api/db/script.sql"
```
docker exec -i <nome_container> <comando_a_utilizar*>
```

• Acessar a shell da aplicação (exemplo acessando um banco nomeado "pprogramadorabordo" em mysql)
```
docker exec -it mysql-container /bin/bash
mysql -uroot -pprogramadorabordo
```

• Para container
Quando um container é parado, tudo é perdido/excluído, a menos que se use um volume
```
docker stop <nome_container>
```
• Volume

Example - Postgres
 ---
Go to dir, pull the image (alpine is the smallest setup), check whether image is downloaded
```docker
cd to dir
docker pull postgres:alpine
docker images
docker run --name my_postgres -e POSTGRES_PASSWORD=admin -p 5432:5433 -d postgres
# iteractively bash-execute into the container (must be windows) 
docker exec -it my_postgres
# Accessing psql using the superuser
psql -U postgres

# Getting the ip to access from my computer
docker inspect -f "{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}" my_postgres
```

docker build -t geonetwork -f Dockerfile_postgres

### Error 127
O comando não foi encontrado no OS.
Caso `unzip` não tenha sido encontrado e o package manager do OS seja `apt-get`
```sh
[sudo] apt-get install unzip
```
* Talvez seja necessário "sudo" para ter permissão e adicionar a senha do OS;

 --------------------------------------------------------------------------------
# Getting started Tutorial
  • First, clone a repository
```
docker run --name repo alpine/git clone https://github.com/docker/getting-started.git
docker cp repo:git/getting-started/ .
```

  • Now, build the image
```
cd getting-started
docker build -t docker101tutorial .
```

  • Run your first container
```
docker run -d -p 80:80 --name docker-tutorial docker101tutorial
```

  • Now save and share your image (must be logged in Docker Hub)
```
docker tag docker101tutorial julianofinck/docker101tutorial
docker push julianofinck/docker101tutorial
```

  • Now get an app up and running; Click the 'View in Browser'
   for a hands-on tutorial!



## Pesquisar como deletar Container e Imagens mortas


Where's my docker running at?

`docker info 2> nul | findstr /C:"Operating System" /C:"OS"`

# Known errors:
failed to solve with frontend dockerfile.v0: failed to create LLB definition: pull access denied, repository does not exist or may require authorization: server message: insufficient_scope: authorization failed

First, make sure there the image name is correct "name:tag", and check its existence in hub.docker.com

If it is, try to relog:
```bash
docker logout
docker login
#insert your Username and Password to DockerHub
 ```

Cleaning up Docker
# Clear all Docker unused objects (images, containers, networks, local volumes)
docker system prune 
# Or, one can prune specific objetcs like: 
docker image prune
docker container prune
docker network prune
docker volume prune
 
# Persist data
By default containers don't keep changes when restarted, they always start from their image, but there are two ways to persist data.
## Volume mount
Volume is fully managed by Docker, including where it is stored on disk. User only must only remeber the name of the volume.
```
docker volume create <volume-name>
# add "--mount type=volume,src=<volume-name>,target=<absolute-path-of-to-persist-dir>" 
docker volume inspect <volume-name>
# Mountpoint is where it is on disk
# \\wsl$\docker-desktop-data\data\docker\volumes
Bind Mount: This allows you to mount a directory from the host file system into a container. The data in the bind-mounted directory is stored on the host file system and changes to the data are reflected in both the host and container.

Volume: This is a dedicated file system managed by Docker that lives on the host file system. Volumes are used to persist data even if the container is deleted or recreated, and they can be shared between containers.
```

# Vmmem consuming too much ram
Create a file named ".wslconfig" in your %userprofile% with the following to limit to 2gb RAM.
```
[wsl2]
memory=2GB
```
[source](https://www.koskila.net/how-to-solve-vmmem-consuming-ungodly-amounts-of-ram-when-running-docker-on-wsl/)
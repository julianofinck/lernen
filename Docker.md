# [Docker](https://www.docker.com/)

Facilitates setting up dependencies and settings via **virtual containers** into which applications and dependencies are packaged. 
**Containers** are portable to any system with Docker installed. On Windows, Docker Desktop requires WSL2. [Tutorial](https://docs.docker.com/get-started/)

---

## -- Set Up --
Download Docker Desktop  
Enable Docker between Windows and WSL in Docker Desktop Settings:  
`General > Check "Use the WSL 2 based engine"`  
`Resources > WSL Integration > Enable integration with my default WSL distro`

---

## -- Glossary -- 
 **Image**: template/modelo para uso nos containers;
```
docker image ls                                 # List images
docker rmi <image_name/image_id>                # Remove image by name/id
docker build -t <image_name:tag> .              # . builds in the same local
```
**Container**: OS, linguagens e eventuais libs;
```
docker container ls -a                          # List containers
docker rm <container_name/container_id>         # Remove container by name/id
docker container stop <container_name>          # Stops container
```
---



## --- Scale Up --
- Run "docker-compose up" when apps scale up; 
 
```Docker
# Boilerplate of a "docker-compose.yml"
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
- Furthermore, Kubernetes provides an even more advanced container orchestration platform.



## -- Sheetcode --
Extend an image
```Dockerfile
FROM mysql # An image tag in local or from Docker Hub
ENV MYSQL_ROOT_PASSWORD secr3t_password # set any additional Environment Variable
```

```Bash
# Build image (Dockerfile to image) ¹Use dot for working dir
docker build -t <tag_name> -f <dockerfile_path> <dir_in_which_to_build¹>

# Make a container
docker run <flags> --name <container_name> <image_tag_name>
# -d (detach)	execute in background (shell does not freeze)
# --rm		    if container already exists, it gets substituted
# -i          execute commands inside the container

docker exec -i <nome_container> <comando_a_utilizar*>
# *exemplo para rodar um script em sql num db mysql "mysql -uroot -pprogramadorabordo < api/db/script.sql"

# Acessar a shell da aplicação (exemplo acessando um banco nomeado "pprogramadorabordo" em mysql)
docker exec -it mysql-container /bin/bash
mysql -uroot -pprogramadorabordo

# Stop container (without a volume, all is reset)
docker stop <nome_container>
```

## -- Volumes to Persist data --
Containers don't keep changes by default when restarted, they start from image. Nevertheless, data can be persisted via volumes. A volume is a dedicated file system managed by Docker that lives on the host file system. Volumes are used to persist data even if the container is deleted or recreated, and they can be shared between containers. 

There are two ways to persist data: 
- either a **Volume Mount**  
_Docker manages it fully, including where to store on disk. User only must only remeber the name of the volume._

```shell
# -- Create volume mount --
docker volume create <volume-name>

# -- Run container with volume --
docker run <flags> --mount type=volume,src=<volume-name>,target=<container-dir> <image>

# -- Where is the volume mountpoint in the Hyper-V? --
docker volume inspect <volume-name>
# in a WSL running in Windows it is in "\\wsl$\docker-desktop-data\data\docker\volumes"
```
- or a **Bind Mount** (mount a directory from the host file system into a container. The data in the bind-mounted directory is stored on the host file system and changes to the data are reflected in both the host and container):
```shell
docker run <flags> --mount type=bind,src="$(pwd)",target=/src <image>
```
## -- Cleaning up Docker --
```shell
# Clear all Docker unused objects (images, containers, networks, local volumes)
docker system prune 
# Or, one can prune specific objetcs like: 
docker image prune
docker container prune
docker network prune
docker volume prune
```

## Pesquisar como deletar Container e Imagens mortas
Where's my docker running at?
`docker info 2> nul | findstr /C:"Operating System" /C:"OS"`

---

## -- Examples --
Go to dir, pull the image (alpine is the smallest setup), check whether image is downloaded
```Bash
cd to dir
docker pull postgres:alpine
docker images
docker run --name my_postgres -e POSTGRES_PASSWORD=admin -p 5432:5433 -d postgres

# Iteractively bash-execute into the container (must be windows) 
docker exec -it my_postgres

# Accessing psql using the superuser
psql -U postgres

# Getting the ip to access from my computer
docker inspect -f "{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}" my_postgres
```

docker build -t geonetwork -f Dockerfile_postgres

### EXAMPLE: Docker commands for setting geonetwork 3.10.x with PostgreSQL+Postgis
```bash
docker build -t postgres_postgis:15.1 -f Dockerfile_pg .
docker build -t tomcat_geonetwork:3.10.x -f Dockerfile_gnet .
docker network create geonetwork
docker run -d --name postgres_gnet --network geonetwork --network-alias postgres -v postgres-data:/var/lib/postgresql -e POSTGRES_PASSWORD=admin -e POSTGRES_DB=gn postgres_postgis:15.1
docker run -dp 8081:8080 --name tomcat_geonetwork --network geonetwork --network-alias geonetwork -e POSTGRES_PASSWORD=admin -e POSTGRES_DB=gn tomcat_geonetwork:3.10.x
     
# Add bind mount volume to get .xml     -v postgres-data:/var/lib/postgresql
```





--- 

# [Getting started Tutorial](https://docs.docker.com/get-started/)

```Docker
# Clone a repository
docker run --name repo alpine/git clone https://github.com/docker/getting-started.git
docker cp repo:git/getting-started/ .

# Build the image
cd getting-started
docker build -t docker101tutorial .

# Run your first container
docker run -d -p 80:80 --name docker-tutorial docker101tutorial

# Now save and share your image (must be logged in Docker Hub)
docker tag docker101tutorial julianofinck/docker101tutorial
docker push julianofinck/docker101tutorial
```

  • Now get an app up and running; Click the 'View in Browser'
   for a hands-on tutorial!


---

## -- Known errors --

- **The timeout error**  
_Failed to solve with frontend dockerfile.v0: failed to create LLB definition: pull access denied, repository does not exist or may require authorization: server message: insufficient_scope: authorization failed_  
_Docker: Error response from daemon: Get "https://registry-1.docker.io/v2/": net/http: request canceled while waiting for connection (Client.Timeout exceeded while awaiting headers)._  
```bash
# Make sure the submitted image name "name:tag" exists in hub.docker.com or local
# If it does, relog:
docker logout
docker login --username <your_dockerhub_username>
# Remember to insert the Username (and not the E-Mail) and Password to DockerHub
 ```

- **Vmmem consuming too much ram**  
cd to %userprofile%, create a file named ".wslconfig" with the following:  
[source](https://www.koskila.net/how-to-solve-vmmem-consuming-ungodly-amounts-of-ram-when-running-docker-on-wsl/)
```
[wsl2]
memory=2GB
```

- **Error 127**
O comando não foi encontrado no OS.
Caso `unzip` não tenha sido encontrado e o package manager do OS seja `apt-get`
```Bash
[sudo] apt-get install unzip
```
* Talvez seja necessário "sudo" para ter permissão e adicionar a senha do OS;
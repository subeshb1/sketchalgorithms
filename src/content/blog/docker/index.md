---
title: Basic Docker commands and usage
date: '2019-09-07T22:40:32.169Z'
series: "Docker"
---



## Image
An image consists of all the binary files and codes.

## Container
Containers are running process.

## Basic docker commands

Before moving on, 
Set up docker

### Check docker version

```bash
$ docker --version
Docker version 19.03.2, build 6a30dfc
$ docker version # To view more details
Server: Docker Engine - Community
 Engine:
  Version:          19.03.2
  API version:      1.40 (minimum version 1.12)
  Go version:       go1.12.8
  Git commit:       6a30dfc
  Built:            Thu Aug 29 05:32:21 2019
....
```

### Running a container

To run or start a new container, there must be an image. Docker first checks if specified image is in local machine and if it can't find it then checks the docker registry and then starts a new container from the image. If docker doesn't find the image it fails to start or run the container.
```bash
$ docker run hello-world # hello-world is an image
```

### Status of a cotainer

We can see the list of running containers or process status. It shows the basic information of a containers which are container id that is automatically assigned by docker, the image name from which it has been started, the command ran, when it was created, its status, exposed ports and the name given to the container.
```bash
$ docker ps # lists running containers
CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS              PORTS               NAMES
054ed12946dd        ruby                "irb"               11 seconds ago      Up 10 seconds                           hopeful_shtern

$ docker ps -a # lists running containers
CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS                     PORTS               NAMES
054ed12946dd        ruby                "irb"               32 seconds ago      Up 31 seconds                                  hopeful_shtern
fc403e551a14        hello-world         "/hello"            4 seconds ago       Exited (0) 3 seconds ago                       nifty_antonelli
```

### Stopping a container

To stop a container simply run,

```bash
$ docker stop container_name
container_name 

$ docker ps -a  # See the status of the container
CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS                      PORTS               NAMES
054ed12946dd        ruby                "irb"               2 minutes ago       Exited (1) 58 seconds ago                       hopeful_shtern
```

### Removing a container

Stopping a container doesn't delete. In order to delete the container run,

```bash
$ docker rm container_name
container_name 

$ docker ps -a  # See the status of the container
CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS                      PORTS               NAMES
```

### List Images
To see the list of local images run,

```bash
$ docker images
```

### Remove an image
In order to delete an image, first stop and remove all it's corresponding containers and then run the command,
```bash
$ docker rmi image_name
image_name
```

### Download or pull an image from the web

When running `docker run image_name` it downloads an image if it is not present and runs a container. If we only want to download an image and not run it then,
```bash
$ docker pull image_name

Using default tag: latest
latest: Pulling from library/image_name
1b93qd01s525: Pull complete
Digest: sha256:4fea21ccs2e8dc73s2278a2sdc660d833570ec2682f4e4194f4ee23e415e1064
Status: Downloaded newer image for image_name:latest
docker.io/library/image_name:latest
```
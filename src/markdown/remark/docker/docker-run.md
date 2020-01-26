---
title: Docker run
date: '2019-12-07T22:40:32.169Z'
series: "Docker"
---


The docker run command creates a container from the specified container. We will looking into some useful docker run commands.

## Tag name
In the docker run command we can specify the version of the image that we want. If not version or tag is provided it always fetches the latest image available in the docker registry. If you need a specific version of an image you can always check [docker hub](https://hub.docker.com/) if it has it.

```bash
$ docker run redis # Fetches latest redis images form docker registry

# Using Tags
$ docker run image:tag
$ docker run redis:4.0 # Fetches version 4.0 of redis

```

## Stdin

If we are to run a python container using,
```bash
$ docker run python
```
It doesn't do anything beside creating a containers that is exited immediately. If we are to run the command `python` in the terminal it opens an interactive python shell where we can run python code. By default the docker container doesn't listen to standard input, so it will not prompt. To interact with the terminal we must map the standard input of the host machine with the container. This is done using the command,
```bash
$ docker run -i python # now we can interact with the console
```
The `-i` parameter is for interactive mode. By default a docker container runs in non interactive mode. However, we won't be able to see any prompt from the console. It is because the prompt is done by the terminal and it is not attached. It can be done using the `-t` parameter.
```bash
$ docker run -it python # now we can interact with the console and it prompts
Python 3.8.1 (default, Dec 28 2019, 05:31:15)
[GCC 8.3.0] on linux
Type "help", "copyright", "credits" or "license" for more information.
>>> a = 1

```

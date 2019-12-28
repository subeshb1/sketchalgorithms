---
title: Docker run
date: '2019-12-07T22:40:32.169Z'
series: "Docker"
---


The docker run command creates a container from the specified container. We will looking into some useful docker run commands.

## Tag name
In the docker run command we can specify the version of the image that we want. If not version or tag is provided it always fetches the latest image available in the docker registry. If you need a specific version of an image you can always check docker hub if it has it.

```bash
$ docker run redis # Fetches latest redis images form docker registry

# Using Tags
$ docker run image:tag
$ docker run redis:4.0 # Fetches version 4.0 of redis

```

### 
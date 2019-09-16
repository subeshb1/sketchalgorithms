---
title: Basic Postgres Commands
date: '2019-09-13T09:49:37.121Z'
tags: ['Basic Commands', 'Postgres', 'Database']
---

If you're already familiar with postgres and you have a hard time remembering basic postgres shell commands then this is a read for you. We will look at commands to create users, attach permissions, list databases and so on.

> The post assumes that you have already setup and installed postgres.

## Check if postgres installed

```shell
$ postgres --version
postgres (PostgreSQL) 9.6.15
```

If postgres is not found shell will throw a command not found error.

## Create a user

```sh
$ createuser [--options] <username>
```

Example:
```sh
createuser -s postgres
```
The above command will create a super user with name postgres. To find out all the list of commands check out [createuser docs](https://www.postgresql.org/docs/9.3/app-createuser.html)

##

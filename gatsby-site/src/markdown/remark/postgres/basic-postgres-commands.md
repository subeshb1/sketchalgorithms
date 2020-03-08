---
title: Basic Postgres Commands
date: '2019-09-13T09:49:37.121Z'
tags: ['Basic Commands', 'Postgres', 'Database']
---

If you're already familiar with postgres and you have a hard time remembering basic postgres shell commands then this is a read for you. We will look at commands to create users, attach permissions, list databases and so on.

> The post assumes that you have already setup and installed postgres.

## 1. Check if postgres is installed{#check-if-postgres-is-installed}

```shell
$ postgres --version
postgres (PostgreSQL) 9.6.15
```

If postgres is not found, shell will throw a command not found error.

## 2. Create a user{#create-a-user}

```bash
$ createuser [--connection-options] [--options] <username>
```

Example:

```bash
createuser -s postgres
```

The above command will create a super user with name postgres. To find out all the list of options check out [createuser docs](https://www.postgresql.org/docs/9.3/app-createuser.html)

## 3. Login to postgres console{#login-to-postgres-console}

```bash
psql [option...] [dbname [username]]
```

Example:

```bash
$ psql --u postgres
psql (9.6.15)
Type "help" for help.

postgres=>
```

The above command will log into postgres shell using user postgres. To find out all the list of options check out [psql docs](https://www.postgresql.org/docs/9.0/app-psql.html)

## 4. Listing database{#listing-database}

```bash
postgres=> \l
```

```bash
                                  List of databases
      Name |   Owner    | Encoding |   Collate   |    Ctype    |  Access privileges
----------------------+----------------+----------+-------------+-------------+----------
 my_table1 | root       | UTF8     | en_US.UTF-8 | en_US.UTF-8 |
 postgres  | root       | UTF8     | en_US.UTF-8 | en_US.UTF-8 |
 my_table2 | postgres   | UTF8     | en_US.UTF-8 | en_US.UTF-8 |
 my_table3 | postgres   | UTF8     | en_US.UTF-8 | en_US.UTF-8 |
```

## 5. Connecting to a database{#connecting-to-a-database}

```bash
postgres=> \c <dbname>
```

Example:

```bash
postgres=> \c user_database
You are now connected to database "user_database" as user "postgres".
user_database=>
```

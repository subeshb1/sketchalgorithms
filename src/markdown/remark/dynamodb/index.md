---
title: Getting Started with Amazon DynamoDB
date: '2020-01-29T22:40:32.169Z'
series: 'DynamoDB'
---

Amazon DynamoDB is a NoSQL, key-value and document database managed by AWS that is extremely scalable and removes all the worries about hardware provisioning, setup and configuration, replication, software patching, or cluster scaling.

The main reasons to use DynamoDB are:
- **Performance at scale**
- **No servers to manage**
- **Enterprise ready**

## Components of DynamoDB

In DynamoDb, data are stored in the form of **Items**, the collection of items form a **Table** and each item is a collection of **Attributes** that hold data in key value pair. Unlike relational databases where SQL statements are written to interact with the DB, Dynam DB is a web service where interactions occurs using HTTP requests and responses.

Let's take a real world example of an entity **Product**, where a product represents an object on sale. Now we will discuss this entity in terms of DynamoDB components.

### Table
A table is a collection of data or items. A table of Products will contain list of individual unique product.

## Items
An item is a group of attributes that is uniquely identifiable among all of the other items. Each table contains zero or more items. For a Products table, each item represents a product on sale. You can store any number of products in DynamoDB as it is scalable.


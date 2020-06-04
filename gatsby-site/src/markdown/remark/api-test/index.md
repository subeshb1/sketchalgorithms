---
title: Getting Started
date: '2020-06-03T15:46:37.121Z'
series: api-test
category:
type: doc
---

**api-test** is a bash program that makes testing

## Installation

### Dependency

**api-test** uses `curl` command to make API requests and `jq` for json command processing.

- Install `jq`
- Install `curl`

### Install api-test

```sh
curl -LJO https://raw.githubusercontent.com/subeshb1/api-test/master/api-test.sh
chmod +x api-test.sh
sudo mv api-test.sh /usr/local/bin/api-test
```

This will pull the bash script, make it executable and move it to `/usr/local/bin` to make it executable from anywhere.

Run the following command to see if the program is installed.

```sh
$ api-test --version

api-test version 0.3.0
```

## Calling your first api

Define a `test.json` file that holds information about the api you are trying to call.

```json
{
  "testCases": {
    "my_first_test_case": {
      "path": "/books",
      "query": {
        "id": 1
      },
      "method": "POST"
    }
  },
  "url": "my-api.com"
}
```

Call

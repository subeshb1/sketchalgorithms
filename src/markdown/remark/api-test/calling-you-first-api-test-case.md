---
title: Calling your first API
type: doc
date: '2020-06-03T15:46:37.121Z'
series: api-test
category: Getting Started
position: 101
---

Define a `test.json` file that holds information about the api you are trying to call. To learn more about test files see [Test case template](/api-test/test-cases-template).

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

## Run the test case

The command `run` is used to call an API test case. Provide the test file before the `run` command and then provide the test case you want to run.

```sh
api-test -f test.json run my_first_test_case
```

Response:

```sh
Response:
200 OK
BODY:
{
  "id": "1",
  "author": "Subesh Bhandari",
  "title": "The Road to React"
}
META:
{
  "ResponseTime": "0.032478s",
  "Size": "63 Bytes"
}
```

To view the list of available commands run:

```sh
api-test --help
```
For information on the commands, the detailed explanation can be found in [commands](/api-test/commands) section

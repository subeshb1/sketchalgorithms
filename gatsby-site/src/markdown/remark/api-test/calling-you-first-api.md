---
title: Calling your first API
type: doc
date: '2020-06-03T15:46:37.121Z'
series: api-test
category: Getting Started
position: 101
---

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

---
title: Calling your first API
series: api-test
type: doc
category: Getting Started
position: 2
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

---
title: Has key comparison
series: api-test
date: '2020-06-03T15:46:37.121Z'
type: doc
category: Automated Tests
position: 303
description: Use hasKey comparison in api-test to perform key level checks.
---

The `hasKey` will check if the provided keys in the array are present in the response or not. The accepted value is `array of string`.

## Syntax

```json{5}
{
  ...
  "expect": {
    "body": {
      "hasKey": []
    }
  }
}

```

## Example

The API has the following response.

```json
{
  "people": [
    {
      "name": "ram",
      "age": 20
    },
    {
      "name": "Shyam",
      "age": 21
    }
  ]
}
```

To test using `hasKey` check:

```json{5}
{
  ...
  "expect": {
    "body": {
      "hasKey": ["people", "people.0", "people.1", "people.0.name", "people.1.name"]
    }
  }
}
```

All the above keys are valid in the response. We can compare the key at any depth. While accessing arrays, be sure to use the index without brackets. The key accessing pattern contradicts the next two checking schemes where the bracket is used to access array properties.

## General use cases

- Testing dynamic fields where the value is not important but the property must be present.
- To count the number of items in an array. If the expected count is 100 the index `99` must be present for the array to pass the test.
- To check if required properties are present in response at any depth.

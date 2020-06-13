---
title: Path contains comparison
series: api-test
date: '2020-06-03T15:46:37.121Z'
type: doc
category: Automated Tests
position: 305
---

The `path_contains` does the same check as `contains` but allows the check to be made inside JSON object path at any depth. The path accessing pattern follows javascript object accessing patterns.

## Syntax

```json{5-8}
{
  ...
  "expect": {
     "body": {
      "path_contains": {
        "path": "value",
        "path.key1.key": "value"
      }
     }
  }
}

```

## Example

The api has following response.

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

To test using `path_contains` check:

```json{5-11}
{
  ...
  "expect": {
    "body": {
      "path_contains": {
        "people[0]": {
          "name": "ram",
        },
        "people[1].name": "Shyam",
        "people": []
      }
    }
  }
}
```

> **Note:** If a path is not found, the value is always `null`. If you have a response with `null` values consider adding the path key in `hasKey` check as well to see if the key is present or not. Combining with `hasKey` will ensure the field is present and is `null`.

## General use cases

- The same uses case as `contains` check but with the ability to compare at any depths.

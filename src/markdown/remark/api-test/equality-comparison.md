---
title: Equality comparison
series: api-test
date: '2020-06-03T15:46:37.121Z'
type: doc
category: Automated Tests
position: 301
description: Use equality comparison in api-test to perform strict equality level checks in your API response.
---

The `eq` check compares every element in an object irrespective of the order of object keys and array elements. Every element in the compared object should match the object element defined in the `eq` block. The accepted value is either an object or an array.

## Syntax

```json{5-7,9-11}
{
  ...
  "expect": {
    "body": {
      "eq": {
        "key": "value"
      },
    "header": {
      "eq": {
        "key": "value"
      }
    }
  }
}

```

## Example

The API has the following response.

```json
{
  "name": "ram",
  "age": 20
}
```

To test using `eq` check:

```json{5-8}
{
  ...
  "expect": {
    "body": {
      "eq": {
        "name": "ram",
        "age": 20
      }
    }
  }
}
```

The check will pass for the above response. If any of the value or key is different it will throw an error.

## General use cases

- Testing the contents of the response if it is static and predictable.
- Ideal case for error message checking.

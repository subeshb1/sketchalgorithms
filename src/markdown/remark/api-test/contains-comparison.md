---
title: Contains comparison
series: api-test
date: '2020-06-03T15:46:37.121Z'
type: doc
category: Automated Tests
position: 302
description: Use contains comparison in api-test to perform subset level checks in your API response.
---

The `contains` check compares the expected value with all the possible subset of the compared object irrespective of the order of object keys and array elements. It will pass if the value matches any subset. The accepted value is either an object or an array.

## Syntax

```json{5-7}
{
  ...
  "expect": {
    "body": {
      "contains": {
        "key": "value"
      }
    }
  }
}

```

## Example

The api has following response.

```json
{
  "name": "ram",
  "age": 20,
  "details": {
    "address": "Kathmandu"
  },
  "phone_numbers": ["98989","909"]
}
```

To test using `contains` check:

```json{5-9}
{
  ...
  "expect": {
    "body": {
      "contains": {
        "age": 20,
        "details": {},
        "phone_numbers": ["909"]
      }
    }
  }
}
```

The check will pass for the above response as `"age": 20` is the subset of response object, `"details": {}` is a subset of `"details"` property in the response, and `"phone_numbers": ["909"]` is also a subset of `"phone_numbers"` property.

## General use cases

- Testing the contents of the headers like response status, expected static header fields.
- Testing values of body where certain values are known and static.
- Checking if the response or response property is of type array or object.

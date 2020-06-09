---
title: External comparison
series: api-test
date: '2020-06-03T15:46:37.121Z'
type: doc
category: Automated Tests
position: 306
---

If none of the above checks work for you, there is a way to inject a script or program written in **any language** to compare and test an API response. To do so, provide the command name or script in the `external` key in the `expect` block. If a test case passes return an `exit code 0` and if a test fails `exit code > 0` to communicate with the `api-test` program.

> **Note:** The external object should be a root property of `expect` block i.e not inside `header` or `body`.

## Syntax

```js
{
  ...
  "expect": {
    "body": {...},
    "header": {...},
    "external": "<your program>"
  }
}
```

## Example

test.json

```js
{
  ...
  "expect": {
    "body": {...},
    "header": {...},
    "external": "node test.js"
  }
}

```

`test.js`

```js
let testCase = process.argv[2]; // First arg will be test case key
let body = process.argv[3]; // Second arg will be body
let header = process.argv[4]; // Third arg will be header

let success = true;
switch (testCase) {
  case "get_api":
    if (success) {
      process.exit(0); // For success case
    } else {
      process.exit(1); // For failure case
    }
    break;
  case "invalid_post_api":
    ...
    break;

  default:
    break;
}
```

The `test case key`, `body`, and `header` are passed respectively to the supplied program. You can use any language as long as you are sending out the correct exit code for failure and success.

The above example shows how to access an object path to compare and check the values at any depths. All the above comparisons are a subset of response and will pass the check.

## General use cases

- If none of the above 5 basic checking schemes work for you.
- If the checking comparison is complex like finding if the result is sorted or not.

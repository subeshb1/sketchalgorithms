---
title: Automated Test
description: Use api-test, a single script bash program to perform automated tests on JSON API with CI support.
series: api-test
date: '2020-06-03T15:46:37.121Z'
type: doc
category: Automated Tests
position: 300
---

You can write an automated integration test using the `api-test`. You write the tests in the same test case file under `expect` property. You can write tests for both `header` and `body`. See [Test cases properties](/api-test/test-file-definition#test-cases-attributes) to view all available properties.

## Checking Schemes

The checking schemes defines what kind of comparison is to be made on a response.

**Syntax:**

```json{4-21}
{
  "test_case_1": {
    "path": "/get_books",
    "expect": {
      "body": {
        "eq": {
          ...
        },
        "checking_scheme_2": {
          ...
        }
      },
      "header": {
        "checking_scheme_1": {
          ...
        },
        "checking_scheme_2": {
          ...
        }
      },
      "external": "your-program/script"
    }
    ...
  }
}
```

### Internal Checks

To make it simple and easy `api-test` provides 5 types of basic checking schemes:

- [`eq`](/api-test/equality-comparison) - Response should be the same as expected
- [`contains`](/api-test/contains-comparison) - The expected value should be a subset of the response.
- [`hasKey`](/api-test/has-key-comparison) - The key should be present in the JSON response
- [`path_eq`](/api-test/path-equality-comparison) - The value inside the nested object accessed by the JSON path must be the same.
- [`path_contains`](/api-test/path-contains-comparison) - The value inside the nested object accessed by the JSON path must be a subset.

### External Checks

If the above checks don't meet your needs you can always inject `script` or `programs` to check complex comparisons inside `external` property inside `expect` block.

> You can specify all the above comparisons for a single test case.

Example:

```json
{
  "test_case_1": {
    "path": "/get_books",
    "expect": {
      "body": {
        "eq": {
          "id": "1",
          "author": "Subesh Bhandari",
          "title": "The Road to React",
          "category": ["programming", "js"],
          "meta": {
            "present": false,
            "years": [2019, 2020]
          }
        },
        "contains": {
          "id": 1,
          "category": []
        },
        "hasKey": ["id", "author", "category", "category.0", "category.1"],
        "path_eq": {
          "category[0]": "programming",
          "meta.present": false
        },
        "path_contains": {
          "category[0]": "programming",
          "meta.years": []
        }
      },
      "external": "node test.js"
    }
  }
}
```

## CI integration

You can integrate the tests in CI workflow.

### Success State

When all tests are successful it exits with status code `0`
![API automated testing](../../../assets/api-test-spec.gif)

### Failure State

When all some test or all tests fail it exits with status code `1`
![Error exit code on failure](../../../assets/api-test-ci.png)

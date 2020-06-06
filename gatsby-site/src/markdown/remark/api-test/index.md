---
title: api-test
series: api-test
type: doc
category:
position: 0
---

Light weight automated JSON API testing framework.

## Organize your test cases in a JSON file

```json
{
  "testCases": {
    "my_first_test_case": {
      "path": "/books",
      "query": {
        "id": 1
      },
      "method": "GET"
    }
    ...
  },
  "url": "my-api.com"
}
```

## Call APIs

```sh
api-test run my_first_test_case # Run single test case
api-test run all                # Run all test cases simultaneously
```

![API Response](../../../assets/api-test-run.png)

## Add automated integration tests

Run the same tests in `development`, `staging` and `production` environment automatically.

In JSON file:

```json{10-21}
{
  "testCases": {
    "my_first_test_case": {
      "path": "/books",
      "query": {
        "id": 1
      },
      "method": "GET"
    },
    "expect": {
      "body": {
        "eq": {
          "id": "1",
          "author": "Robin Wieruch",
          "title": "The Road to React"
        },
        "contains": {
          "id": "1"
        },
        "hasKey": ["id", "author", "title"]
      }
    }
  },
  "url": "my-api.com"
}
```

Run automated test:

```sh
api-test test my_first_test_case
```

Result:

![API automated testing](../../../assets/api-test-spec.gif)

## Compatible with CI Workflow

Integrate automated tests in CI workflow.

![Error exit code on failure](../../../assets/api-test-ci.png)

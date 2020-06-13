---
title: Test cases definition
series: api-test
date: '2020-06-07T12:46:37.121Z'
type: doc
category: Getting Started
position: 103
---

Every API call scenario in the `api-test` is defined as a test case.
Test cases are defined in a `JSON` format and the file containing it can be named freely. By default, the program looks for `test.json`, `api-test.json`, and `template.json` in the respective order. If you name the test file with any of the above names you won't need to provide the file name to the program.
The JSON supports the following root attributes as:

```json
{
  "name": "My e-commerce API",
  "url": "api.subeshbhandari.com",
  "header": {
    ...
  },
  "testCases": {
    ...
  }
}
```

## Property: name

The `name` property is a string field that gives the description of what the test cases are for.

**Required:** `false`

## Property: url

The `url` property holds the base URL of an API in the `string` format. Example:

```sh
localhost:300
api.example.com/path
```

> **Note:** The API URL shouldn't end with a forward slash `/` to prevent any problem while appending the test case route.

**Required:** `true`

## Property: header

The root `header` object holds common header values that can be shared across all the test cases. This is a place to have headers like `Authorization`, `ContentType` etc.
**Required:** `false`

## Property: testCases

It is an `object` that holds the test scenarios' information. Each text scenario is identified by a unique key in the object. The following `JSON` objects show the allowed or used values for an API call:

```json
{
  "testCases": {
    "my_test_case_1": {
      "path": "/api/get_products",
      "method": "GET",
      "query": {
        ...
      },
      "body": {
        ...
      },
      "description": "My description",
      "header": {
        ...
      },
      "expect": {
        ...
      }
    }
  }
}
```

**Required:** `true`

### Test cases attributes

| FieldName     | Type   | Required | Default | Description                                                                                          |
| ------------- | ------ | -------- | ------- | ---------------------------------------------------------------------------------------------------- |
| `path`        | string | true     |         | The route to be tested. Always starts with `/` so that it can be appended after the base URL.        |
| `method`      | string | false    | GET     | HTTP method for the request. Defaults to the `GET` method.                                           |
| `header`      | object | false    |         | Header fields defined as JSON objects. Common headers are merged with test case headers.             |
| `body`        | object | false    |         | JSON body                                                                                            |
| `query`       | object | false    |         | Query params defined as JSON. Currently doesn't support array and object data types.                 |
| `expect`      | object | false    |         | Define automated testing scenarios. See [Automated Testing](/api-test/automated-tests) for more info |
| `description` | string | false    |         | Verbose description for the test case                                                                |

## Copy or pull a template.json file

To copy the latest JSON template run

```sh
curl -LJO https://raw.githubusercontent.com/subeshb1/api-test/master/template.json
```

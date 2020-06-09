---
title: Run Command
series: api-test
date: '2020-06-03T15:46:37.121Z'
type: doc
category: commands
position: 201
---

The `run` command is used to call API in a test case. You can run single or multiple API calls my passing them into the command. To view help for the command run `api-test -f file.json run --help`.

```sh
$ api-test -f file.json run --help

Run test cases specified in the test file.

USAGE: api-test [-v] -f file_name run [-hiIs] [ARGS]

OPTIONS:
  -h (--help)           print this message
  -i (--include)        include header
  -I (--header-only)    header only
  -s (--silent)         print response status and message only
  -S (--super-silent)   print response only

ARGS:
  all                   Run all test case.
  <test_case_name>      Run provided test case.

EXAMPLE:
'api-test -f test.json run test_case_1 test_case_2', 'api-test -f test.json run all'
```

## Options

By default HTTP status, body, and response time are returned for an API call.

```sh
$ api-test -f file.json run my_first_test_case
Running Case: my_first_test_case
Response:
200 OK
BODY:
{
  "id": "1",
  "author": "Subesh Bhandari",
  "title": "The Road to React"
}
META:
{
  "ResponseTime": "0.007662s",
  "Size": "63 Bytes"
}
```

### Include header

If you want to include the header as well pass in `-i` flag.

```sh
$ api-test -f file.json run -i my_first_test_case
Running Case: my_first_test_case
Response:
200 OK
HEADER:
{
  "content-length": "63",
  "content-type": "application/json; charset=utf-8",
  "http_version": "HTTP/1.1",
  "http_status": "200",
  "http_message": "OK",
  "http_response": "HTTP/1.1 200 OK"
}
BODY:
{
  "id": "1",
  "author": "Subesh Bhandari",
  "title": "The Road to React"
}
META:
{
  "ResponseTime": "0.005940s",
  "Size": "63 Bytes"
}
```

Four fields namely, `http_version`, `http_status`, `http_message` and `http_response` are injected to the header contents. These are the information on the first line of `HTTP header` which can then be used to perform automated tests.

### Header only

If you only want the header, pass in `-I` flag

```sh
$ api-test -f file.json run -I my_first_test_case
Running Case: my_first_test_case
Response:
200 OK
HEADER:
{
  "content-length": "63",
  "content-type": "application/json; charset=utf-8",
  "http_version": "HTTP/1.1",
  "http_status": "200",
  "http_message": "OK",
  "http_response": "HTTP/1.1 200 OK"
}
META:
{
  "ResponseTime": "0.005940s",
  "Size": "63 Bytes"
}
```

### Silent mode

If you don't want to see header or body and only require response status and metadata pass in `-s` flag.

```sh
$ api-test -f file.json run -s my_first_test_case
Running Case: my_first_test_case
Response:
200 OK
META:
{
  "ResponseTime": "0.005940s",
  "Size": "63 Bytes"
}
```

### Super Silent mode

If you only want the response then pass in `-S` flag.

```sh
$ api-test -f file.json run -S my_first_test_case
Running Case: my_first_test_case
Response:
200 OK
```

## Using the command

### Run single tests

Provide the test case you want to run.

```sh
api-test -f test.json run test_case_1
```

### Run multiple tests

You can provide multiple test cases as arguments.

```sh
api-test -f test.json run test_case_1 test_case_2 test_case_n
```

### Run all tests

To call all API test scenarios at once, pass `all` as the argument.

```sh
api-test -f test.json run all
```

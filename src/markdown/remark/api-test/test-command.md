---
title: Test Command
series: api-test
date: '2020-06-03T15:46:37.121Z'
type: doc
category: commands
position: 202
hideToc: false
description: Use test command to perform automated tests on your API. Integrate with CI to automate you workflow from development to production.
---

The `test` command is used to run automated integration tests on an API test case. To run an automated test, an `expect` object must be provided with the testing scenario in the test case file. See [Test cases properties](/api-test/test-file-definition#test-cases-attributes) to view available properties and see [Automated testing with api-test](/api-test/automated-tests) for writing integration tests.

```sh
$ api-test -f file.json test --help

Run automated tests for a test case.

USAGE: api-test [-v] -f file_name test [ARGS]

OPTIONS:
  -h (--help)           print this message

ARGS:
  all                   Run all automated tests.
  <test_case_name>      Run provided automated test.

EXAMPLE:
'api-test -f test.json test test_case_1 test_case_2', 'api-test -f test.json test all'

```

The `test` command will `exit with code 0` on successful test runs and `exit with code 1` on failure.

## Using the command

### Call single API

Provide the test case you want to test.

```sh
api-test -f test.json test test_case_1
```

### Call multiple APIs

You can provide multiple test cases as arguments.

```sh
api-test -f test.json test test_case_1 test_case_2 test_case_n
```

### Call all APIs

To run all tests at once, pass `all` as the argument.

```sh
api-test -f test.json test all
```

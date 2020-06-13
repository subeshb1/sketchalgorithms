---
title: Commands in api-test
series: api-test
date: '2020-06-03T15:46:37.121Z'
type: doc
category: Commands
description: View all the available commands in api-test. Use run command to call API, test command to run automated tests and describe command to view all the available test cases.
position: 200
---

To view the list of commands and options available run: `api-test --help`

```sh
$ api-test --help


A simple program to test JSON APIs.

USAGE: api-test [-hv] -f file_name [CMD] [ARGS]

OPTIONS:
  -h (--help)       print this message
  -v (--verbose)    verbose logging
  -f (--file)       file to test
  --version         print the version of the program

COMMANDS:
  run               Run test cases specified in the test file.
  test              Run automated test in the test file.
  describe          List test cases or describe the contents in a test case.

Run 'api-test COMMAND --help' for more information on a command.
```

The root command requires `-f <file-name>` option to run commands. If you name the file `test.json`, `api-test.json`, or `template.json` then the option is not required. You can additionally pass `-v` flag (verbose), to see extra information if the command provides it.

## Run Command

The run command is used to call API listed in a test case. See [Run Command](/api-test/run-command) section for more information.

Syntax:

```sh
api-test [-v] -f test-file.json [-hiIs] <test_case_name>
```

## Test Command

The test command is used to run automated integration tests on APIs as listed in the test case file. See [Test Command](/api-test/test-command) section for more information.

Syntax:

```sh
api-test -f test-file.json <test_case_name>
```

## Describe Command

The describe command is used to list all test cases or describe the contents of test cases without having to open the test case file itself. See [Describe Command](/api-test/describe-command) section for more information.

Syntax:

```sh
api-test -f test-file.json describe <test_case_name>
```

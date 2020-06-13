---
title: Describe Command
series: api-test
date: '2020-06-03T15:46:37.121Z'
type: doc
category: commands
position: 203
---

The `describe` command is used to list all test cases or describe the contents of test cases without having to open the test case file itself.

```sh
$ api-test -f file.json describe --help

List test cases or describe the contents in a test case.

USAGE: api-test [-v] -f file_name describe [ARGS]

OPTIONS:
  -h (--help)                 print this message

ARGS:
  <empty>                     List all test case.
  <test_case_name>            Describe a test case.
  <test_case_name>  <path>    Describe a test case property using json path.

EXAMPLE:
'api-test -f test.json describe', 'api-test -f test.json describe test_case_1', 'api-test -f test.json describe test_case_1 body'
```

## Using the command

### Listing all test cases

Run `api-test -f file.json describe`

```sh{1}
$ api-test -f test.json describe

S.N.  Test case
1     invalid_post_api
2     my_first_test_case
3     post_api
```

### Viewing test case contents

```sh{1}
$ api-test -f test.json describe my_first_test_case

{
  "path": "/books",
  "query": {
    "id": "1"
  }
}
```

### Viewing only required attributes

You can use the `JSON path` to access nested attributes.

```sh{1,4,9}
$ api-test -f test.json my_first_test_case path
/books

$ api-test -f test.json my_first_test_case query
{
  "id": "1"
}

$ api-test -f test.json my_first_test_case query.id
1
```

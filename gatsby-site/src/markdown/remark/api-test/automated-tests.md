---
title: Automated Test
series: api-test
date: '2020-06-03T15:46:37.121Z'
type: doc
category: Automated Tests
position: 200
---

Api-test is a bash program that automates JSON API testing using curl command to make API requests and jq for JSON processing.

## Dependency

If you have already installed the following dependency you can proceed to the next section.

- Install `jq`

```sh
# CentOS / Amazon linux 2 / Cloud 09
sudo yum install -y jq
# Ubuntu
sudo apt install  jq
# MaxOS
brew install jq
```

- Install `curl`

```sh
# CentOS / Amazon linux 2 / Cloud 09
sudo yum install -y curl
# Ubuntu
sudo apt install curl
# MaxOS
brew install curl
```

## Install api-test

```sh
curl -LJO https://raw.githubusercontent.com/subeshb1/api-test/master/api-test.sh
chmod +x api-test.sh
sudo mv api-test.sh /usr/local/bin/api-test
```

This will pull the bash script, make it executable and move it to `/usr/local/bin` to make it run from anywhere.

Run the following command to see if the program is installed.

```sh
$ api-test --version

api-test version 0.3.0
```

If you see the above message `api-test` has been successfully installed.

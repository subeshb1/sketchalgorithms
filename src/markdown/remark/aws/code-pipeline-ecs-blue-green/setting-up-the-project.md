---
title: Code Pipeline ECS Blue Green Part 1 - Project Setup
blogTitle: Setting up Ruby on Rails and AWS CDK
shortTitle: Project Setup
series: code-pipeline-ecs-blue-green
date: '2021-01-01T15:46:37.121Z'
description: You can integrate external scripts or programs in api-test to check for complex scenarios.
position: 100
---

We will be using Ruby on Rails to create the server and AWS CDK to write our IAC (Infrastructure as Code).

```project-directory
- \
  - rails-app
  - cdk
```

## Creating Ruby on Rails Project

### Rails Setup

```sh
$ docker run -it --volume $(pwd):/app ruby:3.0.0 bash -c "gem install rails && cd /app && rails new rails-app --api --skip-bundle"
```

The above command will pull `ruby:3.0.0` image, run a container, install rails inside the running container and bootstrap a rails api only server in the folder `rails-app/` inside the mounted volume which is the project directory.

For this series, the server will have only one endpoint i.e a status endpoint, which will indicate the server is up and running.

To create a status endpoint in rails, create a status method inside a controller, for now the application controller:

```rb
# rails-app/app/controllers/application_controller.rb

class ApplicationController < ActionController::API
  def status
    render json: { "message": "All good from the server side" }, status: :ok
  end
end

```

Then, point the method to the route `/status` in `routes.rb`:

```rb
# rails-app/config/routes.rb
Rails.application.routes.draw do
  get "status", to: "application#status"
end
```

### Dockerfile

Create a `Dockerfile` inside `rails-app/`

```Dockerfile
# /rails-app/Dockerfile
FROM ruby:3.0.0

WORKDIR /app

COPY Gemfile /app/Gemfile

COPY Gemfile.lock /app/Gemfile.lock

RUN bundle install

COPY . /app

CMD ["./start-server.sh"]

```

When the container is running, `./start-server.sh` bash script will be executed, which will be responsible to pull in configs in the upcoming blogs. For now, it only start the rails server in `port 3000` with the following contents:

```bash
#!bin/bash
# rails-app/start-server.sh
rails s -p 3000 -b 0.0.0.0
```

After the `start-server.sh` file is created make it executable by:

```sh
$ chmod +x ./start-server.sh
```

### Docker Compose

To make the development/testing flow easy let's also add a `docker-compose.yaml` file:

```yaml
# rails-app/docker-compose.yaml
version: '3.9'
services:
  rails-app:
    build: .
    tty: true
    stdin_open: true
    environment:
      - RACK_ENV=development
      - RAILS_ENV=development
    volumes:
      - .:/app
    ports:
      - '3000:3000'
```

To run the server:

```sh
$ docker-compose up rails-app

# Checking the endpoint
$ curl localhost:3000/status
{"message":"All good from the server side"}
```

### Tests

Also, let's add some unit tests to our status endpoint:

```rb
class ApplicationControllerTest < ActionDispatch::IntegrationTest
  test "should get status" do
    get '/status'
    expected_body = { "message": "All good from the server side" }.to_json
    assert_response :ok
    assert(body == expected_body, "The response body is different")
  end
end

```

This will check if the status endpoint is sending the correct response and message or not.

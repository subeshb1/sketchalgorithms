---
title: Git and Github Practical for beginners
date: '2020-08-24T23:46:37.121Z'
description: Take the step by step guide and practical to get started with Git and Github. Learn how to create a Git repository, push the change into Github, and finally host it in Github.
---

This blog will guide you through step by step process to create a git repository, push it to GitHub and host a simple HTML page.

## Who is this blog for?

- If you are getting started with git and GitHub and want to get your hands dirty with a real-world use case.
- If you are an instructor and want to use the guide to teach beginners.

## Pre-requesites

- Install Git: https://git-scm.com/download/win
- Create a Github account: https://github.com/join
- Basic knowledge of Git and Github (Optional)

## Open git bash program

To open git bash got to **Start Menu** and search Git bash  
**Windows 7:**  
![download](https://user-images.githubusercontent.com/27361350/89725748-696a1000-da32-11ea-9a58-a53917fd53c8.jpeg)

**Windows 10:**

![gitbash-start](https://user-images.githubusercontent.com/27361350/89725749-70911e00-da32-11ea-9968-350fb3a2d07d.png)

**You should see something like this:**
![Screenshot_18](https://user-images.githubusercontent.com/27361350/89725771-afbf6f00-da32-11ea-8f60-8425f7d69772.png)

**On Mac or Linux:**  
Open up the terminal.

## Configure GIT:

If you have already configured git skip to the next step.

On the console type:

```sh
git config --global user.name subesh
```

And then,

```sh
git config --global user.email su1b1esh@gmail.com
```

This will help track who made the current change.

## Creating a repository

### Step 1: Create a project directory

Before creating a repository we will need a directory to place our code. Go to the path where you want to create your project and type.

```sh
mkdir my-app
```

`mkdir` command creates a directory.

### Step 2: Change the directory to the project directory

```sh
cd my-app
```

This will change the current directory to `my-app` directory.

### Step 3: Initialize git

Be sure that you are in the right directory and then run:

```sh
git init
```

You should message like this:

```sh
Initialized empty Git repository in /Users/subeshbhandari/client-app/.git/
```

Good job! you have successfully created your first git repository. Now let's add some changes.

## Making some changes

### Step 1: Creating a file

To create a file we will use a command named `touch`:

```sh
touch index.html`
```

This will create an HTML file in the current directory. To check if it's created not use the command `ls`.

```sh
ls
```

You will see:

```sh
index.html
```

### Step 2: Add some text in HTML file

If you find it difficult to open the file using the console. type the following command.

```sh
start .
```

This will open the file explorer on windows. You can then right-click the file and open it with any code editor.

If you don't have any tool and can't open the explorer use the following command to open with notepad and paste the code.

```sh
notepad index.html
```

Open the HTML file using your favorite code editor and add some HTML code or paste the below if you want to copy:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      body {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background: #2f54c3;
        height: 100vh;
      }

      h1 {
        font-size: 4rem;
        font-family: arial;
        color: white;
      }

      a {
        color: white;
      }
    </style>
  </head>
  <body>
    <h1>Hi! I am Subesh</h1>
  </body>
</html>
```

Remember to change it to your name in the `<h1>` tag.

## Commit the file

Now that we have made changes, let's commit (version) the change.

### Step 1: Add the file to the staging area

Use the following command:

```sh
 git add index.html
```

This will add the file to the staging area.

### Step 2: Check the status

Now let's see if the file has been staged or not:

```sh
git status
```

You should see a message like this:

```sh
On branch master

No commits yet

Changes to be committed:
  (use "git rm --cached <file>..." to unstage)
  new file:   index.html
```

### Step 3: Commit the change

This is the step where we version our code:

```sh
git commit -m "My first commit"
```

Great! You have successfully created your first commit.

## Create a Github Repository and push code

We will create a Github Repository to push our local repository to a server.

### Step 1: Go to Github and select New Repository

<img width="1438" alt="Screen Shot 2020-08-09 at 10 17 48" src="https://user-images.githubusercontent.com/27361350/89726073-1befa200-da36-11ea-8f50-89fe7471a4d7.png">

### Step 2: Name your repository as my-app

<img width="856" alt="Screen Shot 2020-08-09 at 10 18 13" src="https://user-images.githubusercontent.com/27361350/89726078-290c9100-da36-11ea-8667-632e0ba64564.png">
Ignore everything below and click Create Repository.

You should see something like this:
<img width="1216" alt="Screen Shot 2020-08-09 at 10 18 28" src="https://user-images.githubusercontent.com/27361350/89726096-55c0a880-da36-11ea-8237-43421c45fe48.png">

### Step 3: Push your code to GitHub

Under the section **..or push an existing repository from the command line** copy the first line

```sh
git remote add origin git@github.com:<username>/my-app.git
```

Then push the code to GitHub

```sh
git push -u origin master
```

For the first time, you will see a prompt for Github login. Log in with credentials and the code will be pushed.
![Github Login Prompt](https://user-images.githubusercontent.com/27361350/91052775-ab55a180-e641-11ea-8418-01226a243b81.png)

Check your repository in GitHub to see if the code has been pushed.

## Hosting the site

Now that you have successfully pushed your code we will host it in Github.

### Step 1: Go to repository settings

<img width="1008" alt="Screen Shot 2020-08-09 at 10 19 32" src="https://user-images.githubusercontent.com/27361350/89726141-f2834600-da36-11ea-9dd4-76906f12f9b5.png">

### Step 2: Under GitHub pages section select source and select master

<img width="1031" alt="Screen Shot 2020-08-09 at 10 19 46" src="https://user-images.githubusercontent.com/27361350/89726146-03cc5280-da37-11ea-8f05-742e8aef7cd0.png">
<img width="407" alt="Screen Shot 2020-08-09 at 10 19 51" src="https://user-images.githubusercontent.com/27361350/89726148-08910680-da37-11ea-9cae-fb2883a52704.png">

### Step 3: Open the shown URL

<img width="786" alt="Screen Shot 2020-08-09 at 10 20 11" src="https://user-images.githubusercontent.com/27361350/89726150-0d55ba80-da37-11ea-940c-7934f338c1f5.png">

Congrats! You have successfully hosted your site on Github.

## What you've learned:

- How to create a git repository
- How to push code to Github
- How to host site using Github

---
title:  Rails Authorization with cancancan
date: '2019-10-23T22:40:32.169Z'
author: RajibSah
---
# Rails Authorization with cancancan

What if your friend could delete the photos that you have posted on Instagram, or even change your Instagram username and password? Well, that would be a problem. In this case, authorization comes to rescue us. Let’s start with why do we need authorization. Authorization is needed to prevent unauthorized access to the resources. All the users in a system might not need to view or change the resources in the system. For example, in a blogging website, a guest user has access to view the blog content, but cannot comment or edit the post. A blog writer may edit or delete the content they posted but may not edit or delete other user content.

Ruby provides a feature to add/include additional functionality in the form of gems. There are multiple gems for managing the authentication process in a rails app but we will be talking about cancancan.

## How do we work with cancancan?

**Step 1**: Add cancancan gem in your Gemfile and run* bundle install*

```
gem 'cancancan'
```

**Step 2**: The cancancan gem uses the Ability class to manage the permissions of the user. This class can be generated as
> rails generate cancan:ability

It will create a file *app/models/ability.rb*, let’s modify this as

```ruby
class Ability
 include CanCan::Ability

 def initialize(user)
   user ||= User.new # guest user (not logged in)
   case user.is?
   when 'author'
     can :manage, Post
   else
     can :read, Post
   end
 end
end
```

Cancancan gem needs a current_user method to exist in the controller, which can be set up by using another gem like Devise. The current_user is passed to the constructor of Ability class while authorizing and the attributes of current_user can be used to give or restrict access to the user.

The can method takes the ability of the user as the first argument and the object on which we are performing the action as the second argument. Let’s see some examples.

```ruby

can :manage, Post # able to perform any action on Post
can :read, Post # able to only read Post
can :update, :all  # able to perform update operation on any resource
```

**Step 3**: To authorize access to the resource, we can use the helper function in our controller, let’s add load_and_authorize_resource to our controller class.

```ruby
class PostsController < ApplicationController
load_and_authorize_resource

  def create
    @post = Post.create(post_params)
    # redirect to new page
    #
    #
  end
end
```
Now the user will be able to create a post only when he/she has the permission to create a post.

We can also make the link available to create a post only if the user has the permission to create a new post with the helper methods provided by the cancancan gem in our view file.

```erb
<% if can? :create, Post %>
  <%= link_to "New Post", new_post_path %>
<% end %>
```
Reference: [https://github.com/CanCanCommunity/cancancan](https://github.com/CanCanCommunity/cancancan)

---
title:  CSRF Attack
date: '2019-10-23T22:40:32.169Z'
author: RajivSah
---
# CSRF Attack
A CSRF attack works because browser requests automatically include any credentials associated with the site, such as the user's session cookie, IP address, etc. Therefore, if the user is authenticated to the site, the site cannot distinguish between the forged or legitimate requests sent by the victim.

## Attack
1. Create a form filled with data  which is submitted automatically when opened
2. Ask the victim to open the site with a form

## Protection
1. When the user logs in, create a token on the server and sent it to the client(the value is stored in the session and is used for each subsequent request until the session expires.)
2. The token will be sent to the server for each state-changing request(The CSRF token is added as a hidden field for forms in headers/parameters)
3. The server validates token for state-changing request
4. Inserting the CSRF token in the HTTP request header via JavaScript is considered more secure than adding the token in the hidden field form parameter.

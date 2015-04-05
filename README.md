README
======

Overview
========
This repository contains the code that powers jonathankolb.com. The site currently has
a blog powered by ghost and a node webapp. The site uses nginx as a load balancer
and revers proxy.

Technology
==========
The entire site is run in docker containers organized by docker-compose.
The blog is powered by ghost. The website itself is an nodejs express app.

Docker Compose Setup
====================
See docker-compose.yml for explicit definitions. The docker compose yml file defines
four containers:
 * node1 - an express web app container
 * node2 - an express web app contianer
 * blog1 - the blog container
 * nginx - the nginx container

NGINX Config
============
The site's nginx config defines two upstream nodes one for the blog(blog) and one for the
webapp(node-app). All requests coming to the root domain are sent at an even distribution to the node-app. Any requests sent to blog.jonathankolb.com are sent to the blog upstream node.

Blog Config
===========
The blog is just a docker image that I found on the docker registry. I have mounted
my own check out of ghost into the container so when the container is shutdown all of the
blog information persists.

Webapp Config
=============
This is a express node app the rest is pretty TBD...


# Set the base image to Ubuntu
FROM    ubuntu

# File Author / Maintainer
MAINTAINER Jonthan Kolb

# Update the repository
RUN apt-get update

# Install Node.js and other dependencies
RUN apt-get -y install curl
RUN curl -sL https://deb.nodesource.com/setup | sudo bash -
RUN apt-get -y install python build-essential nodejs

# Bundle app source
COPY . /src

WORKDIR /src

# Install app dependencies
RUN cd /src; npm install

# Expose port
EXPOSE  8080

# Run app using node
CMD ["node", "./app.js"]

# Dockerfile for creating a docker image for the leapbase project
FROM node
MAINTAINER leapon

# Add files to the image
RUN mkdir -p /opt/nodejs
ADD . /opt/nodejs
WORKDIR /opt/nodejs

# Install the dependencies modules
RUN npm install

# Expose environment variables
ENV LEAPBASE_HTTP_PORT=8080

# Expose the container port
EXPOSE 8080

ENTRYPOINT ["npm", "start"]


# Dockerfile for creating a docker image
FROM node
MAINTAINER leapon

# Add files to the image
RUN mkdir -p /opt/nodejs
ADD . /opt/nodejs
WORKDIR /opt/nodejs

# Install the dependencies modules
RUN npm install

# Expose environment variables
ENV VUEBLOCK_HTTP_PORT=8080

# Expose the container port
EXPOSE 8002

ENTRYPOINT ["npm", "start"]


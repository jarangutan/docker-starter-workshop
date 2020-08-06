# Grab latest node image from docker registry
FROM node:latest

# Create app directory and set it as default container directory
WORKDIR /app

# Install app dependencies
# A wildcard (*) is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

RUN npm install

# Bundle app source to /app directory
COPY . .

# Open up port 3000
EXPOSE 3000

# Start the container using the command below
# This will make our tiny_app start running inside the container
CMD [ "npm", "start" ]

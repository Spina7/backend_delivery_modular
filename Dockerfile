# Use the latest version of the official Node.js image as the base image
FROM node:latest

# Set the working directory inside the container to /usr/src/app
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json (if available) to the container's working directory
COPY package*.json ./

# Install the application's dependencies inside the container
RUN npm install

# Copy the rest of the application's files into the container
COPY . .

# Inform Docker that the container will listen on the specified port at runtime
EXPOSE 3000

# Command to run when the container starts
CMD [ "npm", "start" ]

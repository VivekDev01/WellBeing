# Use Node.js as the base image for both frontend and backend
FROM node:latest

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json for the root
COPY package*.json ./

# Install dependencies for the root
RUN npm install

# Copy the .env file
# COPY .env ./

# Copy the frontend and backend directories
COPY ./client ./client
COPY ./server ./server

# Install dependencies for the frontend and build
WORKDIR /app/client
RUN npm install
RUN npm run build

# Set the working directory to the root
WORKDIR /app

# Expose ports for both frontend and backend
EXPOSE 4000 
EXPOSE 3000 

# Command to start the both frontend and backend
CMD ["npm", "run", "start:both"]

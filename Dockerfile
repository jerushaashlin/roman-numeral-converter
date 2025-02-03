# Use an official Node.js runtime as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the entire project to the container
COPY . .

# Backend port
EXPOSE 8080

# Start the app
CMD ["npm", "run", "server"]

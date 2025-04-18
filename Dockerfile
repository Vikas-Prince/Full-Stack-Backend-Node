# Use Node.js 18 slim image
FROM node:18-slim

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install 

# Copy the rest of the application files
COPY . .

# Expose port 8080
EXPOSE 8080

# Run the app with "npm start"
CMD ["npm", "start"]

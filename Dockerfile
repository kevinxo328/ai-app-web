# Use an official Node.js image as the base
FROM node:18-alpine

# Set environment variables
ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}
RUN echo $VITE_API_URL

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project files to the working directory
COPY . .

# Build the project
# RUN npm run build

# Expose the port that the app will run on
EXPOSE 3000

# Start the app
CMD ["npm", "run", "dev"]

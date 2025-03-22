# Use official Node.js runtime as base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files and install only production dependencies
COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps

# Copy necessary files and folders
COPY .next .next
COPY public public
COPY next.config.mjs .  
COPY server.js .

# Set environment variable for production
ENV NODE_ENV=production

# Expose the port Next.js runs on
EXPOSE 3000

# Command to start the app
CMD ["npm", "run", "start"]

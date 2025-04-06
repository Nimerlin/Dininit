# Use official Node.js runtime as base image
FROM node:18-alpine

# Set working directory and install curl
WORKDIR /app
RUN apk add --no-cache curl

# Copy all necessary files and install dependencies in one go
COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps

# Copy build and runtime files
COPY .next .next
COPY public public
COPY next.config.mjs .

# Set environment variable
ENV NODE_ENV=production

# Expose app port
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start"]

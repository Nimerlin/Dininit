# Use a lightweight open-source base image
FROM alpine:latest

# Install necessary packages
RUN apk add --no-cache nodejs npm

# Set up a simple server with Node.js
WORKDIR /app
COPY package.json* .
COPY .next .

# Install Node.js dependencies (prom-client for Prometheus metrics)
RUN npm start

# Expose the port where the app will run
EXPOSE 4000

# Start the application
CMD ["node", "app.js"]

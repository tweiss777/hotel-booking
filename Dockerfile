# Use the official Node.js image as base
FROM node:latest

# Set working directory
WORKDIR /app


# Install dependencies for client
WORKDIR /app/client
COPY client/package.json client/yarn.lock ./
RUN yarn install

# Build client
COPY client ./
RUN yarn build

# Reset working directory
WORKDIR /app

# Install dependencies for server
WORKDIR /app/server
COPY server/package.json server/yarn.lock ./
RUN yarn install

# Build server
COPY server ./
RUN yarn build

# Reset working directory
WORKDIR /app

# Expose ports if necessary
# EXPOSE 3000

# Command to run the application
CMD ["node", "server/dist/main.js"]


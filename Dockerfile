# Use Node.js 20 on Ubuntu 22.04 (has GLIBC 2.35)
FROM node:20-bullseye-slim

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    curl \
    git \
    procps \
    && rm -rf /var/lib/apt/lists/*

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy project files
COPY . .

# Expose port 3000 (Next.js default)
EXPOSE 3000

# Set environment variables to prevent EPIPE errors
ENV NODE_OPTIONS="--max-old-space-size=4096"
ENV FORCE_COLOR=1
ENV DOCKER_CONTAINER=true
ENV NEXT_PUBLIC_API_DATA=https://jsonplaceholder.typicode.com/posts

# Default command with proper signal handling
CMD ["npm", "run", "dev"]


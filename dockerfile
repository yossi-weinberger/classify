# Base on official Node.js Alpine image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Set build-time arguments
ARG NEXT_PUBLIC_API_URL
ARG SERVER_URL

# Set environment variables
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV SERVER_URL=$SERVER_URL
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
ENV NEXT_PHASE=build

# Copy package.json and package-lock.json before other files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy all files
COPY . .

# Build app with the new config
RUN npm run build

# Expose the listening port
EXPOSE 3000

# Run npm start script when container starts
CMD ["npm", "start"]

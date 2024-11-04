# Base on official Node.js Alpine image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Set build-time arguments
ARG NEXT_PUBLIC_API_URL
ARG SERVER_URL=https://classify-backend.vercel.app

# Set environment variables
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV SERVER_URL=$SERVER_URL
ENV NEXT_TELEMETRY_DISABLED=1
ENV NEXT_RUNTIME="nodejs"

# Copy package.json and package-lock.json before other files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy all files
COPY . .

# Build app with production settings
RUN CI=true NODE_ENV=production npm run build

# Set runtime environment variables
ENV CI=false
ENV NODE_ENV=production

# Expose the listening port
EXPOSE 3000

# Run npm start script when container starts
CMD ["npm", "start"]
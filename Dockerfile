FROM node:20-alpine AS builder
WORKDIR /usr/src/app

# Add build dependencies including yaml support
RUN apk add --no-cache python3 make g++ yaml-dev

# Copy package files first for better caching
COPY package*.json ./
COPY tsconfig.json ./
COPY openapi.yaml ./  

# Install dependencies with verbose logging
RUN --mount=type=cache,target=/usr/src/app/.npm \
    npm set cache /usr/src/app/.npm && \
    npm ci --verbose

# Copy the rest of the application
COPY . .

# Run build with error logging
RUN npm run build || (echo "Build failed" && cat /usr/src/app/.npm/_logs/*-debug.log && exit 1)

FROM node:20-alpine AS production
WORKDIR /usr/src/app 

# Add yaml support to production image
RUN apk add --no-cache yaml-dev

COPY package*.json ./
RUN --mount=type=cache,target=/usr/src/app/.npm \
    npm set cache /usr/src/app/.npm && \
    npm ci --only=production

COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/tsconfig.json ./
COPY --from=builder /usr/src/app/openapi.yaml ./    

EXPOSE 3000
ENV NODE_ENV production
CMD ["node", "dist/app.js"]
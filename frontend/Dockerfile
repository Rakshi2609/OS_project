FROM node:18-alpine

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package files
COPY package.json pnpm-lock.yaml* ./

# Install dependencies
RUN pnpm install

# Copy application
COPY . .

# Expose port
EXPOSE 5173

# Run development server
CMD ["pnpm", "dev", "--host"]

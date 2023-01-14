FROM node:18-alpine AS node

FROM node AS builder

# Use /app as the CWD
WORKDIR /app            

# Copy package.json and package-lock.json to /app
COPY package*.json ./   
COPY yarn.lock ./   

# Install all dependencies
RUN npm i -g tsc  

RUN yarn install

# Copy the rest of the code
COPY . .                

# Invoke the build script to transpile code to js
RUN yarn build

# Final stage

FROM node AS final

# Prepare a destination directory for js files
RUN mkdir -p /app/dist                  

# Use /app as CWD
WORKDIR /app                            

# Copy package.json and package-lock.json
COPY package*.json ./                   
COPY yarn.lock ./   
COPY .env* ./

# Install only production dependencies
RUN yarn install --production

# Copy transpiled js from builder stage into the final image
COPY --from=builder /app/dist ./dist

# Open desired port
EXPOSE 8000

# Use js files to run the application
CMD ["yarn", "start"]
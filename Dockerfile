# Use an official Node.js runtime as a parent image
FROM node:20-alpine as build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY yarn.lock ./

# Install dependencies
RUN rm -rf node_modules
RUN rm -rf yarn.lock
RUN yarn cache clean
RUN yarn install --force

# Copy the rest of your application's code
COPY . .

# Build your application
RUN yarn run build

# Use nginx to serve the React application
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html

# Copy nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 to the outside
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
# client/Dockerfile
FROM nginx:alpine

# Copy built React app to nginx html folder
# COPY dist /usr/share/nginx/html

# Copy custom nginx config file
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
FROM node:10 as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY ./ .
RUN npm run build

#FROM nginx as production-stage
RUN mkdir /app
#COPY --from=build-stage /app/dist /app
#COPY nginx.conf /etc/nginx/nginx.conf

####################################
# Install Nginx For Run Admin Panel#
####################################
FROM nginx:alpine

####################################
#Remove Default Nginx HTML File #
####################################
RUN rm -rf /usr/share/nginx/html/*

####################################
# Copy dist in Nginx #
####################################
COPY --from=build-stage /app/dist /app
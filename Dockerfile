# pull official base image
FROM node:14.18.0-alpine as base
WORKDIR /app
# add the node_modules folder to $PATH
ENV PATH /app/node_modules/.bin:$PATH
# copy package.json file to /app directory for installation prep
COPY ./package.json /app/
# install dependencies
RUN yarn --silent 
# copy everything to /app directory
COPY . /app
# build the app
RUN yarn build
# STAGE 2 - build the final image using a nginx web server
# distribution and copy the react build files
FROM nginx:alpine
COPY --from=base /app/build /usr/share/nginx/html
# needed this to make React Router work properly
RUN rm /etc/nginx/conf.d/default.conf

COPY nginx.conf /etc/nginx/conf.d/default.conf
# Expose port 80 for HTTP Traffic
EXPOSE 80
# start the nginx web server
CMD ["nginx", "-g", "daemon off;"]

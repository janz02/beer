# Stage 1 - the build process
FROM node:13.2 as build-deps
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install --silent
COPY . ./
RUN echo "This is a production optimailed, and production configured environment. It has a dependency on couponapi docker file, and will call it as a backend."
RUN echo "Without couponapi in the cluster or compose, it will not work."
RUN npm run build



# Stage 2 - the production environment
FROM nginx:1.17-alpine
COPY config/nginx.config /etc/nginx/conf.d/default.conf
COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
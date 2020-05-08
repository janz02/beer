# Stage 1 - the build process
FROM node:13.2 as build-deps
ARG BUILD_VERSION
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm version $BUILD_VERSION --no-git-tag-version
RUN npm install --silent
COPY . ./
ENV REACT_APP_VERSION=$BUILD_VERSION
RUN npm run build

# Stage 2 - the production environment
FROM nginx:1.17-alpine
COPY config/nginx.config /etc/nginx/conf.d/default.conf
COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

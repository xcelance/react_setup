FROM node:13.14.0 as builder
ARG REACT_APP_BACKEND=${REACT_APP_BACKEND}
ARG REACT_APP_WEBSOCKET_URL=${REACT_APP_WEBSOCKET_URL}
ARG REACT_APP_MSAL_URL=${REACT_APP_MSAL_URL}
COPY . /app

RUN rm -rf /app/build

WORKDIR /app
RUN npm install --build-from-source
RUN npm run build

FROM nginx:alpine

WORKDIR /usr/share/nginx/html/

COPY --from=builder /app/build .
#COPY docker/nginx/frontend.conf /etc/nginx/conf.d/default.conf

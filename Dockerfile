FROM jrottenberg/ffmpeg:4.1-alpine
WORKDIR /app
RUN apk add --update nodejs npm
COPY ./package.json /app
COPY ./package-lock.json /app
RUN npm ci
CMD node ./index.js
EXPOSE 3000
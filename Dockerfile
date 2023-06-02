FROM node:18-alpine
WORKDIR /app
RUN apk add --update --no-cache python3 make g++ ffmpeg && rm -rf /var/cache/apk/*
COPY ./src /app/src
COPY ./package.json /app
COPY ./package-lock.json /app
RUN npm ci
CMD npm run start:ci
EXPOSE 3000

FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install

COPY tsconfig.json ./
COPY ts ./ts

RUN npx tsc

COPY index.html ./
COPY css ./css

RUN cp dist/*.js .

RUN npm install -g http-server

EXPOSE 8080
CMD ["http-server", "."]

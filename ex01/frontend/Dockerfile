FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install

COPY tsconfig.json ./
COPY tailwind.config.js postcss.config.js ./
COPY ts ./ts
COPY css ./css
COPY index.html ./

RUN npx tailwindcss -i ./css/style.css -o ./dist/style.css
RUN npx tsc

RUN npm install -g http-server

EXPOSE 8080
CMD ["http-server", "."]

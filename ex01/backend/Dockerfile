FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY tsconfig.json ./
COPY ts ./ts
RUN npm run build
EXPOSE 3000
CMD ["node", "dist/server.js"]
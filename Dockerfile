FROM node:16.3.0-alpine
WORKDIR '/app'
COPY package.json .
RUN npm install --save --legacy-peer-deps 
COPY . .
CMD ["npm","start"]

FROM node:20.15.1-slim
RUN mkdir -p /opt/app
WORKDIR /opt/app
COPY package.json package-lock.json ./
RUN npm install --force
COPY . .
EXPOSE 8082
CMD ["npm", "start"]

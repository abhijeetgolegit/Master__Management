 # syntax=docker/dockerfile:1
FROM node:18-alpine
RUN npm install
CMD ["node", "app.js"]
EXPOSE 8004

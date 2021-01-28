FROM node:14
WORKDIR usr/src/app
COPY ./backend/package*.json ./
RUN npm install
COPY ./backend .
EXPOSE 9090
CMD [ "node", "index.js" ]
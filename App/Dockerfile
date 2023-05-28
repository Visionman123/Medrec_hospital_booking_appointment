FROM node:alpine

WORKDIR /app

COPY /server/package*.json ./

RUN npm install 

COPY . .

ENV USERDB postgres
ENV PASSWORDDB Nhn@300102 
ENV DATABASE postgres
ENV SECRET_KEY nam
ENV PASSWORD_KEY balls
ENV INFO_KEY notballs
ENV HOST localhost
ENV PORT 8000

EXPOSE 8000

CMD ["npm", "start"]

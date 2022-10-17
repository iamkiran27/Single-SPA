FROM node:16

WORKDIR /app

RUN npm install

COPY ["package.json", "package-lock.json*", "./"]

EXPOSE 9004

CMD ["npm","run", "start:standalone"]
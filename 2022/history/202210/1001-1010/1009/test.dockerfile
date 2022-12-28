#コンテナ作成
#mysql
FROM mysql:5.7
ENV MYSQL_ROOT_PASSWORD root
ENV MYSQL_DATABASE test
ENV MYSQL_USER test
ENV MYSQL_PASSWORD test
#nodejs
FROM node:10.15.3
RUN mkdir /app
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
EXPOSE 3000
CMD ["npm", "start"]
#docker
FROM node:latest

# Set the working directory in the container
WORKDIR /usr/src/app

COPY . /usr/src/app


RUN apt update

RUN npm install

CMD ["npm", "run", "start:dev"]
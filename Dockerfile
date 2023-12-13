FROM node:18-alpine AS production

WORKDIR /app

COPY ./ /app/

RUN npm install --omit=dev \
    npm run build

# Change the port according to the need of the project
EXPOSE 8010

CMD [ "npm", "run", "prod" ]

FROM node:18-alpine AS development

WORKDIR /app

COPY ./ /app/

RUN npm install \
    npm run build

# Change the port according to the need of the project
EXPOSE 8010

CMD [ "npm", "run", "dev" ]
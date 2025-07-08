# Estágio de desenvolvimento
FROM node:22-alpine AS development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

#RUN npm install -g ts-node-dev
#RUN npm install -g nodemon 

# Expõe a porta padrão do React
EXPOSE 5173

# Comando para rodar em modo desenvolvimento
CMD ["npm", "run", "dev"]

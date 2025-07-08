# Estágio de desenvolvimento
FROM node:22-alpine AS development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . ./

# Instala o ts-node-dev para hot-reload
RUN npm install -g ts-node-dev nodemon

ENV CLOUDFLARE_ACCOUNT_ID="91ce49d61822d7880ffd800a9089c1b1"
ENV CLOUDFLARE_ACCESS_KEY_ID="f3d1c501aa5d56bfaf5df47de1889f21"
ENV CLOUDFLARE_SECRET_ACCESS_KEY="4d8c5aced739027f6abf9f27304bb9ac8611c72496c73fa55e412040760c23cc"
ENV CLOUDFLARE_PUBLIC_URL="https://pub-93d0357cecf342fcba91323c5e2490b6.r2.dev"

#ENV CLOUDFLARE_ACCOUNT_ID="91ce49d61822d7880ffd800a9089c1b1"
#ENV CLOUDFLARE_ACCESS_KEY_ID="55f79f01d6fa8ffc264ef77fcd322b95"
#ENV CLOUDFLARE_SECRET_ACCESS_KEY="c2f8791d3da87725930d56078e0534558582fa0bc48f82a7a48cfc0e71cf7b71"
ENV CLOUDFLARE_BUCKET="upload-server2"
#ENV CLOUDFLARE_PUBLIC_URL="https://pub-cbdaaf82413c40679980f39edbf35598.r2.dev"

# Expõe a porta do servidor Fastify
EXPOSE 3333

# Comando para rodar em modo watch
#CMD ["ts-node-dev", "--respawn", "--transpile-only", "src/server.ts"]
CMD ["npm", "run", "start:dev"]

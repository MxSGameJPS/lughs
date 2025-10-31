# Etapa 1: build da aplicação
FROM node:22 AS build
WORKDIR /app

# Copia os arquivos de dependências
COPY package.json yarn.lock ./

# Instala as dependências com Yarn
RUN yarn install --frozen-lockfile

# Copia o restante do projeto
COPY . .

# Compila o projeto React
RUN yarn build

# Etapa 2: servir com Nginx
FROM nginx:1.29-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
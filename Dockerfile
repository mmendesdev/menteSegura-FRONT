FROM node:18-alpine

WORKDIR /app

# Instalar pnpm
RUN npm install -g pnpm

# Copiar package.json e pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Instalar dependências
RUN pnpm install

# Copiar código da aplicação
COPY . .

# Expor porta
EXPOSE 3000

# Comando para iniciar a aplicação em modo desenvolvimento
CMD ["pnpm", "run", "dev", "--host"]

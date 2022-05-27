# Desafio Enquetes
Este repositorio contém um desafio de programação que consiste em criar um sistema de votação para uma enquete.

## Pré-requisitos
- [**Node.js**](https://nodejs.org/en/)
- [**mysql**](https://www.mysql.com/downloads/)

## Instruções para execução
- Clone o repositório do desafio digitando no terminal:
```console
git clone https://github.com/gabrielSoares522/desafio-enquetes.git
```

- Entre na pasta do desafio:
```console
cd desafio-enquetes
```

- Instale as dependências do desafio:
```console
npm install
```

- Execute o arquivo db_query.sql para criar o banco de dados da aplicação.

- Configure a sua conexão com o banco de dados no arquivo ./config/databaseConfig.js para permitir que a sua aplicação acesse o banco de dados:
```js
const databaseConfig = {
    host: "localhost",
    user: "root",
    password: "1234",
    database: "enqueteDB",
    port: 3306
};
```

- Execute o comando abaixo para iniciar o servidor:
```console
npm run start
```

- Acesse o endereço http://localhost:3500/ para verificar se o servidor está funcionando.
<h1>:department_store: STORE MANAGER</h1>

<div>
  <h3>Sobre o projeto</h3>
  <p>Minha primeira API utilizando a arquitetura MSC (model-service-controller).</p>
  <p>É um sistema de gerenciamento de vendas no formato dropshipping em que será possível criar, visualizar, deletar e atualizar produtos e vendas. Foi utilizado o banco de dados MySQL para a gestão de dados. Além disso, a API é baseada no conceito de RESTful.</p>
  <p>Foi feito <em><strong>testes unitários</strong></em> para cobrir os models, services e controllers de cada um dos métodos HTTP, assim proporcionando mas segurança na entrega das respostas.</p>
</div>
<div>
   <h3>Ferramentas utilizadas</h3>
  <ul>
    <li><a href="https://nodejs.org/en/">Node.js<a/></li>
    <li><a href="https://expressjs.com/">Express<a/></li>
    <li><a href="https://www.mysql.com/">MySQL<a/></li>
    <li><a href="https://mochajs.org/">Mocha<a/></li>
    <li><a href="https://www.chaijs.com/">Chai<a/></li>
    <li><a href="https://sinonjs.org/">Sinon<a/></li>
    <li><a href="https://joi.dev/">Joi<a/></li>
    <li><a href="https://developer.mozilla.org/pt-BR/docs/Glossary/CRUD">CRUD</a></li>
    <li><a href="https://www.toptal.com/express-js/nodejs-typescript-rest-api-pt-1">MSC</a></li>
    <li><a href="https://developer.mozilla.org/pt-BR/docs/Glossary/REST">REST</a></li>
  </ul>
</div>

<div>
  <h3>Orientações</h3>
  <details>
  <summary>:octocat: <strong>Clonando o repositório e instalando os node modules</strong></summary>

  1. Clone o repositório

  - `git clone git@github.com:danillogoncalves/26-store-manager.git`;

  - Entre na pasta que foi criada no processo de clonagem:
    - `cd 26-store-manager`;

  2. Faça a instalação das dependências

  - `npm install` ou `npm i`;
  </details>
  <details>
  <summary>:game_die: <strong>Configurando o conexão com o banco de dados</strong></summary>

  1. Criando arquivo para a configuração
  
  - Crie um arquivo .env na na raiz do projeto:
    - `touch .env`;
    
  - Coloque as seguintes informações nesse arquivo:    
    ```
    MYSQL_HOST=localhost
    MYSQL_USER=nomeDoUsuarioDoMySQL
    MYSQL_PASSWORD=suaSenha
    MYSQL_DATABASE=StoreManager
    PORT=3000
    ```
  - Não foi colocado a porta, pois o express coloca como padrão a porta 3306, mas caso você use outra porta insira essa linha no arquivo .env:    
    ```
    MYSQL_HOST=localhost
    MYSQL_USER=nomeDoUsuarioDoMySQL
    MYSQL_PASSWORD=suaSenha
    MYSQL_DATABASE=StoreManager
    MYSQL_PORT=numeroDaSuaPorta
    PORT=3000
    ```     
   
  2. Variáveis Ambiente
  - Caso queria conhecer mais sobre variáveis ambiente, segue link sobre:
    - https://blog.rocketseat.com.br/variaveis-ambiente-nodejs/
  </details>
  
  <details>
  <summary>:running: <strong>Rodando API localmente</strong></summary>
  
  - Rode o seguinte comando no terminal estando na raiz do projeto:
  
    - `npm start`;
    
  - Caso você queira foi configurado no package.json um scripts para rodar a aplicação de formas alternativas;
  </details>
  
  <details>
  <summary>:whale: <strong>Rodando via Docker</strong></summary>
  <p>Caso você queria e tenha o conhecimento de como usar, existe um arquivo <em><strong>docker-compose</strong></em> na raiz do projeto, seque os comandos criar e acessar os containers:</p>
  
  - Na raiz do projeto rode o seguinte comando:
  
    - `docker-compose up -d`;
    
  - Para acessar o terminal do container, roda o seguinte comando:
  
    - `docker container exec -it store_manager bash`;
  
  - Para fechar o terminal do container execute o comando:
  
    - `exit`;
    
  - Se não for mais usar os containers, rode o seguinte comando:
  
    - `docker-compose down`;
  </details>
  
  <details>
    <summary>:eyes: <strong>Teste a aplicação com API Client</strong></summary>
    <p>:construction: Em construção :construction:</p>
  </details>
</div>

#

Todos os projetos da [Trybe](https://www.betrybe.com/) utilizam `linters`, `Git` e `GitHub`.<br/>

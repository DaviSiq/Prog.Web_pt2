# Estrutura de Pastas

A estrutura do nosso projeto é organizada de forma a garantir clareza e facilidade de manutenção. Aqui está uma visão geral das pastas e arquivos principais:

1. **public**: Esta pasta contém todos os arquivos relativos ao front-end, como o HTML, CSS e JavaScript. O objetivo dessa pasta é gerenciar os arquivos estáticos que serão carregados pelo navegador do usuário. Dentro dessa pasta, definimos também as rotas para o front-end, que são responsáveis por fornecer os arquivos ao usuário de maneira eficiente.

2. **src**: Aqui está o código de backend, que cuida da lógica de negócios e do processamento de dados. Dentro desta pasta, lidamos com a comunicação entre o front-end e o servidor, além de realizar a busca de dados de forma eficiente.

3. **server.js**: Este é o arquivo principal da aplicação, que inicializa e configura o servidor. Ele é responsável por definir as rotas e fazer a ligação entre o front-end e o back-end. A partir dele, as requisições do front-end são processadas e direcionadas aos controllers adequados, que por sua vez interagem com os serviços que tratam as APIs e a lógica do sistema.

---

# Explicação Geral dos Arquivos em `src`

Nosso projeto segue a arquitetura MVC (Model-View-Controller), o que permite separar as responsabilidades de forma eficiente e modular. Isso facilita a manutenção e a escalabilidade do sistema. A explicação a seguir detalha o papel de cada arquivo dentro dessa arquitetura:

1. **controller.js**: Este arquivo tem a função de gerenciar as interações entre o front-end e os serviços de backend. Quando o front-end envia uma requisição, o controller recebe os dados, realiza qualquer lógica necessária e os envia para os serviços para processamentos mais avançados. Depois, ele recebe a resposta dos serviços e retorna essa informação para o front-end, permitindo que o usuário visualize os dados processados.

2. **services.js**: A função principal desse arquivo é atuar como intermediário entre o controller e a API externa. Quando o controller solicita dados, o services.js realiza a requisição à API e processa os dados recebidos, que normalmente vêm no formato JSON. O serviço também pode incluir verificações e tratamentos necessários antes de retornar os dados para o controller.

3. **omdb.api.js**: Este arquivo contém a lógica que interage diretamente com a API externa (neste caso, a OMDb API). Aqui, configuramos as requisições HTTP, fazemos o tratamento de erros, e processamos a resposta da API, retornando os dados de filmes ou séries de maneira estruturada para os outros arquivos do backend.

4. **routes.js**: Aqui definimos as rotas do nosso sistema, ou seja, como as requisições do front-end serão direcionadas. Esse arquivo facilita a organização do sistema, pois centraliza todas as rotas do servidor, tornando o código mais modular e mais fácil de atualizar.

5. **script.js**: Este arquivo contém a lógica do front-end. Ele cuida de capturar as interações do usuário, como cliques e entradas de texto, e envia essas informações para o controller por meio das rotas definidas no backend. Também é responsável por exibir os dados retornados pelo servidor na interface do usuário, seja exibindo informações de filmes, séries, ou tratando erros e exibições alternativas.

---

# API Utilizada

A **OMDb API** (Open Movie Database API) foi escolhida como fonte de dados para o projeto. Essa API é especializada em fornecer informações sobre filmes e séries de TV, incluindo detalhes como título, sinopse, ano de lançamento, elenco, avaliação, cartazes e muito mais. Uma das vantagens dessa API é que ela oferece dados de forma estruturada, seja no formato JSON ou XML, o que facilita a integração com nossos sistemas.

Ao utilizar essa API, conseguimos fornecer uma interface de busca dinâmica e eficiente, permitindo que o usuário encontre informações detalhadas sobre seus filmes e séries favoritos diretamente na nossa aplicação.

A OMDb API foi configurada para ser chamada a partir do arquivo **services.js**, que gerencia as requisições e o tratamento das respostas. Para garantir a segurança e o bom funcionamento da integração, utilizamos uma chave de API fornecida pela plataforma da OMDb, garantindo que as requisições sejam autenticadas e monitoradas.

**Funcionalidades principais da OMDb API:**
- Busca de filmes e séries por nome, ano e outras informações.
- Recuperação de detalhes de filmes, como resumos, elenco, avaliações, etc.
- Obtenção de imagens de posteres e outros recursos visuais dos filmes e séries.
  
Esses dados são extraídos e exibidos na interface de forma dinâmica, proporcionando uma experiência de usuário rica e interativa.

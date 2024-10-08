# 🚀 **Projeto: CampaignHub**

## 📄 **Descrição**

Este projeto, chamado **CampaignHub**, foi desenvolvido para otimizar o gerenciamento de campanhas, utilizando diversas tecnologias modernas para garantir uma aplicação **robusta**, **performática** e de **fácil manutenção**.

## 🛠 **Ferramentas e Tecnologias Utilizadas**

### 1. ☁️ **AWS**
O deploy da aplicação foi feito utilizando o **AWS Amplify**, que facilita a implementação contínua e integrações com serviços AWS, além de automatizar o processo de CI/CD (Integração e Entrega Contínuas), garantindo uma pipeline de deploy confiável e eficiente.

🔗 A aplicação está disponível neste link: [Acessar aplicação](https://main.d3iydjd80flhci.amplifyapp.com/).

### 2. ⚙️ **Axios Mock Adapter para Simulação de Requisições à API**
Utilizei o **Axios Mock Adapter** para simular requisições à API durante o desenvolvimento, permitindo o uso de dados mockados. Essa abordagem facilita o desenvolvimento e teste de funcionalidades sem depender de um backend real, fornecendo respostas pré-definidas para as requisições e simulando diferentes cenários de resposta da API, como sucessos ou erros.

### 3. 🎨 **Sass para Estilização**
A estilização do projeto foi feita com **Sass**, que facilita a modularização e manutenção dos estilos. Alguns dos benefícios incluem:

- **Mixins**: Reutilizo blocos de código CSS através de mixins, o que proporciona consistência e evita repetição de código.
- **Variáveis**: Garantem uma uniformidade visual em toda a aplicação, especialmente para cores e espaçamentos.

### 4. 🗂 **Redux para Gerenciamento de Estado**
Implementei **Redux** para gerenciar o estado global da aplicação de maneira eficiente. Utilizei **Redux Thunk** para lidar com ações assíncronas, permitindo uma maior flexibilidade e abstração na lógica de interação com a API.

### 5. ⏳ **Hook Personalizado de Debounce**
Criei um **hook personalizado de debounce** para otimizar as requisições à API, evitando chamadas excessivas enquanto o usuário digita. Isso melhora a performance e a experiência do usuário ao reduzir a carga de requisições desnecessárias.

### 6. 💬 **Conventional Commits**
Adotei o padrão de **Conventional Commits** para manter o histórico de commits claro e semântico. Isso facilita a rastreabilidade de mudanças e auxilia na geração automatizada de changelogs.

### 7. 🛡️ **Error Boundary**
Implementei uma classe **ErrorBoundary** para capturar erros que não são tratados por blocos `try/catch`, garantindo que a aplicação continue funcionando mesmo em cenários de erro inesperado.

### 8. 📊 **Paginação Customizada para Melhorar a Performance**
Implementei um sistema de **paginação customizada** para melhorar a performance nas requisições e na renderização de grandes volumes de dados. A paginação divide as requisições em blocos menores, permitindo que a API envie apenas as informações necessárias para cada página. Dessa forma, reduzo o tempo de carregamento e evito sobrecarregar a interface com dados desnecessários, otimizando a experiência do usuário.

### 9. ✅ **Yup com React Hook Form para Validação de Formulários**
Para garantir uma validação eficaz e simples dos formulários, utilizei o **Yup** em conjunto com o **React Hook Form**. Essa combinação permite:

- **Validação declarativa**: O Yup facilita a criação de esquemas de validação declarativos, o que torna o código mais legível e fácil de manter.
- **Melhoria na experiência do usuário**: O React Hook Form otimiza a performance de formulários ao evitar renderizações desnecessárias, garantindo uma experiência suave.
- **Feedback imediato ao usuário**: Com a integração do Yup, é possível fornecer mensagens de erro em tempo real, à medida que o usuário preenche os campos do formulário.

### 10. 🧪 **Testes Unitários com Jest**
Implementei testes unitários utilizando **Jest** para garantir a qualidade do código e prevenir regressões. O uso do Jest proporciona uma maneira rápida e confiável de testar a lógica de negócios e componentes da aplicação. Essa abordagem ajuda a identificar possíveis falhas antes que cheguem ao ambiente de produção.

- **Cobertura de Testes**: Com o Jest, conseguimos monitorar a cobertura dos testes e garantir que as principais funcionalidades da aplicação estejam devidamente testadas.
- **Execução dos Testes**: Os testes podem ser executados rapidamente, e o Jest gera relatórios detalhados para identificar possíveis falhas.

### 11. 🔒 **Middleware para Autenticação de Rotas com Cookies**

Implementei um **middleware** para autenticação de rotas, utilizando **cookies** como método de autenticação, garantindo que apenas usuários autenticados possam acessar áreas restritas da aplicação. O middleware verifica a presença de um `accessToken` nos cookies de cada requisição e redireciona os usuários não autenticados para a página de login.

- **Proteção de Rotas**: Todas as rotas que requerem autenticação são protegidas pelo middleware, garantindo que usuários sem o token de acesso sejam redirecionados para a tela de login.
- **Verificação de Token**: O middleware verifica a presença e validade do token de autenticação nos cookies do navegador, evitando o uso de tokens inválidos ou expirados.
- **Redirecionamento Automático**: Se o token estiver ausente ou inválido, o usuário é automaticamente redirecionado para a página de login, garantindo uma experiência segura e protegida.


## Credenciais
- **Email**: awsales@admin.com
- **Password**: admin

## ⚙️ Instalação e Configuração

```bash
# Clone o repositório:
git clone git@github.com:Sandross/CampaignHub.git

# Instale as dependências:
npm install

# Execute a aplicação:
npm run dev

# Teste a aplicação:
npm run test

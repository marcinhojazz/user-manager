# Hexagon - Teste de Habilidade

Este repositório apresenta a implementação do teste de habilidade solicitado pela Hexagon, que consiste em uma aplicação fullstack para gestão de pessoas.

## 🚀 Tecnologias Utilizadas

### Frontend (Vue 3 + Vite + TypeScript + TailwindCSS)

- Vue 3 (Composition API)
- Pinia (gerenciamento de estado)
- TailwindCSS (estilização e responsividade)
- Axios (requisições HTTP)
- Vite (empacotador moderno)
- BrasilAPI (consumo de estados e cidades)

### Backend (ASP.NET Core)

- ASP.NET Core 8.0
- Entity Framework Core
- SQLite (persistência local de dados)

## ⚙️ Funcionalidades Implementadas

-

## 📝 Estrutura de Pastas

```bash
/backend
  ├── Controllers
  ├── Models
  ├── Data
  └── Program.cs, appsettings.json

/frontend
  ├── src/
  │   ├── components (PessoaForm, PessoaTable, Modal)
  │   ├── store (Pinia)
  │   ├── api (configuração do Axios)
  │   ├── types (tipagem TS)
  └── main.ts, vite.config.ts
```

## ⚡ Decisões de Implementação

- Utilização de **Pinia** para separar estados de `pessoas` e `localidades`, com cache de estados e cidades.
- API RESTful com **ASP.NET Core**, seguindo padrões REST para Create, Read, Update e Delete.
- Armazenamento com **SQLite**, para facilitar setup local e persistência simples.
- O componente de formulário é exibido em **modal desacoplado**, facilitando reuso e legibilidade.
- Interface responsiva com **TailwindCSS** e layout adaptado para mobile-first.
- As cidades são carregadas de forma assíncrona com cache local via Pinia, evitando chamadas repetidas.

## 📝 Como rodar o projeto localmente

### Backend (.NET 8.0)

```bash
cd backend
# Restaurar pacotes e rodar o servidor
dotnet restore
dotnet ef database update
dotnet run
```

### Frontend (Vue + Vite)

```bash
cd frontend
yarn install # Ou npm install
yarn dev # Ou npm run dev
```

Acesse em: [http://localhost:5173](http://localhost:5173)

### Variáveis de Ambiente

No frontend, configure um arquivo `.env` se desejar:

```
VITE_API_URL=http://localhost:5051/api
```

---

Desenvolvido com por **Márcio Machado Pontes**.

[LinkedIn](https://www.linkedin.com/in/marciomachadopontes) | [Portfólio](https://marcioweb3d.netlify.app) | [GitHub](https://github.com/marcinhojazz)


# Gerenciador de Tarefas

Este projeto é um aplicativo avançado de gerenciamento de tarefas com suporte a múltiplos usuários, autenticação e persistência de dados no Firebase.

## Funcionalidades
- [x] Autenticação de usuários (login e registro) com Firebase Authentication.
- [x] Adicionar, marcar como concluída e remover tarefas.
- [x] Filtros por categorias: Todas, Pendentes, Concluídas.
- [x] Suporte a múltiplos usuários com tarefas separadas.
- [x] Alternador de tema (claro e escuro) com persistência no Local Storage.
- [x] Persistência das tarefas no Firestore (Firebase).

## Tecnologias Usadas
- **React**: Biblioteca principal para o desenvolvimento da interface.
- **Firebase Authentication**: Gerenciamento de usuários e autenticação segura.
- **Firestore Database**: Banco de dados NoSQL para persistência das tarefas.
- **CSS**: Estilização personalizada.

## Instalação

Siga os passos abaixo para rodar o projeto localmente:

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/task-manager.git
   cd task-manager
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure o Firebase:
   - Crie um projeto no [Firebase Console](https://console.firebase.google.com/).
   - Ative **Authentication** com o método **Email/Password**.
   - Configure o **Firestore Database** com as seguintes regras:
     ```javascript
     rules_version = '2';
     service cloud.firestore {
       match /databases/{database}/documents {
         match /users/{userId}/tasks/{taskId} {
           allow read, write: if request.auth != null && request.auth.uid == userId;
         }
       }
     }
     ```
   - No Firebase Console, copie as configurações do SDK e substitua os valores no arquivo `firebaseConfig.js`:
     ```javascript
     import { initializeApp } from "firebase/app";
     import { getAuth } from "firebase/auth";
     import { getFirestore } from "firebase/firestore";

     const firebaseConfig = {
       apiKey: "SUA_API_KEY",
       authDomain: "SEU_AUTH_DOMAIN",
       projectId: "SEU_PROJECT_ID",
       storageBucket: "SEU_STORAGE_BUCKET",
       messagingSenderId: "SEU_MESSAGING_SENDER_ID",
       appId: "SEU_APP_ID",
     };

     const app = initializeApp(firebaseConfig);
     export const auth = getAuth(app);
     export const db = getFirestore(app);
     ```

4. Inicie o servidor de desenvolvimento:
   ```bash
   npm start
   ```

## Como Usar
1. Faça login ou registre-se com um email e senha.
2. Adicione tarefas preenchendo o campo de texto e clicando em "Adicionar".
3. Use os botões de filtro (Todas, Pendentes, Concluídas) para organizar as tarefas.
4. Clique no botão "Limpar Todas as Tarefas" para excluir todas as tarefas do usuário atual.
5. Alterne entre o tema claro e escuro usando o botão no topo da página.

## Estrutura do Projeto
```
task-manager/
├── src/
│   ├── components/
│   │   ├── TaskInput.js          # Campo de entrada para adicionar tarefas
│   │   ├── TaskList.js           # Lista de tarefas
│   │   ├── Auth.js               # Componente de autenticação
│   ├── App.js                    # Componente principal
│   ├── firebaseConfig.js         # Configurações do Firebase
│   ├── index.js                  # Ponto de entrada da aplicação
│   ├── App.css                   # Estilos globais
├── public/
│   ├── index.html                # HTML principal
└── README.md                     # Documentação do projeto
```

## Melhorias Futuras
- Adicionar notificações para lembrar tarefas pendentes.
- Suporte para anexar arquivos às tarefas.
- Relatórios gráficos para acompanhar a produtividade.

## Contribuição
1. Faça um fork do repositório.
2. Crie um branch para sua feature:
   ```bash
   git checkout -b minha-feature
   ```
3. Faça suas alterações e crie um pull request.

## Licença
Este projeto está sob a licença MIT. Consulte o arquivo `LICENSE` para mais informações.

---

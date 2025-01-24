# Gerenciador de Tarefas

Este projeto é um aplicativo simples de gerenciamento de tarefas desenvolvido em React. Ele permite que os usuários adicionem, concluam e excluam tarefas, além de alternar entre os modos claro e escuro.

## Funcionalidades
- [x] Adicionar novas tarefas.
- [x] Marcar tarefas como concluídas.
- [x] Excluir tarefas concluídas.
- [x] Filtros: Todas, Pendentes, Concluídas.
- [x] Alternador de tema (claro e escuro).
- [x] Salvar tarefas no Local Storage para persistência.

## Tecnologias Usadas
- **React**: Biblioteca principal para o desenvolvimento da interface.
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

3. Inicie o servidor de desenvolvimento:
   ```bash
   npm start
   ```

## Como Usar
1. Abra `http://localhost:3000` no navegador.
2. Adicione tarefas digitando no campo e clicando no botão "Adicionar".
3. Use os botões de filtro (Todas, Pendentes, Concluídas) para visualizar as tarefas conforme o estado.
4. Clique no botão "Limpar Todas as Tarefas" para excluir todas as tarefas.

## Estrutura do Projeto
```
task-manager/
├── src/
│   ├── components/
│   │   ├── TaskInput.js          # Campo de entrada para adicionar tarefas
│   │   ├── TaskList.js           # Lista de tarefas
│   │   ├── TaskItem.js           # Componente de tarefa individual
│   ├── App.js                    # Componente principal
│   ├── index.js                  # Ponto de entrada da aplicação
│   ├── App.css                   # Estilos globais
├── public/
│   ├── index.html                # HTML principal
└── README.md                     # Documentação do projeto
```

## Salvar Tarefas no Local Storage
Este projeto usa o Local Storage para persistir as tarefas entre recarregamentos da página. Quando uma tarefa é adicionada, removida ou concluída, o estado atualizado é salvo automaticamente no navegador.

## Melhorias Futuras
- Adicionar suporte a múltiplos usuários.
- Criar categorias personalizadas para tarefas.
- Integrar com uma API backend para sincronizar tarefas entre dispositivos.

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



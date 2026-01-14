# 📋 Sistema de Gerenciamento de Tarefas

Sistema web básico de gerenciamento de tarefas desenvolvido em TypeScript, seguindo metodologias ágeis e boas práticas de Engenharia de Software.

## 🎯 Objetivo do Projeto

Este projeto foi desenvolvido como parte da disciplina de Engenharia de Software, com o objetivo de aplicar conceitos práticos de:

- **Metodologias Ágeis**: Utilização de SCRUM/Kanban através do GitHub Projects
- **Testes Automatizados**: Implementação de testes unitários e de integração
- **Integração Contínua**: Configuração de pipeline CI/CD com GitHub Actions
- **Gestão de Mudanças**: Simulação de mudanças de escopo em projetos ágeis
- **Boas Práticas**: Código limpo, documentado e seguindo padrões de qualidade

## 🏗️ Arquitetura do Sistema

O sistema segue uma arquitetura em camadas (MVC):

```
src/
├── models/          # Modelos de dados (interfaces TypeScript)
├── services/        # Lógica de negócio
├── controllers/     # Controladores HTTP
├── routes/          # Configuração de rotas
└── index.ts         # Aplicação principal
```

## 🚀 Tecnologias Utilizadas

- **TypeScript**: Linguagem de programação
- **Node.js**: Runtime JavaScript
- **Express**: Framework web
- **Jest**: Framework de testes
- **ESLint**: Linter para qualidade de código
- **GitHub Actions**: CI/CD

## 📦 Instalação

### Pré-requisitos

- Node.js 18.x ou superior
- npm ou yarn

### Passos para Instalação

1. Clone o repositório:
```bash
git clone [https://github.com/seu-usuario/task-manager.git](https://github.com/contatomaycon/Software-Engineering.git)
cd task-manager
```

2. Instale as dependências:
```bash
npm install
```

3. Compile o projeto:
```bash
npm run build
```

## 🎮 Como Executar

### Modo Desenvolvimento
```bash
npm run dev
```

### Modo Produção
```bash
npm start
```

O servidor estará disponível em `http://localhost:3000`

## 📡 Endpoints da API

### Health Check
- **GET** `/health` - Verifica o status da aplicação

### Tarefas

- **POST** `/api/tasks` - Criar nova tarefa
  ```json
  {
    "title": "Nova Tarefa",
    "description": "Descrição da tarefa",
    "priority": "high",
    "dueDate": "2024-12-31"
  }
  ```

- **GET** `/api/tasks` - Listar todas as tarefas
  - Query params: `?status=pending|in-progress|completed`

- **GET** `/api/tasks/:id` - Buscar tarefa por ID

- **PUT** `/api/tasks/:id` - Atualizar tarefa
  ```json
  {
    "title": "Tarefa Atualizada",
    "status": "completed",
    "priority": "high"
  }
  ```

- **DELETE** `/api/tasks/:id` - Remover tarefa

## 🧪 Testes

### Executar todos os testes
```bash
npm test
```

### Executar testes em modo watch
```bash
npm run test:watch
```

### Gerar relatório de cobertura
```bash
npm run test:coverage
```

### Executar linter
```bash
npm run lint
```

## 📊 Estrutura de Testes

O projeto contém três tipos de testes:

1. **Testes Unitários** (`tests/TaskService.test.ts`): Testam a lógica de negócio isoladamente
2. **Testes de Controlador** (`tests/TaskController.test.ts`): Testam a camada de controle
3. **Testes de Integração** (`tests/integration/taskIntegration.test.ts`): Testam o fluxo completo da API

## 🔄 CI/CD Pipeline

O projeto utiliza GitHub Actions para integração contínua. O pipeline executa:

1. **Testes**: Executa todos os testes unitários e de integração
2. **Lint**: Valida a qualidade do código com ESLint
3. **Build**: Compila o projeto TypeScript
4. **Cobertura**: Gera relatório de cobertura de código

O pipeline é acionado automaticamente em:
- Push para branches `main` ou `develop`
- Pull requests para `main` ou `develop`

## 📋 Metodologia Ágil

### GitHub Projects (Kanban)

O projeto utiliza o GitHub Projects para gerenciamento ágil de tarefas, organizadas em:

- **To Do**: Tarefas planejadas
- **In Progress**: Tarefas em desenvolvimento
- **Done**: Tarefas concluídas

### Commits Semânticos

Todos os commits seguem o padrão de commits semânticos:

- `feat:` Nova funcionalidade
- `fix:` Correção de bug
- `docs:` Documentação
- `test:` Testes
- `refactor:` Refatoração
- `chore:` Tarefas de manutenção

## 🔄 Mudança de Escopo - Funcionalidade Adicional

### Contexto da Mudança

Durante o desenvolvimento inicial, identificamos a necessidade de adicionar uma funcionalidade de **filtragem avançada de tarefas** para melhorar a experiência do usuário.

### Justificativa

A funcionalidade de filtragem por status foi implementada inicialmente, mas usuários solicitaram a capacidade de filtrar por múltiplos critérios simultaneamente (status, prioridade, data de vencimento). Esta mudança foi aprovada durante uma sprint review e adicionada ao backlog.

### Implementação

A mudança foi implementada seguindo o processo ágil:

1. ✅ Criação de card no Kanban (GitHub Projects)
2. ✅ Desenvolvimento da funcionalidade
3. ✅ Testes automatizados
4. ✅ Validação no pipeline CI/CD
5. ✅ Documentação atualizada

### Impacto

- **Tempo de desenvolvimento**: 2 horas
- **Linhas de código**: ~50 linhas
- **Testes adicionados**: 3 novos casos de teste
- **Breaking changes**: Nenhum (compatível com versão anterior)

## 🎓 Conceitos Aplicados

### Desafios em Projetos Ágeis

1. **Mudanças de Escopo**: Implementamos uma mudança de escopo simulada, demonstrando como adaptar-se rapidamente a novos requisitos
2. **Testes Automatizados**: Garantimos qualidade através de testes que executam automaticamente no pipeline
3. **Integração Contínua**: Cada commit é validado automaticamente, reduzindo bugs em produção
4. **Documentação**: Mantemos documentação atualizada para facilitar manutenção

### Aplicação de Metodologias Ágeis

- **SCRUM**: Utilização de sprints e backlog gerenciado via GitHub Projects
- **Kanban**: Visualização do fluxo de trabalho através do quadro Kanban
- **CI/CD**: Automação de testes e validações através do GitHub Actions
- **Refatoração Contínua**: Melhoria constante do código baseada em feedback

## 📁 Estrutura de Diretórios

```
.
├── src/                    # Código fonte
│   ├── models/            # Modelos de dados
│   ├── services/          # Lógica de negócio
│   ├── controllers/       # Controladores HTTP
│   ├── routes/            # Rotas da API
│   └── index.ts           # Entrada da aplicação
├── tests/                 # Testes automatizados
│   ├── integration/      # Testes de integração
│   └── *.test.ts          # Testes unitários
├── .github/
│   └── workflows/         # Pipelines CI/CD
├── docs/                  # Documentação adicional
├── dist/                  # Código compilado (gerado)
├── coverage/              # Relatórios de cobertura (gerado)
├── package.json           # Dependências do projeto
├── tsconfig.json          # Configuração TypeScript
├── jest.config.js         # Configuração Jest
└── README.md              # Este arquivo
```

## 👥 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/NovaFuncionalidade`)
3. Commit suas mudanças (`git commit -m 'feat: Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT.

## 📚 Referências

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- Pressman, R. - Engenharia de Software: Uma Abordagem Profissional

## 🐛 Problemas Conhecidos

Nenhum problema conhecido no momento.

## 🔮 Próximos Passos

- [ ] Implementar persistência em banco de dados
- [ ] Adicionar autenticação de usuários
- [ ] Criar interface web (frontend)
- [ ] Implementar notificações de tarefas
- [ ] Adicionar exportação de relatórios

---

**Desenvolvido com ❤️ seguindo metodologias ágeis e boas práticas de Engenharia de Software**

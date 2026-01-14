# 📝 Guia de Commits Semânticos

Este documento descreve o padrão de commits semânticos utilizado no projeto.

## Formato

```
<tipo>(<escopo>): <descrição>

[corpo opcional]

[rodapé opcional]
```

## Tipos de Commit

### `feat`
Nova funcionalidade

**Exemplos:**
```
feat: adiciona endpoint de estatísticas de tarefas
feat(api): implementa filtro por prioridade
feat(statistics): adiciona cálculo de média de tarefas por dia
```

### `fix`
Correção de bug

**Exemplos:**
```
fix: corrige validação de título vazio
fix(service): resolve erro ao atualizar tarefa inexistente
fix(api): corrige formato de data no retorno
```

### `docs`
Mudanças na documentação

**Exemplos:**
```
docs: atualiza README com instruções de instalação
docs(api): adiciona exemplos de uso dos endpoints
docs: documenta mudança de escopo no README
```

### `test`
Adição ou correção de testes

**Exemplos:**
```
test: adiciona testes para TaskStatisticsService
test(integration): adiciona testes de API
test: corrige teste de validação de título
```

### `refactor`
Refatoração de código (sem mudança de funcionalidade)

**Exemplos:**
```
refactor: reorganiza estrutura de diretórios
refactor(service): simplifica lógica de validação
refactor: melhora organização de rotas
```

### `chore`
Tarefas de manutenção (dependências, configurações, etc.)

**Exemplos:**
```
chore: atualiza dependências do projeto
chore: configura GitHub Actions
chore: adiciona arquivo .gitignore
```

### `style`
Mudanças de formatação (espaços, ponto e vírgula, etc.)

**Exemplos:**
```
style: corrige formatação do código
style: ajusta indentação
```

## Escopo (Opcional)

O escopo indica a área do código afetada:

- `api` - Endpoints da API
- `service` - Serviços de negócio
- `controller` - Controladores
- `model` - Modelos de dados
- `test` - Testes
- `ci` - Pipeline CI/CD
- `docs` - Documentação

## Exemplos Completos

### Commit Simples
```
feat: adiciona sistema de gerenciamento de tarefas
```

### Commit com Escopo
```
feat(api): adiciona endpoint para criar tarefas
```

### Commit com Corpo
```
feat(statistics): adiciona serviço de estatísticas

Implementa funcionalidade adicional solicitada pelos usuários.
Inclui cálculo de estatísticas gerais, tarefas próximas do
vencimento e tarefas atrasadas.
```

### Commit de Correção
```
fix(service): corrige validação de título com espaços

Remove espaços em branco do início e fim do título antes
de validar. Resolve problema onde títulos com apenas espaços
eram aceitos incorretamente.
```

### Commit de Teste
```
test: adiciona testes para TaskStatisticsService

Cobre todos os métodos do serviço de estatísticas:
- getStatistics
- getTasksNearDueDate
- getOverdueTasks
- getHighPriorityPendingTasks
```

## Boas Práticas

1. **Seja descritivo**: A mensagem deve deixar claro o que foi feito
2. **Use imperativo**: "adiciona" ao invés de "adicionado" ou "adicionando"
3. **Seja específico**: Evite mensagens genéricas como "atualiza código"
4. **Mencione breaking changes**: Se houver, use `BREAKING CHANGE:` no rodapé
5. **Referencie issues**: Use `Closes #123` ou `Fixes #456` quando aplicável

## Exemplos de Sequência de Commits para o Projeto

```
chore: configura estrutura inicial do projeto
feat: implementa modelo de dados Task
feat(service): adiciona TaskService com operações CRUD
feat(controller): implementa TaskController
feat(api): configura rotas da API
test: adiciona testes unitários para TaskService
test: adiciona testes de integração da API
chore: configura GitHub Actions para CI/CD
docs: adiciona README com documentação do projeto
feat(statistics): adiciona serviço de estatísticas de tarefas
test(statistics): adiciona testes para TaskStatisticsService
docs: documenta mudança de escopo no README
```

## Referências

- [Conventional Commits](https://www.conventionalcommits.org/)
- [Angular Commit Message Guidelines](https://github.com/angular/angular/blob/main/CONTRIBUTING.md#commit)

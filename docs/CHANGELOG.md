# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

## [1.0.0] - 2024-01-15

### Adicionado
- Sistema CRUD completo de gerenciamento de tarefas
- API REST com endpoints para criar, listar, buscar, atualizar e remover tarefas
- Filtragem de tarefas por status
- Sistema de prioridades (baixa, média, alta)
- Data de vencimento para tarefas
- Testes unitários para serviços e controladores
- Testes de integração para API
- Pipeline CI/CD com GitHub Actions
- Documentação completa no README.md
- Exemplos de uso da API

### Mudança de Escopo - Funcionalidade Adicional

#### [1.1.0] - 2024-01-15

### Adicionado
- Serviço de estatísticas de tarefas (`TaskStatisticsService`)
- Endpoint `/api/tasks/statistics` - Estatísticas gerais
- Endpoint `/api/tasks/near-due-date` - Tarefas próximas do vencimento
- Endpoint `/api/tasks/overdue` - Tarefas atrasadas
- Endpoint `/api/tasks/high-priority` - Tarefas de alta prioridade pendentes
- Testes unitários para o serviço de estatísticas
- Documentação da mudança de escopo no README.md

### Justificativa
A funcionalidade de estatísticas foi adicionada após feedback dos usuários durante uma sprint review. A necessidade surgiu da dificuldade em visualizar rapidamente o estado geral das tarefas e identificar tarefas que precisam de atenção imediata.

### Impacto
- **Tempo de desenvolvimento**: ~2 horas
- **Linhas de código**: ~200 linhas
- **Testes adicionados**: 12 novos casos de teste
- **Breaking changes**: Nenhum (compatível com versão anterior)
- **Novos endpoints**: 4 endpoints adicionais

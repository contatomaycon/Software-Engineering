# 📚 Exemplos de Uso da API

Este documento contém exemplos práticos de como utilizar a API do Sistema de Gerenciamento de Tarefas.

## Endpoints Disponíveis

### 1. Health Check

```bash
curl http://localhost:3000/health
```

**Resposta:**
```json
{
  "status": "ok",
  "message": "Sistema de Gerenciamento de Tarefas está funcionando",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### 2. Criar Tarefa

```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Implementar testes automatizados",
    "description": "Criar testes unitários para o serviço de tarefas",
    "priority": "high",
    "dueDate": "2024-12-31"
  }'
```

**Resposta:**
```json
{
  "message": "Tarefa criada com sucesso",
  "task": {
    "id": "task-1",
    "title": "Implementar testes automatizados",
    "description": "Criar testes unitários para o serviço de tarefas",
    "status": "pending",
    "priority": "high",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z",
    "dueDate": "2024-12-31T00:00:00.000Z"
  }
}
```

### 3. Listar Todas as Tarefas

```bash
curl http://localhost:3000/api/tasks
```

**Resposta:**
```json
{
  "tasks": [
    {
      "id": "task-1",
      "title": "Implementar testes automatizados",
      "description": "Criar testes unitários para o serviço de tarefas",
      "status": "pending",
      "priority": "high",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ],
  "count": 1
}
```

### 4. Filtrar Tarefas por Status

```bash
curl http://localhost:3000/api/tasks?status=completed
```

### 5. Buscar Tarefa por ID

```bash
curl http://localhost:3000/api/tasks/task-1
```

**Resposta:**
```json
{
  "task": {
    "id": "task-1",
    "title": "Implementar testes automatizados",
    "description": "Criar testes unitários para o serviço de tarefas",
    "status": "pending",
    "priority": "high",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

### 6. Atualizar Tarefa

```bash
curl -X PUT http://localhost:3000/api/tasks/task-1 \
  -H "Content-Type: application/json" \
  -d '{
    "status": "in-progress",
    "priority": "high"
  }'
```

**Resposta:**
```json
{
  "message": "Tarefa atualizada com sucesso",
  "task": {
    "id": "task-1",
    "title": "Implementar testes automatizados",
    "description": "Criar testes unitários para o serviço de tarefas",
    "status": "in-progress",
    "priority": "high",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:35:00.000Z"
  }
}
```

### 7. Remover Tarefa

```bash
curl -X DELETE http://localhost:3000/api/tasks/task-1
```

**Resposta:**
```json
{
  "message": "Tarefa removida com sucesso"
}
```

## Endpoints de Estatísticas (Funcionalidade Adicional)

### 8. Obter Estatísticas Gerais

```bash
curl http://localhost:3000/api/tasks/statistics
```

**Resposta:**
```json
{
  "statistics": {
    "total": 10,
    "byStatus": {
      "pending": 5,
      "in-progress": 3,
      "completed": 2
    },
    "byPriority": {
      "low": 2,
      "medium": 5,
      "high": 3
    },
    "completedPercentage": 20,
    "averageTasksPerDay": 1.4
  }
}
```

### 9. Tarefas Próximas do Vencimento

```bash
curl http://localhost:3000/api/tasks/near-due-date?days=3
```

**Resposta:**
```json
{
  "tasks": [
    {
      "id": "task-2",
      "title": "Revisar código",
      "status": "pending",
      "dueDate": "2024-01-18T00:00:00.000Z"
    }
  ],
  "count": 1,
  "days": 3
}
```

### 10. Tarefas Atrasadas

```bash
curl http://localhost:3000/api/tasks/overdue
```

**Resposta:**
```json
{
  "tasks": [
    {
      "id": "task-3",
      "title": "Tarefa atrasada",
      "status": "pending",
      "dueDate": "2024-01-10T00:00:00.000Z"
    }
  ],
  "count": 1
}
```

### 11. Tarefas de Alta Prioridade Pendentes

```bash
curl http://localhost:3000/api/tasks/high-priority
```

**Resposta:**
```json
{
  "tasks": [
    {
      "id": "task-1",
      "title": "Implementar testes automatizados",
      "status": "pending",
      "priority": "high"
    }
  ],
  "count": 1
}
```

## Exemplos com JavaScript/TypeScript

```typescript
// Criar tarefa
const createTask = async () => {
  const response = await fetch('http://localhost:3000/api/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: 'Nova Tarefa',
      description: 'Descrição da tarefa',
      priority: 'high'
    })
  });
  
  const data = await response.json();
  console.log(data);
};

// Listar tarefas
const listTasks = async () => {
  const response = await fetch('http://localhost:3000/api/tasks');
  const data = await response.json();
  console.log(data.tasks);
};

// Obter estatísticas
const getStatistics = async () => {
  const response = await fetch('http://localhost:3000/api/tasks/statistics');
  const data = await response.json();
  console.log(data.statistics);
};
```

## Códigos de Status HTTP

- `200` - Sucesso
- `201` - Criado com sucesso
- `400` - Erro de validação
- `404` - Recurso não encontrado
- `500` - Erro interno do servidor

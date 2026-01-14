import request from 'supertest';
import express from 'express';
import { setupTaskRoutes } from '../../src/routes/taskRoutes';
import { Task } from '../../src/models/Task';

// Criar instância do app para testes
const testApp = express();
testApp.use(express.json());

// Rota de saúde da aplicação
testApp.get('/health', (_req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Sistema de Gerenciamento de Tarefas está funcionando',
    timestamp: new Date().toISOString()
  });
});

setupTaskRoutes(testApp);

/**
 * Testes de integração para o sistema de gerenciamento de tarefas
 * Testam o fluxo completo das requisições HTTP
 */
describe('Task API Integration Tests', () => {
  let createdTaskId: string;

  describe('POST /api/tasks', () => {
    it('deve criar uma nova tarefa via API', async () => {
      const response = await request(testApp)
        .post('/api/tasks')
        .send({
          title: 'Tarefa de Integração',
          description: 'Teste de integração',
          priority: 'high'
        })
        .expect(201);

      expect(response.body.message).toBe('Tarefa criada com sucesso');
      expect(response.body.task).toBeDefined();
      expect(response.body.task.title).toBe('Tarefa de Integração');
      
      createdTaskId = response.body.task.id;
    });

    it('deve retornar erro 400 ao criar tarefa sem título', async () => {
      const response = await request(testApp)
        .post('/api/tasks')
        .send({
          description: 'Tarefa sem título'
        })
        .expect(400);

      expect(response.body.error).toBeDefined();
    });
  });

  describe('GET /api/tasks', () => {
    it('deve listar todas as tarefas', async () => {
      const response = await request(testApp)
        .get('/api/tasks')
        .expect(200);

      expect(response.body.tasks).toBeDefined();
      expect(Array.isArray(response.body.tasks)).toBe(true);
      expect(response.body.count).toBeDefined();
    });

    it('deve filtrar tarefas por status', async () => {
      const response = await request(testApp)
        .get('/api/tasks?status=pending')
        .expect(200);

      expect(response.body.tasks).toBeDefined();
      if (response.body.tasks.length > 0) {
        response.body.tasks.forEach((task: Task) => {
          expect(task.status).toBe('pending');
        });
      }
    });
  });

  describe('GET /api/tasks/:id', () => {
    it('deve buscar tarefa por ID', async () => {
      if (!createdTaskId) {
        // Criar tarefa se não existir
        const createResponse = await request(testApp)
          .post('/api/tasks')
          .send({
            title: 'Tarefa para buscar',
            description: 'Teste'
          });
        createdTaskId = createResponse.body.task.id;
      }

      const response = await request(testApp)
        .get(`/api/tasks/${createdTaskId}`)
        .expect(200);

      expect(response.body.task).toBeDefined();
      expect(response.body.task.id).toBe(createdTaskId);
    });

    it('deve retornar 404 para tarefa inexistente', async () => {
      await request(testApp)
        .get('/api/tasks/task-999')
        .expect(404);
    });
  });

  describe('PUT /api/tasks/:id', () => {
    it('deve atualizar tarefa existente', async () => {
      if (!createdTaskId) {
        const createResponse = await request(testApp)
          .post('/api/tasks')
          .send({
            title: 'Tarefa para atualizar',
            description: 'Teste'
          });
        createdTaskId = createResponse.body.task.id;
      }

      const response = await request(testApp)
        .put(`/api/tasks/${createdTaskId}`)
        .send({
          title: 'Tarefa Atualizada',
          status: 'completed'
        })
        .expect(200);

      expect(response.body.message).toBe('Tarefa atualizada com sucesso');
      expect(response.body.task.title).toBe('Tarefa Atualizada');
      expect(response.body.task.status).toBe('completed');
    });
  });

  describe('DELETE /api/tasks/:id', () => {
    it('deve remover tarefa existente', async () => {
      // Criar tarefa para deletar
      const createResponse = await request(testApp)
        .post('/api/tasks')
        .send({
          title: 'Tarefa para deletar',
          description: 'Teste'
        });
      
      const taskId = createResponse.body.task.id;

      const response = await request(testApp)
        .delete(`/api/tasks/${taskId}`)
        .expect(200);

      expect(response.body.message).toBe('Tarefa removida com sucesso');

      // Verificar que foi removida
      await request(testApp)
        .get(`/api/tasks/${taskId}`)
        .expect(404);
    });
  });

  describe('GET /health', () => {
    it('deve retornar status de saúde da aplicação', async () => {
      const response = await request(testApp)
        .get('/health')
        .expect(200);

      expect(response.body.status).toBe('ok');
      expect(response.body.message).toBeDefined();
      expect(response.body.timestamp).toBeDefined();
    });
  });
});

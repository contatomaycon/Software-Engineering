import express, { Request, Response } from 'express';
import { TaskController } from '../controllers/TaskController';
import { TaskService } from '../services/TaskService';
import { TaskStatisticsController } from '../controllers/TaskStatisticsController';
import { TaskStatisticsService } from '../services/TaskStatisticsService';

/**
 * Configuração de rotas para tarefas
 */
export function setupTaskRoutes(app: express.Application): void {
  const taskService = new TaskService();
  const taskController = new TaskController(taskService);

  // Criar nova tarefa
  app.post('/api/tasks', (req: Request, res: Response) => {
    const response = taskController.createTask(req);
    res.status(response.statusCode).json(response.body);
  });

  // Listar todas as tarefas
  app.get('/api/tasks', (req: Request, res: Response) => {
    const response = taskController.getAllTasks(req);
    res.status(response.statusCode).json(response.body);
  });

  // Buscar tarefa por ID
  app.get('/api/tasks/:id', (req: Request, res: Response) => {
    const response = taskController.getTaskById({ params: { id: req.params.id } });
    res.status(response.statusCode).json(response.body);
  });

  // Atualizar tarefa
  app.put('/api/tasks/:id', (req: Request, res: Response) => {
    const response = taskController.updateTask({ 
      params: { id: req.params.id }, 
      body: req.body 
    });
    res.status(response.statusCode).json(response.body);
  });

  // Remover tarefa
  app.delete('/api/tasks/:id', (req: Request, res: Response) => {
    const response = taskController.deleteTask({ params: { id: req.params.id } });
    res.status(response.statusCode).json(response.body);
  });

  // Rotas de Estatísticas (Funcionalidade Adicional)
  const statisticsService = new TaskStatisticsService(taskService);
  const statisticsController = new TaskStatisticsController(statisticsService);

  // Estatísticas gerais
  app.get('/api/tasks/statistics', (_req: Request, res: Response) => {
    const response = statisticsController.getStatistics();
    res.status(response.statusCode).json(response.body);
  });

  // Tarefas próximas do vencimento
  app.get('/api/tasks/near-due-date', (req: Request, res: Response) => {
    const response = statisticsController.getTasksNearDueDate(req);
    res.status(response.statusCode).json(response.body);
  });

  // Tarefas atrasadas
  app.get('/api/tasks/overdue', (_req: Request, res: Response) => {
    const response = statisticsController.getOverdueTasks();
    res.status(response.statusCode).json(response.body);
  });

  // Tarefas de alta prioridade pendentes
  app.get('/api/tasks/high-priority', (_req: Request, res: Response) => {
    const response = statisticsController.getHighPriorityPendingTasks();
    res.status(response.statusCode).json(response.body);
  });
}

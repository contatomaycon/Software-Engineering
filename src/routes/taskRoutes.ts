import { TaskController } from '../controllers/TaskController';
import { TaskService } from '../services/TaskService';
import { TaskStatisticsController } from '../controllers/TaskStatisticsController';
import { TaskStatisticsService } from '../services/TaskStatisticsService';

/**
 * Configuração de rotas para tarefas
 */
export function setupTaskRoutes(app: any) {
  const taskService = new TaskService();
  const taskController = new TaskController(taskService);

  // Criar nova tarefa
  app.post('/api/tasks', (req: any, res: any) => {
    const response = taskController.createTask(req);
    res.status(response.statusCode).json(response.body);
  });

  // Listar todas as tarefas
  app.get('/api/tasks', (req: any, res: any) => {
    const response = taskController.getAllTasks(req);
    res.status(response.statusCode).json(response.body);
  });

  // Buscar tarefa por ID
  app.get('/api/tasks/:id', (req: any, res: any) => {
    const response = taskController.getTaskById(req);
    res.status(response.statusCode).json(response.body);
  });

  // Atualizar tarefa
  app.put('/api/tasks/:id', (req: any, res: any) => {
    const response = taskController.updateTask(req);
    res.status(response.statusCode).json(response.body);
  });

  // Remover tarefa
  app.delete('/api/tasks/:id', (req: any, res: any) => {
    const response = taskController.deleteTask(req);
    res.status(response.statusCode).json(response.body);
  });

  // Rotas de Estatísticas (Funcionalidade Adicional)
  const statisticsService = new TaskStatisticsService(taskService);
  const statisticsController = new TaskStatisticsController(statisticsService);

  // Estatísticas gerais
  app.get('/api/tasks/statistics', (_req: any, res: any) => {
    const response = statisticsController.getStatistics();
    res.status(response.statusCode).json(response.body);
  });

  // Tarefas próximas do vencimento
  app.get('/api/tasks/near-due-date', (req: any, res: any) => {
    const response = statisticsController.getTasksNearDueDate(req);
    res.status(response.statusCode).json(response.body);
  });

  // Tarefas atrasadas
  app.get('/api/tasks/overdue', (_req: any, res: any) => {
    const response = statisticsController.getOverdueTasks();
    res.status(response.statusCode).json(response.body);
  });

  // Tarefas de alta prioridade pendentes
  app.get('/api/tasks/high-priority', (_req: any, res: any) => {
    const response = statisticsController.getHighPriorityPendingTasks();
    res.status(response.statusCode).json(response.body);
  });
}

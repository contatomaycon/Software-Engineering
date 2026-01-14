import { TaskStatisticsService } from '../src/services/TaskStatisticsService';
import { TaskService } from '../src/services/TaskService';

describe('TaskStatisticsService', () => {
  let taskService: TaskService;
  let statisticsService: TaskStatisticsService;

  beforeEach(() => {
    taskService = new TaskService();
    statisticsService = new TaskStatisticsService(taskService);
  });

  describe('getStatistics', () => {
    it('deve retornar estatísticas corretas quando não há tarefas', () => {
      const stats = statisticsService.getStatistics();

      expect(stats.total).toBe(0);
      expect(stats.byStatus.pending).toBe(0);
      expect(stats.byStatus['in-progress']).toBe(0);
      expect(stats.byStatus.completed).toBe(0);
      expect(stats.completedPercentage).toBe(0);
    });

    it('deve calcular estatísticas corretamente com tarefas', () => {
      taskService.createTask({ title: 'Tarefa 1', description: 'Desc 1', priority: 'high' });
      taskService.createTask({ title: 'Tarefa 2', description: 'Desc 2', priority: 'medium' });
      taskService.createTask({ title: 'Tarefa 3', description: 'Desc 3', priority: 'low' });
      
      const task4 = taskService.createTask({ title: 'Tarefa 4', description: 'Desc 4' });
      taskService.updateTask(task4.id, { status: 'completed' });

      const stats = statisticsService.getStatistics();

      expect(stats.total).toBe(4);
      expect(stats.byStatus.pending).toBe(3);
      expect(stats.byStatus.completed).toBe(1);
      expect(stats.byPriority.high).toBe(1);
      expect(stats.byPriority.medium).toBe(2);
      expect(stats.byPriority.low).toBe(1);
      expect(stats.completedPercentage).toBe(25);
    });
  });

  describe('getTasksNearDueDate', () => {
    it('deve retornar tarefas próximas do vencimento', () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);

      const nextWeek = new Date();
      nextWeek.setDate(nextWeek.getDate() + 7);

      taskService.createTask({ 
        title: 'Tarefa próxima', 
        description: 'Teste',
        dueDate: tomorrow
      });

      taskService.createTask({ 
        title: 'Tarefa distante', 
        description: 'Teste',
        dueDate: nextWeek
      });

      const task3 = taskService.createTask({ 
        title: 'Tarefa já concluída', 
        description: 'Teste',
        dueDate: tomorrow
      });
      taskService.updateTask(task3.id, { status: 'completed' });

      const nearTasks = statisticsService.getTasksNearDueDate(3);

      expect(nearTasks.length).toBe(1);
      expect(nearTasks[0].title).toBe('Tarefa próxima');
    });

    it('deve retornar lista vazia quando não há tarefas próximas', () => {
      const nextWeek = new Date();
      nextWeek.setDate(nextWeek.getDate() + 7);

      taskService.createTask({ 
        title: 'Tarefa distante', 
        description: 'Teste',
        dueDate: nextWeek
      });

      const nearTasks = statisticsService.getTasksNearDueDate(3);
      expect(nearTasks.length).toBe(0);
    });
  });

  describe('getOverdueTasks', () => {
    it('deve retornar tarefas atrasadas', () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      const lastWeek = new Date();
      lastWeek.setDate(lastWeek.getDate() - 7);

      taskService.createTask({ 
        title: 'Tarefa atrasada 1', 
        description: 'Teste',
        dueDate: yesterday
      });

      taskService.createTask({ 
        title: 'Tarefa atrasada 2', 
        description: 'Teste',
        dueDate: lastWeek
      });

      const task3 = taskService.createTask({ 
        title: 'Tarefa concluída atrasada', 
        description: 'Teste',
        dueDate: yesterday
      });
      taskService.updateTask(task3.id, { status: 'completed' });

      const overdueTasks = statisticsService.getOverdueTasks();

      expect(overdueTasks.length).toBe(2);
      expect(overdueTasks.every(t => t.status !== 'completed')).toBe(true);
    });

    it('deve retornar lista vazia quando não há tarefas atrasadas', () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);

      taskService.createTask({ 
        title: 'Tarefa futura', 
        description: 'Teste',
        dueDate: tomorrow
      });

      const overdueTasks = statisticsService.getOverdueTasks();
      expect(overdueTasks.length).toBe(0);
    });
  });

  describe('getHighPriorityPendingTasks', () => {
    it('deve retornar apenas tarefas de alta prioridade não concluídas', () => {
      taskService.createTask({ 
        title: 'Alta prioridade 1', 
        description: 'Teste',
        priority: 'high'
      });

      taskService.createTask({ 
        title: 'Alta prioridade 2', 
        description: 'Teste',
        priority: 'high'
      });

      taskService.createTask({ 
        title: 'Baixa prioridade', 
        description: 'Teste',
        priority: 'low'
      });

      const task4 = taskService.createTask({ 
        title: 'Alta prioridade concluída', 
        description: 'Teste',
        priority: 'high'
      });
      taskService.updateTask(task4.id, { status: 'completed' });

      const highPriorityTasks = statisticsService.getHighPriorityPendingTasks();

      expect(highPriorityTasks.length).toBe(2);
      expect(highPriorityTasks.every(t => t.priority === 'high')).toBe(true);
      expect(highPriorityTasks.every(t => t.status !== 'completed')).toBe(true);
    });

    it('deve retornar lista vazia quando não há tarefas de alta prioridade', () => {
      taskService.createTask({ 
        title: 'Baixa prioridade', 
        description: 'Teste',
        priority: 'low'
      });

      const highPriorityTasks = statisticsService.getHighPriorityPendingTasks();
      expect(highPriorityTasks.length).toBe(0);
    });
  });
});

import { TaskService } from './TaskService';
import { Task } from '../models/Task';

/**
 * Serviço de Estatísticas de Tarefas
 * Funcionalidade adicional: Fornece estatísticas e análises sobre as tarefas
 * Esta funcionalidade foi adicionada como parte de uma mudança de escopo
 */
export class TaskStatisticsService {
  private taskService: TaskService;

  constructor(taskService: TaskService) {
    this.taskService = taskService;
  }

  /**
   * Calcula estatísticas gerais das tarefas
   * @returns Objeto com estatísticas agregadas
   */
  getStatistics(): {
    total: number;
    byStatus: Record<string, number>;
    byPriority: Record<string, number>;
    completedPercentage: number;
    averageTasksPerDay?: number;
  } {
    const tasks = this.taskService.getAllTasks();
    const total = tasks.length;

    const byStatus: Record<string, number> = {
      pending: 0,
      'in-progress': 0,
      completed: 0
    };

    const byPriority: Record<string, number> = {
      low: 0,
      medium: 0,
      high: 0
    };

    tasks.forEach(task => {
      byStatus[task.status]++;
      byPriority[task.priority]++;
    });

    const completedPercentage = total > 0 
      ? Math.round((byStatus.completed / total) * 100) 
      : 0;

    // Calcular média de tarefas criadas por dia (últimos 7 dias)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const recentTasks = tasks.filter(task => 
      task.createdAt >= sevenDaysAgo
    );
    const averageTasksPerDay = recentTasks.length > 0 
      ? Math.round((recentTasks.length / 7) * 10) / 10 
      : 0;

    return {
      total,
      byStatus,
      byPriority,
      completedPercentage,
      averageTasksPerDay
    };
  }

  /**
   * Retorna tarefas próximas do vencimento
   * @param days Número de dias para considerar "próximo"
   * @returns Lista de tarefas próximas do vencimento
   */
  getTasksNearDueDate(days: number = 3): Task[] {
    const tasks = this.taskService.getAllTasks();
    const today = new Date();
    const futureDate = new Date();
    futureDate.setDate(today.getDate() + days);

    return tasks.filter(task => {
      if (!task.dueDate) return false;
      if (task.status === 'completed') return false;
      
      const dueDate = new Date(task.dueDate);
      return dueDate >= today && dueDate <= futureDate;
    }).sort((a, b) => {
      if (!a.dueDate || !b.dueDate) return 0;
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    });
  }

  /**
   * Retorna tarefas atrasadas
   * @returns Lista de tarefas com data de vencimento passada
   */
  getOverdueTasks(): Task[] {
    const tasks = this.taskService.getAllTasks();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return tasks.filter(task => {
      if (!task.dueDate) return false;
      if (task.status === 'completed') return false;
      
      const dueDate = new Date(task.dueDate);
      dueDate.setHours(0, 0, 0, 0);
      return dueDate < today;
    }).sort((a, b) => {
      if (!a.dueDate || !b.dueDate) return 0;
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    });
  }

  /**
   * Retorna tarefas de alta prioridade não concluídas
   * @returns Lista de tarefas de alta prioridade pendentes
   */
  getHighPriorityPendingTasks(): Task[] {
    const tasks = this.taskService.getAllTasks();
    
    return tasks.filter(task => 
      task.priority === 'high' && task.status !== 'completed'
    ).sort((a, b) => {
      // Ordenar por data de criação (mais recentes primeiro)
      return b.createdAt.getTime() - a.createdAt.getTime();
    });
  }
}

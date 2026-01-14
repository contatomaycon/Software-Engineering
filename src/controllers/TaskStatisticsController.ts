import { TaskStatisticsService } from '../services/TaskStatisticsService';

/**
 * Controlador de Estatísticas de Tarefas
 * Funcionalidade adicional implementada como mudança de escopo
 */
export class TaskStatisticsController {
  private statisticsService: TaskStatisticsService;

  constructor(statisticsService: TaskStatisticsService) {
    this.statisticsService = statisticsService;
  }

  /**
   * Retorna estatísticas gerais das tarefas
   */
  getStatistics() {
    try {
      const statistics = this.statisticsService.getStatistics();
      return {
        statusCode: 200,
        body: { statistics }
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: { error: 'Erro ao calcular estatísticas' }
      };
    }
  }

  /**
   * Retorna tarefas próximas do vencimento
   */
  getTasksNearDueDate(req: { query?: { days?: string } }) {
    try {
      const days = req.query?.days ? parseInt(req.query.days, 10) : 3;
      const tasks = this.statisticsService.getTasksNearDueDate(days);
      
      return {
        statusCode: 200,
        body: { 
          tasks,
          count: tasks.length,
          days
        }
      };
    } catch (error) {
      return {
        statusCode: 400,
        body: { error: 'Parâmetro inválido' }
      };
    }
  }

  /**
   * Retorna tarefas atrasadas
   */
  getOverdueTasks() {
    try {
      const tasks = this.statisticsService.getOverdueTasks();
      
      return {
        statusCode: 200,
        body: { 
          tasks,
          count: tasks.length
        }
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: { error: 'Erro ao buscar tarefas atrasadas' }
      };
    }
  }

  /**
   * Retorna tarefas de alta prioridade pendentes
   */
  getHighPriorityPendingTasks() {
    try {
      const tasks = this.statisticsService.getHighPriorityPendingTasks();
      
      return {
        statusCode: 200,
        body: { 
          tasks,
          count: tasks.length
        }
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: { error: 'Erro ao buscar tarefas de alta prioridade' }
      };
    }
  }
}

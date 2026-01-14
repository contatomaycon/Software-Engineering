import { TaskService } from '../services/TaskService';
import { CreateTaskDTO, UpdateTaskDTO, Task } from '../models/Task';

/**
 * Tipo de resposta do controlador
 */
interface ControllerResponse {
  statusCode: number;
  body: {
    message?: string;
    task?: Task;
    tasks?: Task[];
    count?: number;
    error?: string;
  };
}

/**
 * Controlador de tarefas
 * Gerencia as requisições HTTP relacionadas a tarefas
 */
export class TaskController {
  private taskService: TaskService;

  constructor(taskService: TaskService) {
    this.taskService = taskService;
  }

  /**
   * Cria uma nova tarefa
   */
  createTask(req: { body: CreateTaskDTO }): ControllerResponse {
    try {
      const task = this.taskService.createTask(req.body);
      return {
        statusCode: 201,
        body: { message: 'Tarefa criada com sucesso', task }
      };
    } catch (error) {
      return {
        statusCode: 400,
        body: { error: error instanceof Error ? error.message : 'Erro ao criar tarefa' }
      };
    }
  }

  /**
   * Lista todas as tarefas
   */
  getAllTasks(req: { query?: { status?: string } }): ControllerResponse {
    const status = req.query?.status as 'pending' | 'in-progress' | 'completed' | undefined;
    const tasks = this.taskService.getAllTasks(status);
    return {
      statusCode: 200,
      body: { tasks, count: tasks.length }
    };
  }

  /**
   * Busca uma tarefa por ID
   */
  getTaskById(req: { params: { id: string } }): ControllerResponse {
    const task = this.taskService.getTaskById(req.params.id);
    
    if (!task) {
      return {
        statusCode: 404,
        body: { error: 'Tarefa não encontrada' }
      };
    }

    return {
      statusCode: 200,
      body: { task }
    };
  }

  /**
   * Atualiza uma tarefa
   */
  updateTask(req: { params: { id: string }; body: UpdateTaskDTO }): ControllerResponse {
    try {
      const task = this.taskService.updateTask(req.params.id, req.body);
      
      if (!task) {
        return {
          statusCode: 404,
          body: { error: 'Tarefa não encontrada' }
        };
      }

      return {
        statusCode: 200,
        body: { message: 'Tarefa atualizada com sucesso', task }
      };
    } catch (error) {
      return {
        statusCode: 400,
        body: { error: error instanceof Error ? error.message : 'Erro ao atualizar tarefa' }
      };
    }
  }

  /**
   * Remove uma tarefa
   */
  deleteTask(req: { params: { id: string } }): ControllerResponse {
    const deleted = this.taskService.deleteTask(req.params.id);
    
    if (!deleted) {
      return {
        statusCode: 404,
        body: { error: 'Tarefa não encontrada' }
      };
    }

    return {
      statusCode: 200,
      body: { message: 'Tarefa removida com sucesso' }
    };
  }
}

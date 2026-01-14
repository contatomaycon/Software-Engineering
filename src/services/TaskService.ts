import { Task, CreateTaskDTO, UpdateTaskDTO } from '../models/Task';

/**
 * Serviço de gerenciamento de tarefas
 * Implementa operações CRUD para tarefas
 */
export class TaskService {
  private tasks: Task[] = [];
  private nextId: number = 1;

  /**
   * Cria uma nova tarefa
   * @param taskData Dados da tarefa a ser criada
   * @returns Tarefa criada
   */
  createTask(taskData: CreateTaskDTO): Task {
    if (!taskData.title || taskData.title.trim().length === 0) {
      throw new Error('O título da tarefa é obrigatório');
    }

    if (taskData.title.length > 100) {
      throw new Error('O título da tarefa não pode ter mais de 100 caracteres');
    }

    const now = new Date();
    const task: Task = {
      id: `task-${this.nextId++}`,
      title: taskData.title.trim(),
      description: taskData.description || '',
      status: 'pending',
      priority: taskData.priority || 'medium',
      createdAt: now,
      updatedAt: now,
      dueDate: taskData.dueDate
    };

    this.tasks.push(task);
    return task;
  }

  /**
   * Lista todas as tarefas
   * @param status Filtro opcional por status
   * @returns Lista de tarefas
   */
  getAllTasks(status?: Task['status']): Task[] {
    if (status) {
      return this.tasks.filter(task => task.status === status);
    }
    return [...this.tasks];
  }

  /**
   * Busca uma tarefa por ID
   * @param id ID da tarefa
   * @returns Tarefa encontrada ou null
   */
  getTaskById(id: string): Task | null {
    const task = this.tasks.find(t => t.id === id);
    return task || null;
  }

  /**
   * Atualiza uma tarefa existente
   * @param id ID da tarefa
   * @param updates Dados para atualização
   * @returns Tarefa atualizada ou null se não encontrada
   */
  updateTask(id: string, updates: UpdateTaskDTO): Task | null {
    const taskIndex = this.tasks.findIndex(t => t.id === id);
    
    if (taskIndex === -1) {
      return null;
    }

    const task = this.tasks[taskIndex];

    if (updates.title !== undefined) {
      if (!updates.title || updates.title.trim().length === 0) {
        throw new Error('O título da tarefa não pode ser vazio');
      }
      if (updates.title.length > 100) {
        throw new Error('O título da tarefa não pode ter mais de 100 caracteres');
      }
      task.title = updates.title.trim();
    }

    if (updates.description !== undefined) {
      task.description = updates.description;
    }

    if (updates.status !== undefined) {
      task.status = updates.status;
    }

    if (updates.priority !== undefined) {
      task.priority = updates.priority;
    }

    if (updates.dueDate !== undefined) {
      task.dueDate = updates.dueDate;
    }

    task.updatedAt = new Date();
    this.tasks[taskIndex] = task;

    return task;
  }

  /**
   * Remove uma tarefa
   * @param id ID da tarefa
   * @returns true se removida com sucesso, false caso contrário
   */
  deleteTask(id: string): boolean {
    const taskIndex = this.tasks.findIndex(t => t.id === id);
    
    if (taskIndex === -1) {
      return false;
    }

    this.tasks.splice(taskIndex, 1);
    return true;
  }

  /**
   * Conta o total de tarefas
   * @returns Número total de tarefas
   */
  getTaskCount(): number {
    return this.tasks.length;
  }
}

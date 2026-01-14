/**
 * Modelo de Tarefa
 * Representa uma tarefa no sistema de gerenciamento
 */
export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
  updatedAt: Date;
  dueDate?: Date;
}

/**
 * DTO para criação de tarefa
 */
export interface CreateTaskDTO {
  title: string;
  description: string;
  priority?: 'low' | 'medium' | 'high';
  dueDate?: Date;
}

/**
 * DTO para atualização de tarefa
 */
export interface UpdateTaskDTO {
  title?: string;
  description?: string;
  status?: 'pending' | 'in-progress' | 'completed';
  priority?: 'low' | 'medium' | 'high';
  dueDate?: Date;
}

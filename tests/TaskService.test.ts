import { TaskService } from '../src/services/TaskService';
import { CreateTaskDTO, UpdateTaskDTO } from '../src/models/Task';

describe('TaskService', () => {
  let taskService: TaskService;

  beforeEach(() => {
    taskService = new TaskService();
  });

  describe('createTask', () => {
    it('deve criar uma tarefa com sucesso', () => {
      const taskData: CreateTaskDTO = {
        title: 'Nova Tarefa',
        description: 'Descrição da tarefa',
        priority: 'high'
      };

      const task = taskService.createTask(taskData);

      expect(task).toBeDefined();
      expect(task.id).toBeDefined();
      expect(task.title).toBe('Nova Tarefa');
      expect(task.description).toBe('Descrição da tarefa');
      expect(task.status).toBe('pending');
      expect(task.priority).toBe('high');
      expect(task.createdAt).toBeInstanceOf(Date);
    });

    it('deve usar prioridade média como padrão quando não informada', () => {
      const taskData: CreateTaskDTO = {
        title: 'Tarefa sem prioridade',
        description: 'Teste'
      };

      const task = taskService.createTask(taskData);

      expect(task.priority).toBe('medium');
    });

    it('deve lançar erro quando título está vazio', () => {
      const taskData: CreateTaskDTO = {
        title: '',
        description: 'Teste'
      };

      expect(() => taskService.createTask(taskData)).toThrow('O título da tarefa é obrigatório');
    });

    it('deve lançar erro quando título tem mais de 100 caracteres', () => {
      const taskData: CreateTaskDTO = {
        title: 'a'.repeat(101),
        description: 'Teste'
      };

      expect(() => taskService.createTask(taskData)).toThrow('O título da tarefa não pode ter mais de 100 caracteres');
    });

    it('deve remover espaços em branco do título', () => {
      const taskData: CreateTaskDTO = {
        title: '  Tarefa com espaços  ',
        description: 'Teste'
      };

      const task = taskService.createTask(taskData);

      expect(task.title).toBe('Tarefa com espaços');
    });
  });

  describe('getAllTasks', () => {
    it('deve retornar lista vazia quando não há tarefas', () => {
      const tasks = taskService.getAllTasks();
      expect(tasks).toEqual([]);
    });

    it('deve retornar todas as tarefas criadas', () => {
      taskService.createTask({ title: 'Tarefa 1', description: 'Desc 1' });
      taskService.createTask({ title: 'Tarefa 2', description: 'Desc 2' });

      const tasks = taskService.getAllTasks();
      expect(tasks.length).toBe(2);
    });

    it('deve filtrar tarefas por status', () => {
      const task1 = taskService.createTask({ title: 'Tarefa 1', description: 'Desc 1' });
      const task2 = taskService.createTask({ title: 'Tarefa 2', description: 'Desc 2' });
      
      taskService.updateTask(task1.id, { status: 'completed' });

      const pendingTasks = taskService.getAllTasks('pending');
      const completedTasks = taskService.getAllTasks('completed');

      expect(pendingTasks.length).toBe(1);
      expect(completedTasks.length).toBe(1);
      expect(completedTasks[0].id).toBe(task1.id);
    });
  });

  describe('getTaskById', () => {
    it('deve retornar tarefa quando encontrada', () => {
      const createdTask = taskService.createTask({
        title: 'Tarefa Teste',
        description: 'Descrição'
      });

      const task = taskService.getTaskById(createdTask.id);

      expect(task).toBeDefined();
      expect(task?.id).toBe(createdTask.id);
      expect(task?.title).toBe('Tarefa Teste');
    });

    it('deve retornar null quando tarefa não existe', () => {
      const task = taskService.getTaskById('task-999');
      expect(task).toBeNull();
    });
  });

  describe('updateTask', () => {
    it('deve atualizar tarefa com sucesso', () => {
      const task = taskService.createTask({
        title: 'Tarefa Original',
        description: 'Descrição original'
      });

      const updates: UpdateTaskDTO = {
        title: 'Tarefa Atualizada',
        status: 'in-progress',
        priority: 'high'
      };

      const updatedTask = taskService.updateTask(task.id, updates);

      expect(updatedTask).toBeDefined();
      expect(updatedTask?.title).toBe('Tarefa Atualizada');
      expect(updatedTask?.status).toBe('in-progress');
      expect(updatedTask?.priority).toBe('high');
      expect(updatedTask?.updatedAt.getTime()).toBeGreaterThan(task.updatedAt.getTime());
    });

    it('deve retornar null quando tarefa não existe', () => {
      const updates: UpdateTaskDTO = {
        title: 'Tarefa Inexistente'
      };

      const result = taskService.updateTask('task-999', updates);
      expect(result).toBeNull();
    });

    it('deve lançar erro ao atualizar título para vazio', () => {
      const task = taskService.createTask({
        title: 'Tarefa Original',
        description: 'Descrição'
      });

      expect(() => {
        taskService.updateTask(task.id, { title: '' });
      }).toThrow('O título da tarefa não pode ser vazio');
    });

    it('deve atualizar apenas campos informados', () => {
      const task = taskService.createTask({
        title: 'Tarefa Original',
        description: 'Descrição original',
        priority: 'low'
      });

      const updatedTask = taskService.updateTask(task.id, {
        status: 'completed'
      });

      expect(updatedTask?.title).toBe('Tarefa Original');
      expect(updatedTask?.description).toBe('Descrição original');
      expect(updatedTask?.priority).toBe('low');
      expect(updatedTask?.status).toBe('completed');
    });
  });

  describe('deleteTask', () => {
    it('deve remover tarefa com sucesso', () => {
      const task = taskService.createTask({
        title: 'Tarefa para deletar',
        description: 'Teste'
      });

      const deleted = taskService.deleteTask(task.id);
      expect(deleted).toBe(true);

      const foundTask = taskService.getTaskById(task.id);
      expect(foundTask).toBeNull();
    });

    it('deve retornar false quando tarefa não existe', () => {
      const deleted = taskService.deleteTask('task-999');
      expect(deleted).toBe(false);
    });
  });

  describe('getTaskCount', () => {
    it('deve retornar zero quando não há tarefas', () => {
      expect(taskService.getTaskCount()).toBe(0);
    });

    it('deve retornar número correto de tarefas', () => {
      taskService.createTask({ title: 'Tarefa 1', description: 'Desc 1' });
      taskService.createTask({ title: 'Tarefa 2', description: 'Desc 2' });
      taskService.createTask({ title: 'Tarefa 3', description: 'Desc 3' });

      expect(taskService.getTaskCount()).toBe(3);
    });
  });
});

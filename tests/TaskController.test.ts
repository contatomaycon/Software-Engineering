import { TaskController } from '../src/controllers/TaskController';
import { TaskService } from '../src/services/TaskService';
import { CreateTaskDTO, UpdateTaskDTO } from '../src/models/Task';

describe('TaskController', () => {
  let taskController: TaskController;
  let taskService: TaskService;

  beforeEach(() => {
    taskService = new TaskService();
    taskController = new TaskController(taskService);
  });

  describe('createTask', () => {
    it('deve criar tarefa com sucesso', () => {
      const req = {
        body: {
          title: 'Nova Tarefa',
          description: 'Descrição',
          priority: 'high' as const
        } as CreateTaskDTO
      };

      const response = taskController.createTask(req);

      expect(response.statusCode).toBe(201);
      expect(response.body.message).toBe('Tarefa criada com sucesso');
      expect(response.body.task).toBeDefined();
      expect(response.body.task.title).toBe('Nova Tarefa');
    });

    it('deve retornar erro 400 quando título está vazio', () => {
      const req = {
        body: {
          title: '',
          description: 'Teste'
        } as CreateTaskDTO
      };

      const response = taskController.createTask(req);

      expect(response.statusCode).toBe(400);
      expect(response.body.error).toBeDefined();
    });
  });

  describe('getAllTasks', () => {
    it('deve retornar lista vazia quando não há tarefas', () => {
      const req = { query: {} };

      const response = taskController.getAllTasks(req);

      expect(response.statusCode).toBe(200);
      expect(response.body.tasks).toEqual([]);
      expect(response.body.count).toBe(0);
    });

    it('deve retornar todas as tarefas', () => {
      taskService.createTask({ title: 'Tarefa 1', description: 'Desc 1' });
      taskService.createTask({ title: 'Tarefa 2', description: 'Desc 2' });

      const req = { query: {} };
      const response = taskController.getAllTasks(req);

      expect(response.statusCode).toBe(200);
      expect(response.body.tasks.length).toBe(2);
      expect(response.body.count).toBe(2);
    });

    it('deve filtrar tarefas por status', () => {
      const task1 = taskService.createTask({ title: 'Tarefa 1', description: 'Desc 1' });
      taskService.updateTask(task1.id, { status: 'completed' });
      taskService.createTask({ title: 'Tarefa 2', description: 'Desc 2' });

      const req = { query: { status: 'completed' } };
      const response = taskController.getAllTasks(req);

      expect(response.statusCode).toBe(200);
      expect(response.body.tasks.length).toBe(1);
      expect(response.body.tasks[0].status).toBe('completed');
    });
  });

  describe('getTaskById', () => {
    it('deve retornar tarefa quando encontrada', () => {
      const task = taskService.createTask({
        title: 'Tarefa Teste',
        description: 'Descrição'
      });

      const req = { params: { id: task.id } };
      const response = taskController.getTaskById(req);

      expect(response.statusCode).toBe(200);
      expect(response.body.task).toBeDefined();
      expect(response.body.task.id).toBe(task.id);
    });

    it('deve retornar 404 quando tarefa não existe', () => {
      const req = { params: { id: 'task-999' } };
      const response = taskController.getTaskById(req);

      expect(response.statusCode).toBe(404);
      expect(response.body.error).toBe('Tarefa não encontrada');
    });
  });

  describe('updateTask', () => {
    it('deve atualizar tarefa com sucesso', () => {
      const task = taskService.createTask({
        title: 'Tarefa Original',
        description: 'Descrição'
      });

      const req = {
        params: { id: task.id },
        body: {
          title: 'Tarefa Atualizada',
          status: 'completed' as const
        } as UpdateTaskDTO
      };

      const response = taskController.updateTask(req);

      expect(response.statusCode).toBe(200);
      expect(response.body.message).toBe('Tarefa atualizada com sucesso');
      expect(response.body.task.title).toBe('Tarefa Atualizada');
      expect(response.body.task.status).toBe('completed');
    });

    it('deve retornar 404 quando tarefa não existe', () => {
      const req = {
        params: { id: 'task-999' },
        body: { title: 'Nova Tarefa' } as UpdateTaskDTO
      };

      const response = taskController.updateTask(req);

      expect(response.statusCode).toBe(404);
      expect(response.body.error).toBe('Tarefa não encontrada');
    });

    it('deve retornar 400 quando validação falha', () => {
      const task = taskService.createTask({
        title: 'Tarefa Original',
        description: 'Descrição'
      });

      const req = {
        params: { id: task.id },
        body: { title: '' } as UpdateTaskDTO
      };

      const response = taskController.updateTask(req);

      expect(response.statusCode).toBe(400);
      expect(response.body.error).toBeDefined();
    });
  });

  describe('deleteTask', () => {
    it('deve remover tarefa com sucesso', () => {
      const task = taskService.createTask({
        title: 'Tarefa para deletar',
        description: 'Teste'
      });

      const req = { params: { id: task.id } };
      const response = taskController.deleteTask(req);

      expect(response.statusCode).toBe(200);
      expect(response.body.message).toBe('Tarefa removida com sucesso');
    });

    it('deve retornar 404 quando tarefa não existe', () => {
      const req = { params: { id: 'task-999' } };
      const response = taskController.deleteTask(req);

      expect(response.statusCode).toBe(404);
      expect(response.body.error).toBe('Tarefa não encontrada');
    });
  });
});

import express from 'express';
import { setupTaskRoutes } from './routes/taskRoutes';

/**
 * Aplicação principal do sistema de gerenciamento de tarefas
 */
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsing JSON
app.use(express.json());

// Middleware para logging de requisições
app.use((req, _res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Rota de saúde da aplicação
app.get('/health', (_req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Sistema de Gerenciamento de Tarefas está funcionando',
    timestamp: new Date().toISOString()
  });
});

// Configurar rotas de tarefas
setupTaskRoutes(app);

// Middleware de tratamento de erros
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('Erro:', err);
  res.status(500).json({ 
    error: 'Erro interno do servidor',
    message: err.message 
  });
});

// Iniciar servidor apenas se não estiver em modo de teste
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
    console.log(`📋 Sistema de Gerenciamento de Tarefas disponível em http://localhost:${PORT}`);
    console.log(`💚 Health check: http://localhost:${PORT}/health`);
  });
}

export default app;

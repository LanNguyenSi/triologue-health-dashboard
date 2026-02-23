import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import healthRouter from './routes/health';
import metricsRouter from './routes/metrics';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// API Routes
app.use('/api/health', healthRouter);
app.use('/api/metrics', metricsRouter);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    name: 'Triologue Health Dashboard API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      metrics: '/api/metrics',
    },
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    path: req.path,
  });
});

// Error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🌋 Triologue Health Dashboard API running on http://localhost:${PORT}`);
  console.log(`📊 Health checks: http://localhost:${PORT}/api/health`);
  console.log(`📈 Metrics: http://localhost:${PORT}/api/metrics`);
});

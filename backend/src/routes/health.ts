import { Router } from 'express';
import {
  getHealthStatus,
  checkTriologueAPI,
  checkPostgreSQL,
  checkRedis,
  checkGateway,
} from '../services/healthService';

const router = Router();

// GET /api/health - Overall system health
router.get('/', async (req, res) => {
  try {
    const health = await getHealthStatus();
    res.json(health);
  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// GET /api/health/services/triologue
router.get('/services/triologue', async (req, res) => {
  try {
    const health = await checkTriologueAPI();
    res.json(health);
  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// GET /api/health/services/postgres
router.get('/services/postgres', async (req, res) => {
  try {
    const health = await checkPostgreSQL();
    res.json(health);
  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// GET /api/health/services/redis
router.get('/services/redis', async (req, res) => {
  try {
    const health = await checkRedis();
    res.json(health);
  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// GET /api/health/services/gateway
router.get('/services/gateway', async (req, res) => {
  try {
    const health = await checkGateway();
    res.json(health);
  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

export default router;

import { Router } from 'express';
import {
  getSystemMetrics,
  getDockerMetrics,
  getTriologueMetrics,
} from '../services/metricsService';

const router = Router();

// GET /api/metrics/system
router.get('/system', (req, res) => {
  try {
    const metrics = getSystemMetrics();
    res.json(metrics);
  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// GET /api/metrics/docker
router.get('/docker', async (req, res) => {
  try {
    const metrics = await getDockerMetrics();
    res.json(metrics);
  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// GET /api/metrics/triologue
router.get('/triologue', async (req, res) => {
  try {
    const metrics = await getTriologueMetrics();
    res.json(metrics);
  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// GET /api/metrics - All metrics combined
router.get('/', async (req, res) => {
  try {
    const [system, docker, triologue] = await Promise.all([
      Promise.resolve(getSystemMetrics()),
      getDockerMetrics(),
      getTriologueMetrics(),
    ]);

    res.json({
      timestamp: new Date().toISOString(),
      system,
      docker,
      triologue,
    });
  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

export default router;

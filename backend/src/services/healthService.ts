import axios from 'axios';

const TRIOLOGUE_API = process.env.TRIOLOGUE_API_URL || 'http://localhost:4001';

export interface ServiceHealth {
  name: string;
  status: 'healthy' | 'unhealthy' | 'unknown';
  message: string;
  responseTime: number;
}

export interface OverallHealth {
  timestamp: string;
  services: ServiceHealth[];
  overallStatus: 'healthy' | 'degraded' | 'unhealthy';
}

async function checkService(
  name: string,
  url: string,
  timeout = 5000
): Promise<ServiceHealth> {
  const startTime = Date.now();
  
  try {
    const response = await axios.get(url, { timeout });
    const responseTime = Date.now() - startTime;
    
    return {
      name,
      status: response.status === 200 ? 'healthy' : 'unhealthy',
      message: `Status ${response.status}`,
      responseTime,
    };
  } catch (error) {
    const responseTime = Date.now() - startTime;
    
    return {
      name,
      status: 'unhealthy',
      message: error instanceof Error ? error.message : 'Unknown error',
      responseTime,
    };
  }
}

export async function getHealthStatus(): Promise<OverallHealth> {
  const services = await Promise.all([
    checkService('Triologue API', `${TRIOLOGUE_API}/health`),
    checkService('Triologue WebSocket', `${TRIOLOGUE_API.replace('http', 'ws')}/socket.io`),
  ]);

  const healthyCount = services.filter(s => s.status === 'healthy').length;
  const overallStatus =
    healthyCount === services.length
      ? 'healthy'
      : healthyCount > 0
      ? 'degraded'
      : 'unhealthy';

  return {
    timestamp: new Date().toISOString(),
    services,
    overallStatus,
  };
}

export async function checkTriologueAPI(): Promise<ServiceHealth> {
  return checkService('Triologue API', `${TRIOLOGUE_API}/health`);
}

export async function checkPostgreSQL(): Promise<ServiceHealth> {
  return {
    name: 'PostgreSQL',
    status: 'unknown',
    message: 'Not implemented yet',
    responseTime: 0,
  };
}

export async function checkRedis(): Promise<ServiceHealth> {
  return {
    name: 'Redis',
    status: 'unknown',
    message: 'Not implemented yet',
    responseTime: 0,
  };
}

export async function checkGateway(): Promise<ServiceHealth> {
  return checkService('Agent Gateway', 'http://localhost:9500/health');
}

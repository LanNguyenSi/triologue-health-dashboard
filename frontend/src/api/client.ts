import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

const client = axios.create({
  baseURL: API_URL,
  timeout: 5000,
});

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

export interface SystemMetrics {
  cpu: {
    cores: number;
    loadAverage: number[];
    percentUsed: number;
  };
  memory: {
    total: number;
    used: number;
    free: number;
    percentUsed: number;
  };
  uptime: number;
}

export async function getHealth(): Promise<OverallHealth> {
  const { data } = await client.get('/api/health');
  return data;
}

export async function getMetrics(): Promise<any> {
  const { data } = await client.get('/api/metrics');
  return data;
}

export async function getSystemMetrics(): Promise<SystemMetrics> {
  const { data } = await client.get('/api/metrics/system');
  return data;
}

export default client;

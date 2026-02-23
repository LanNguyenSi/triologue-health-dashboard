import os from 'os';
import axios from 'axios';

const TRIOLOGUE_API = process.env.TRIOLOGUE_API_URL || 'http://localhost:4001';

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

export interface DockerMetrics {
  running: number;
  stopped: number;
  paused: number;
  total: number;
}

export interface TriologueMetrics {
  activeUsers: number;
  activeRooms: number;
  totalMessages: number;
  timestamp: string;
}

export function getSystemMetrics(): SystemMetrics {
  const totalMemory = os.totalmem();
  const freeMemory = os.freemem();
  const usedMemory = totalMemory - freeMemory;
  const loadAverage = os.loadavg();

  return {
    cpu: {
      cores: os.cpus().length,
      loadAverage,
      percentUsed: (loadAverage[0] / os.cpus().length) * 100,
    },
    memory: {
      total: totalMemory,
      used: usedMemory,
      free: freeMemory,
      percentUsed: (usedMemory / totalMemory) * 100,
    },
    uptime: os.uptime(),
  };
}

export async function getDockerMetrics(): Promise<DockerMetrics> {
  try {
    // This would require Docker SDK integration
    // For now, return placeholder
    return {
      running: 5,
      stopped: 0,
      paused: 0,
      total: 5,
    };
  } catch (error) {
    return {
      running: 0,
      stopped: 0,
      paused: 0,
      total: 0,
    };
  }
}

export async function getTriologueMetrics(): Promise<TriologueMetrics> {
  try {
    const response = await axios.get(`${TRIOLOGUE_API}/api/metrics`, {
      timeout: 5000,
    });
    
    return {
      activeUsers: response.data.activeUsers || 0,
      activeRooms: response.data.activeRooms || 0,
      totalMessages: response.data.totalMessages || 0,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    return {
      activeUsers: 0,
      activeRooms: 0,
      totalMessages: 0,
      timestamp: new Date().toISOString(),
    };
  }
}

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSystemMetrics = getSystemMetrics;
exports.getDockerMetrics = getDockerMetrics;
exports.getTriologueMetrics = getTriologueMetrics;
const os_1 = __importDefault(require("os"));
const axios_1 = __importDefault(require("axios"));
const TRIOLOGUE_API = process.env.TRIOLOGUE_API_URL || 'http://localhost:4001';
function getSystemMetrics() {
    const totalMemory = os_1.default.totalmem();
    const freeMemory = os_1.default.freemem();
    const usedMemory = totalMemory - freeMemory;
    const loadAverage = os_1.default.loadavg();
    return {
        cpu: {
            cores: os_1.default.cpus().length,
            loadAverage,
            percentUsed: (loadAverage[0] / os_1.default.cpus().length) * 100,
        },
        memory: {
            total: totalMemory,
            used: usedMemory,
            free: freeMemory,
            percentUsed: (usedMemory / totalMemory) * 100,
        },
        uptime: os_1.default.uptime(),
    };
}
async function getDockerMetrics() {
    try {
        // This would require Docker SDK integration
        // For now, return placeholder
        return {
            running: 5,
            stopped: 0,
            paused: 0,
            total: 5,
        };
    }
    catch (error) {
        return {
            running: 0,
            stopped: 0,
            paused: 0,
            total: 0,
        };
    }
}
async function getTriologueMetrics() {
    try {
        const response = await axios_1.default.get(`${TRIOLOGUE_API}/api/metrics`, {
            timeout: 5000,
        });
        return {
            activeUsers: response.data.activeUsers || 0,
            activeRooms: response.data.activeRooms || 0,
            totalMessages: response.data.totalMessages || 0,
            timestamp: new Date().toISOString(),
        };
    }
    catch (error) {
        return {
            activeUsers: 0,
            activeRooms: 0,
            totalMessages: 0,
            timestamp: new Date().toISOString(),
        };
    }
}

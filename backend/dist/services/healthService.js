"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHealthStatus = getHealthStatus;
exports.checkTriologueAPI = checkTriologueAPI;
exports.checkPostgreSQL = checkPostgreSQL;
exports.checkRedis = checkRedis;
exports.checkGateway = checkGateway;
const axios_1 = __importDefault(require("axios"));
const TRIOLOGUE_API = process.env.TRIOLOGUE_API_URL || 'http://localhost:4001';
async function checkService(name, url, timeout = 5000) {
    const startTime = Date.now();
    try {
        const response = await axios_1.default.get(url, { timeout });
        const responseTime = Date.now() - startTime;
        return {
            name,
            status: response.status === 200 ? 'healthy' : 'unhealthy',
            message: `Status ${response.status}`,
            responseTime,
        };
    }
    catch (error) {
        const responseTime = Date.now() - startTime;
        return {
            name,
            status: 'unhealthy',
            message: error instanceof Error ? error.message : 'Unknown error',
            responseTime,
        };
    }
}
async function getHealthStatus() {
    const services = await Promise.all([
        checkService('Triologue API', `${TRIOLOGUE_API}/health`),
        checkService('Triologue WebSocket', `${TRIOLOGUE_API.replace('http', 'ws')}/socket.io`),
    ]);
    const healthyCount = services.filter(s => s.status === 'healthy').length;
    const overallStatus = healthyCount === services.length
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
async function checkTriologueAPI() {
    return checkService('Triologue API', `${TRIOLOGUE_API}/health`);
}
async function checkPostgreSQL() {
    return {
        name: 'PostgreSQL',
        status: 'unknown',
        message: 'Not implemented yet',
        responseTime: 0,
    };
}
async function checkRedis() {
    return {
        name: 'Redis',
        status: 'unknown',
        message: 'Not implemented yet',
        responseTime: 0,
    };
}
async function checkGateway() {
    return checkService('Agent Gateway', 'http://localhost:9500/health');
}

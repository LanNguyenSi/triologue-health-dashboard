"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const healthService_1 = require("../services/healthService");
const router = (0, express_1.Router)();
// GET /api/health - Overall system health
router.get('/', async (req, res) => {
    try {
        const health = await (0, healthService_1.getHealthStatus)();
        res.json(health);
    }
    catch (error) {
        res.status(500).json({
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
});
// GET /api/health/services/triologue
router.get('/services/triologue', async (req, res) => {
    try {
        const health = await (0, healthService_1.checkTriologueAPI)();
        res.json(health);
    }
    catch (error) {
        res.status(500).json({
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
});
// GET /api/health/services/postgres
router.get('/services/postgres', async (req, res) => {
    try {
        const health = await (0, healthService_1.checkPostgreSQL)();
        res.json(health);
    }
    catch (error) {
        res.status(500).json({
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
});
// GET /api/health/services/redis
router.get('/services/redis', async (req, res) => {
    try {
        const health = await (0, healthService_1.checkRedis)();
        res.json(health);
    }
    catch (error) {
        res.status(500).json({
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
});
// GET /api/health/services/gateway
router.get('/services/gateway', async (req, res) => {
    try {
        const health = await (0, healthService_1.checkGateway)();
        res.json(health);
    }
    catch (error) {
        res.status(500).json({
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
});
exports.default = router;

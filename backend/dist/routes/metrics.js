"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const metricsService_1 = require("../services/metricsService");
const router = (0, express_1.Router)();
// GET /api/metrics/system
router.get('/system', (req, res) => {
    try {
        const metrics = (0, metricsService_1.getSystemMetrics)();
        res.json(metrics);
    }
    catch (error) {
        res.status(500).json({
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
});
// GET /api/metrics/docker
router.get('/docker', async (req, res) => {
    try {
        const metrics = await (0, metricsService_1.getDockerMetrics)();
        res.json(metrics);
    }
    catch (error) {
        res.status(500).json({
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
});
// GET /api/metrics/triologue
router.get('/triologue', async (req, res) => {
    try {
        const metrics = await (0, metricsService_1.getTriologueMetrics)();
        res.json(metrics);
    }
    catch (error) {
        res.status(500).json({
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
});
// GET /api/metrics - All metrics combined
router.get('/', async (req, res) => {
    try {
        const [system, docker, triologue] = await Promise.all([
            Promise.resolve((0, metricsService_1.getSystemMetrics)()),
            (0, metricsService_1.getDockerMetrics)(),
            (0, metricsService_1.getTriologueMetrics)(),
        ]);
        res.json({
            timestamp: new Date().toISOString(),
            system,
            docker,
            triologue,
        });
    }
    catch (error) {
        res.status(500).json({
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
});
exports.default = router;

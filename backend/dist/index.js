"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const dotenv_1 = __importDefault(require("dotenv"));
const health_1 = __importDefault(require("./routes/health"));
const metrics_1 = __importDefault(require("./routes/metrics"));
// Load environment variables
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8080;
// Middleware
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
    });
});
// API Routes
app.use('/api/health', health_1.default);
app.use('/api/metrics', metrics_1.default);
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
app.use((err, req, res, next) => {
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

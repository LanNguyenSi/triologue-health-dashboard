import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { StatusCard } from './components/StatusCard';
import { getHealth, getMetrics } from './api/client';
export default function App() {
    const [health, setHealth] = useState(null);
    const [metrics, setMetrics] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const fetchData = async () => {
        try {
            setError(null);
            const [healthData, metricsData] = await Promise.all([
                getHealth(),
                getMetrics(),
            ]);
            setHealth(healthData);
            setMetrics(metricsData);
        }
        catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch data');
        }
        finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 10000); // Refresh every 10 seconds
        return () => clearInterval(interval);
    }, []);
    return (_jsxs("div", { className: "min-h-screen bg-slate-950 text-white", children: [_jsx(Header, { title: "Triologue Health Dashboard", overallStatus: health?.overallStatus }), _jsxs("main", { className: "max-w-7xl mx-auto px-6 py-8", children: [error && (_jsx("div", { className: "bg-red-900 border border-red-500 rounded-lg p-4 mb-6", children: _jsxs("p", { className: "text-red-100", children: ["Error: ", error] }) })), loading ? (_jsx("div", { className: "text-center py-12", children: _jsx("p", { className: "text-slate-400", children: "Loading..." }) })) : (_jsxs(_Fragment, { children: [_jsxs("section", { className: "mb-8", children: [_jsx("h2", { className: "text-2xl font-bold mb-4", children: "Services Status" }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: health?.services.map((service) => (_jsx(StatusCard, { title: service.name, status: service.status, message: service.message, responseTime: service.responseTime }, service.name))) })] }), metrics?.system && (_jsxs("section", { className: "mb-8", children: [_jsx("h2", { className: "text-2xl font-bold mb-4", children: "System Metrics" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-900 rounded-lg p-6 border border-slate-700", children: [_jsxs("div", { children: [_jsx("p", { className: "text-slate-400 mb-2", children: "CPU Usage" }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsxs("div", { className: "text-3xl font-bold text-blue-400", children: [metrics.system.cpu.percentUsed.toFixed(1), "%"] }), _jsxs("div", { className: "flex-1", children: [_jsx("div", { className: "w-full bg-slate-800 rounded-full h-2", children: _jsx("div", { className: "bg-blue-500 h-2 rounded-full", style: {
                                                                                width: `${Math.min(metrics.system.cpu.percentUsed, 100)}%`,
                                                                            } }) }), _jsxs("p", { className: "text-xs text-slate-400 mt-1", children: [metrics.system.cpu.cores, " cores"] })] })] })] }), _jsxs("div", { children: [_jsx("p", { className: "text-slate-400 mb-2", children: "Memory Usage" }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsxs("div", { className: "text-3xl font-bold text-purple-400", children: [metrics.system.memory.percentUsed.toFixed(1), "%"] }), _jsxs("div", { className: "flex-1", children: [_jsx("div", { className: "w-full bg-slate-800 rounded-full h-2", children: _jsx("div", { className: "bg-purple-500 h-2 rounded-full", style: {
                                                                                width: `${Math.min(metrics.system.memory.percentUsed, 100)}%`,
                                                                            } }) }), _jsxs("p", { className: "text-xs text-slate-400 mt-1", children: [(metrics.system.memory.used / 1024 / 1024 / 1024).toFixed(1), "GB /", ' ', (metrics.system.memory.total / 1024 / 1024 / 1024).toFixed(1), "GB"] })] })] })] })] })] })), _jsx("div", { className: "text-center text-slate-500 text-sm", children: _jsxs("p", { children: ["Last updated: ", health?.timestamp ? new Date(health.timestamp).toLocaleTimeString() : 'N/A'] }) })] }))] })] }));
}

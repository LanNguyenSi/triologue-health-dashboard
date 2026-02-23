import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
const statusColors = {
    healthy: 'text-green-400',
    degraded: 'text-yellow-400',
    unhealthy: 'text-red-400',
};
export const Header = ({ title, overallStatus }) => {
    const statusColor = overallStatus
        ? statusColors[overallStatus]
        : 'text-gray-400';
    return (_jsx("header", { className: "bg-slate-950 border-b border-slate-700 px-6 py-4", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsxs("h1", { className: "text-3xl font-bold text-white flex items-center gap-2", children: ["\uD83E\uDDCA ", title] }), _jsx("p", { className: "text-sm text-slate-400 mt-1", children: "Real-time monitoring for Triologue AI platform" })] }), overallStatus && (_jsx("div", { className: `text-2xl ${statusColor} font-bold`, children: overallStatus.toUpperCase() }))] }) }));
};

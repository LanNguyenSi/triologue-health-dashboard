import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const statusColors = {
    healthy: 'bg-green-900 border-green-500 text-green-100',
    unhealthy: 'bg-red-900 border-red-500 text-red-100',
    degraded: 'bg-yellow-900 border-yellow-500 text-yellow-100',
    unknown: 'bg-gray-900 border-gray-500 text-gray-100',
};
const statusIcons = {
    healthy: '🟢',
    unhealthy: '🔴',
    degraded: '🟡',
    unknown: '⚪',
};
export const StatusCard = ({ title, status, message, responseTime, }) => {
    return (_jsx("div", { className: `border rounded-lg p-4 ${statusColors[status]}`, children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "font-bold text-lg", children: title }), _jsx("p", { className: "text-sm opacity-75", children: message }), responseTime && (_jsxs("p", { className: "text-xs opacity-50 mt-1", children: ["Response: ", responseTime, "ms"] }))] }), _jsx("div", { className: "text-4xl", children: statusIcons[status] })] }) }));
};

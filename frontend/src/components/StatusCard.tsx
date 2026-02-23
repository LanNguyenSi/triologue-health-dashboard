import React from 'react';

interface StatusCardProps {
  title: string;
  status: 'healthy' | 'unhealthy' | 'degraded' | 'unknown';
  message: string;
  responseTime?: number;
}

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

export const StatusCard: React.FC<StatusCardProps> = ({
  title,
  status,
  message,
  responseTime,
}) => {
  return (
    <div className={`border rounded-lg p-4 ${statusColors[status]}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="font-bold text-lg">{title}</p>
          <p className="text-sm opacity-75">{message}</p>
          {responseTime && (
            <p className="text-xs opacity-50 mt-1">
              Response: {responseTime}ms
            </p>
          )}
        </div>
        <div className="text-4xl">{statusIcons[status]}</div>
      </div>
    </div>
  );
};

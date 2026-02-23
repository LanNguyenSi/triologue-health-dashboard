import React from 'react';

interface HeaderProps {
  title: string;
  overallStatus?: 'healthy' | 'degraded' | 'unhealthy';
}

const statusColors = {
  healthy: 'text-green-400',
  degraded: 'text-yellow-400',
  unhealthy: 'text-red-400',
};

export const Header: React.FC<HeaderProps> = ({ title, overallStatus }) => {
  const statusColor = overallStatus
    ? statusColors[overallStatus]
    : 'text-gray-400';

  return (
    <header className="bg-slate-950 border-b border-slate-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-2">
            🧊 {title}
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Real-time monitoring for Triologue AI platform
          </p>
        </div>
        {overallStatus && (
          <div className={`text-2xl ${statusColor} font-bold`}>
            {overallStatus.toUpperCase()}
          </div>
        )}
      </div>
    </header>
  );
};

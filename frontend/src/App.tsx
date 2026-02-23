import { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { StatusCard } from './components/StatusCard';
import { getHealth, getMetrics } from './api/client';
import type { OverallHealth } from './api/client';

export default function App() {
  const [health, setHealth] = useState<OverallHealth | null>(null);
  const [metrics, setMetrics] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setError(null);
      const [healthData, metricsData] = await Promise.all([
        getHealth(),
        getMetrics(),
      ]);
      setHealth(healthData);
      setMetrics(metricsData);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to fetch data'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 10000); // Refresh every 10 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Header
        title="Triologue Health Dashboard"
        overallStatus={health?.overallStatus}
      />

      <main className="max-w-7xl mx-auto px-6 py-8">
        {error && (
          <div className="bg-red-900 border border-red-500 rounded-lg p-4 mb-6">
            <p className="text-red-100">Error: {error}</p>
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">
            <p className="text-slate-400">Loading...</p>
          </div>
        ) : (
          <>
            {/* Services Status Section */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Services Status</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {health?.services.map((service) => (
                  <StatusCard
                    key={service.name}
                    title={service.name}
                    status={service.status}
                    message={service.message}
                    responseTime={service.responseTime}
                  />
                ))}
              </div>
            </section>

            {/* System Metrics Section */}
            {metrics?.system && (
              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">System Metrics</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-900 rounded-lg p-6 border border-slate-700">
                  {/* CPU */}
                  <div>
                    <p className="text-slate-400 mb-2">CPU Usage</p>
                    <div className="flex items-center gap-4">
                      <div className="text-3xl font-bold text-blue-400">
                        {metrics.system.cpu.percentUsed.toFixed(1)}%
                      </div>
                      <div className="flex-1">
                        <div className="w-full bg-slate-800 rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full"
                            style={{
                              width: `${Math.min(metrics.system.cpu.percentUsed, 100)}%`,
                            }}
                          />
                        </div>
                        <p className="text-xs text-slate-400 mt-1">
                          {metrics.system.cpu.cores} cores
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Memory */}
                  <div>
                    <p className="text-slate-400 mb-2">Memory Usage</p>
                    <div className="flex items-center gap-4">
                      <div className="text-3xl font-bold text-purple-400">
                        {metrics.system.memory.percentUsed.toFixed(1)}%
                      </div>
                      <div className="flex-1">
                        <div className="w-full bg-slate-800 rounded-full h-2">
                          <div
                            className="bg-purple-500 h-2 rounded-full"
                            style={{
                              width: `${Math.min(metrics.system.memory.percentUsed, 100)}%`,
                            }}
                          />
                        </div>
                        <p className="text-xs text-slate-400 mt-1">
                          {(metrics.system.memory.used / 1024 / 1024 / 1024).toFixed(1)}GB /{' '}
                          {(metrics.system.memory.total / 1024 / 1024 / 1024).toFixed(1)}GB
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Last Updated */}
            <div className="text-center text-slate-500 text-sm">
              <p>
                Last updated: {health?.timestamp ? new Date(health.timestamp).toLocaleTimeString() : 'N/A'}
              </p>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

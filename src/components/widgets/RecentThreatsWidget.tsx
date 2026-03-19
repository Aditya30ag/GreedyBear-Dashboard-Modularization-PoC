import React from 'react';

const mockThreats = [
  { id: 1, ip: '192.168.1.105', type: 'SSH Brute Force', severity: 'High', time: '2 mins ago' },
  { id: 2, ip: '45.33.12.19', type: 'Log4Shell Attempt', severity: 'Critical', time: '15 mins ago' },
  { id: 3, ip: '203.0.113.88', type: 'Port Scan', severity: 'Low', time: '1 hour ago' },
  { id: 4, ip: '185.15.22.9', type: 'SQL Injection', severity: 'High', time: '3 hours ago' },
  { id: 5, ip: '93.184.216.34', type: 'Telnet Login', severity: 'Medium', time: '4 hours ago' },
];

const severityColors: Record<string, string> = {
  Critical: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
  High: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  Medium: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
  Low: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
};

const RecentThreatsWidget: React.FC = () => {
  return (
    <div className="h-full flex flex-col bg-slate-900 border border-slate-700/50 rounded-xl overflow-hidden">
      <div className="px-4 py-3 border-b border-slate-800 bg-slate-900/50">
        <h3 className="text-slate-300 font-medium text-sm">Recent Threats (IOCs)</h3>
      </div>
      <div className="flex-1 overflow-auto p-0">
        <table className="w-full text-left text-sm text-slate-400">
          <thead className="text-xs text-slate-500 bg-slate-800/30 sticky top-0">
            <tr>
              <th className="px-4 py-2 font-medium">Source IP</th>
              <th className="px-4 py-2 font-medium">Attack Type</th>
              <th className="px-4 py-2 font-medium">Severity</th>
              <th className="px-4 py-2 font-medium text-right">Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50 bg-slate-900">
            {mockThreats.map((threat) => (
              <tr key={threat.id} className="hover:bg-slate-800/30 transition-colors">
                <td className="px-4 py-3 font-mono text-slate-300">{threat.ip}</td>
                <td className="px-4 py-3">{threat.type}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-[10px] font-medium border ${severityColors[threat.severity]}`}>
                    {threat.severity}
                  </span>
                </td>
                <td className="px-4 py-3 text-right text-xs whitespace-nowrap">{threat.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentThreatsWidget;

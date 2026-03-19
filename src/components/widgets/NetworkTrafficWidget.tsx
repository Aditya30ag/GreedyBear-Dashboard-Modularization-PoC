import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { time: '00:00', hits: 4000 },
  { time: '04:00', hits: 3000 },
  { time: '08:00', hits: 2000 },
  { time: '12:00', hits: 2780 },
  { time: '16:00', hits: 1890 },
  { time: '20:00', hits: 2390 },
  { time: '24:00', hits: 3490 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-800 border border-slate-700 p-3 rounded-lg shadow-xl">
        <p className="text-slate-400 text-xs mb-1">{label}</p>
        <p className="text-indigo-400 text-sm font-semibold">{`${payload[0].value} hits`}</p>
      </div>
    );
  }
  return null;
};

const NetworkTrafficWidget: React.FC = () => {
  return (
    <div className="h-full flex flex-col bg-slate-900 border border-slate-700/50 rounded-xl p-4">
      <h3 className="text-slate-300 font-medium text-sm mb-4">Honeypot Network Traffic (24h)</h3>
      <div className="flex-1 w-full min-h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 5, right: 0, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorHits" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#818cf8" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#818cf8" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
            <XAxis 
              dataKey="time" 
              stroke="#64748b" 
              fontSize={12} 
              tickLine={false}
              axisLine={false}
              dy={10}
            />
            <YAxis 
              stroke="#64748b" 
              fontSize={12} 
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value / 1000}k`}
              dx={-10}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area 
              type="monotone" 
              dataKey="hits" 
              stroke="#818cf8" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorHits)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default NetworkTrafficWidget;

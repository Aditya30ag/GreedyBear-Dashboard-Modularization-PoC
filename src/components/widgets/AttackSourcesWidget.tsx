import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const data = [
  { name: 'China', value: 400 },
  { name: 'Russia', value: 300 },
  { name: 'USA', value: 300 },
  { name: 'Brazil', value: 200 },
  { name: 'Other', value: 150 },
];

const COLORS = ['#ef4444', '#f97316', '#3b82f6', '#8b5cf6', '#64748b'];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-800 border border-slate-700 p-2 rounded-lg shadow-xl">
        <p className="text-slate-200 text-sm font-medium">{`${payload[0].name} : ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

const AttackSourcesWidget: React.FC = () => {
  return (
    <div className="h-full flex flex-col bg-slate-900 border border-slate-700/50 rounded-xl pt-4">
      <h3 className="text-slate-300 font-medium text-sm px-4 mb-2">Top Attack Sources</h3>
      <div className="flex-1 w-full relative min-h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              verticalAlign="bottom" 
              height={36} 
              iconType="circle"
              formatter={(value) => <span className="text-slate-400 text-xs">{value}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AttackSourcesWidget;

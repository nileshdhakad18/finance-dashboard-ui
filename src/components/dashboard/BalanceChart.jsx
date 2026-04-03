import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import useStore from '../../store/useStore';

export function BalanceChart() {
  const transactions = useStore((state) => state.transactions);
  const theme = useStore((state) => state.theme);

  const data = useMemo(() => {
    const sorted = [...transactions].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    let currentBalance = 0;
    const dailyBalance = {};

    sorted.forEach(tx => {
      if (tx.type === 'income') {
        currentBalance += tx.amount;
      } else {
        currentBalance -= tx.amount;
      }
      dailyBalance[tx.date] = currentBalance;
    });

    return Object.entries(dailyBalance).map(([date, balance]) => ({
      date: new Date(date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
      balance
    }));
  }, [transactions]);

  const textColor = theme === 'dark' ? '#9ca3af' : '#4b5563';
  const gridColor = theme === 'dark' ? '#374151' : '#e5e7eb';

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Balance Over Time</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
              <XAxis dataKey="date" stroke={textColor} fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke={textColor} fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
              <Tooltip 
                contentStyle={{ backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff', border: '1px solid', borderColor: theme === 'dark' ? '#374151' : '#e5e7eb', borderRadius: '8px', color: theme === 'dark' ? '#fff' : '#000', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }}
                formatter={(value) => [value < 0 ? `-$${Math.abs(value).toLocaleString()}` : `$${value.toLocaleString()}`, 'Balance']}
                labelStyle={{ color: theme === 'dark' ? '#9ca3af' : '#4b5563', marginBottom: '4px', fontWeight: 'bold' }}
              />
              <Line type="monotone" dataKey="balance" stroke="#22c55e" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

import React from 'react';
import { SummaryCards } from '../components/dashboard/SummaryCards';
import { BalanceChart } from '../components/dashboard/BalanceChart';
import { ExpensesPieChart } from '../components/dashboard/ExpensesPieChart';

export function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Dashboard Overview</h2>
      </div>
      
      <SummaryCards />
      
      <div className="grid gap-6 md:grid-cols-3">
        <BalanceChart />
        <ExpensesPieChart />
      </div>
    </div>
  );
}

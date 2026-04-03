import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { ArrowUpRight, ArrowDownRight, DollarSign, Wallet } from 'lucide-react';
import useStore from '../../store/useStore';
import { cn } from '../../lib/utils';

export function SummaryCards() {
  const transactions = useStore((state) => state.transactions);

  const { income, expense, balance } = transactions.reduce(
    (acc, tx) => {
      if (tx.type === 'income') {
        acc.income += tx.amount;
        acc.balance += tx.amount;
      } else {
        acc.expense += tx.amount;
        acc.balance -= tx.amount;
      }
      return acc;
    },
    { income: 0, expense: 0, balance: 0 }
  );

  return (
    <div className="grid gap-6 md:grid-cols-3 mb-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">Total Balance</CardTitle>
          <DollarSign className="h-4 w-4 text-gray-400" />
        </CardHeader>
        <CardContent>
          <div className={cn("text-2xl font-bold", balance < 0 ? "text-expense-600 dark:text-expense-500" : "text-primary-600 dark:text-primary-500")}>
            {balance < 0 ? `-$${Math.abs(balance).toLocaleString()}` : `$${balance.toLocaleString()}`}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">Total Income</CardTitle>
          <ArrowUpRight className="h-4 w-4 text-primary-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
            ${income.toLocaleString()}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">Total Expenses</CardTitle>
          <ArrowDownRight className="h-4 w-4 text-expense-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-expense-600 dark:text-expense-400">
            ${expense.toLocaleString()}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

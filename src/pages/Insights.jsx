import React, { useMemo } from 'react';
import useStore from '../store/useStore';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { TrendingUp, TrendingDown, Target, Zap } from 'lucide-react';

export function InsightsPage() {
  const transactions = useStore(state => state.transactions);

  const insights = useMemo(() => {
    const expenses = transactions.filter(t => t.type === 'expense');
    const groupedByCategory = expenses.reduce((acc, tx) => {
      acc[tx.category] = (acc[tx.category] || 0) + tx.amount;
      return acc;
    }, {});

    const topCategoryKey = Object.keys(groupedByCategory).reduce((a, b) => groupedByCategory[a] > groupedByCategory[b] ? a : b, '');
    const topCategoryValue = topCategoryKey ? groupedByCategory[topCategoryKey] : 0;

    // Monthly comparison naive assumption: current month vs previous month available in dataset
    const currentDate = new Date();
    const currentMonthStats = expenses.filter(t => new Date(t.date).getMonth() === currentDate.getMonth()).reduce((a, b) => a + b.amount, 0);
    const prevMonthStats = expenses.filter(t => new Date(t.date).getMonth() === currentDate.getMonth() - 1).reduce((a, b) => a + b.amount, 0);

    let comparisonText = "No comparison available";
    if (prevMonthStats > 0) {
      const percentage = (((currentMonthStats - prevMonthStats) / prevMonthStats) * 100).toFixed(1);
      if (currentMonthStats > prevMonthStats) {
        comparisonText = `Your overall spending increased by ${percentage}% compared to last month.`;
      } else if (currentMonthStats < prevMonthStats) {
        comparisonText = `Good job! Your spending decreased by ${Math.abs(percentage)}% compared to last month.`;
      } else {
        comparisonText = `Your spending is exactly the same as last month.`;
      }
    } else if (currentMonthStats > 0 && prevMonthStats === 0) {
       comparisonText = `You spent $${currentMonthStats.toLocaleString()} this month, but no comparison available for last month.`;
    }

    return {
      topCategory: topCategoryKey || 'N/A',
      topCategoryValue,
      comparisonText,
      trendDown: currentMonthStats <= prevMonthStats
    };
  }, [transactions]);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight">Spending Insights</h2>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/40 dark:to-primary-900/20 border-primary-200 dark:border-primary-900">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-primary-600" />
              Highest Spending Category
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold mb-2">{insights.topCategory}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              You've spent <span className="font-semibold">${insights.topCategoryValue.toLocaleString()}</span> in this category. Consider setting a budget.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/40 dark:to-blue-900/20 border-blue-200 dark:border-blue-900">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {insights.trendDown ? <TrendingDown className="w-5 h-5 text-green-500" /> : <TrendingUp className="w-5 h-5 text-red-500" />}
              Monthly Comparison
            </CardTitle>
          </CardHeader>
          <CardContent>
             <p className="text-lg font-medium leading-tight mb-2">
                {insights.comparisonText}
             </p>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-yellow-500"/>
                    Smart Summary
                </CardTitle>
            </CardHeader>
            <CardContent>
                <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary-500 mt-2"></div>
                        <p>A huge portion of your income is remaining as free balance. Consider investing it.</p>
                    </li>
                    <li className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-expense-500 mt-2"></div>
                        <p>{insights.topCategory === 'N/A' ? "We need more data" : `Your ${insights.topCategory} expenses are relatively high to average user benchmarks.`}</p>
                    </li>
                </ul>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}

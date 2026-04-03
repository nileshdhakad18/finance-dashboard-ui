import React, { useState } from 'react';
import useStore from '../store/useStore';
import { Card, CardContent } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Button } from '../components/ui/Button';
import { Plus, Trash2, Edit2, Search, Download, Receipt } from 'lucide-react';
import { TransactionForm } from '../components/transactions/TransactionForm';
import { Modal } from '../components/ui/Modal';

export function TransactionsPage() {
  const { transactions, deleteTransaction, role, searchQuery, setSearchQuery, filterType, setFilterType } = useStore();
  const [sortField, setSortField] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  
  // Modal states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTx, setEditingTx] = useState(null);

  const filtered = transactions.filter(t => {
    const matchSearch = t.category.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        t.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchType = filterType === 'all' ? true : t.type === filterType;
    return matchSearch && matchType;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortField === 'date') {
      return sortOrder === 'desc' 
        ? new Date(b.date).getTime() - new Date(a.date).getTime()
        : new Date(a.date).getTime() - new Date(b.date).getTime();
    } else if (sortField === 'amount') {
      return sortOrder === 'desc' ? b.amount - a.amount : a.amount - b.amount;
    }
    return 0;
  });

  const handleDelete = (id) => {
    if (confirm("Delete this transaction?")) {
      deleteTransaction(id);
    }
  };

  const handleEdit = (tx) => {
    setEditingTx(tx);
    setIsFormOpen(true);
  };

  const handleAdd = () => {
    setEditingTx(null);
    setIsFormOpen(true);
  };

  const handleExportCSV = () => {
    if (sorted.length === 0) return;
    
    // Create CSV content
    const headers = ['Date', 'Category', 'Description', 'Amount', 'Type'];
    const rows = sorted.map(tx => [
      tx.date,
      `"${tx.category}"`,
      `"${tx.description || ''}"`,
      tx.amount,
      tx.type
    ]);
    
    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    
    // Create a blob and trigger download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'transactions.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold tracking-tight">Transactions</h2>
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={handleExportCSV} className="flex items-center gap-2">
            <Download className="w-4 h-4" /> Export CSV
          </Button>
          {role === 'Admin' && (
            <Button onClick={handleAdd} className="flex items-center gap-2">
              <Plus className="w-4 h-4" /> Add Transaction
            </Button>
          )}
        </div>
      </div>

      <Card>
        <CardContent className="pt-6">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <Input 
                placeholder="Search category or desc..." 
                className="pl-9" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-4">
              <Select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="w-32">
                <option value="all">All Types</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </Select>
              <Select 
                value={`${sortField}-${sortOrder}`} 
                onChange={(e) => {
                  const [f, o] = e.target.value.split('-');
                  setSortField(f);
                  setSortOrder(o);
                }}
                className="w-40"
              >
                <option value="date-desc">Newest First</option>
                <option value="date-asc">Oldest First</option>
                <option value="amount-desc">Amount: High to Low</option>
                <option value="amount-asc">Amount: Low to High</option>
              </Select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            {sorted.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-gray-500">
                <Receipt className="w-12 h-12 mb-4 text-gray-300 dark:text-gray-700" />
                <p className="text-lg font-medium text-gray-900 dark:text-gray-100">No transactions found</p>
                <p className="text-sm mt-1">Try adjusting your filters or search query.</p>
              </div>
            ) : (
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-gray-500 uppercase bg-gray-50 dark:bg-gray-900 border-y dark:border-gray-800">
                  <tr>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3">Category</th>
                    <th className="px-4 py-3">Description</th>
                    <th className="px-4 py-3">Amount</th>
                    {role === 'Admin' && <th className="px-4 py-3 text-right">Actions</th>}
                  </tr>
                </thead>
                <tbody>
                  {sorted.map((tx) => (
                    <tr key={tx.id} className="border-b dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900/50">
                      <td className="px-4 py-3">{new Date(tx.date).toLocaleDateString()}</td>
                      <td className="px-4 py-3 font-medium">{tx.category}</td>
                      <td className="px-4 py-3 text-gray-500">{tx.description || '-'}</td>
                      <td className={`px-4 py-3 font-semibold ${tx.type === 'income' ? 'text-primary-600 dark:text-primary-500' : 'text-expense-600 dark:text-expense-500'}`}>
                        {tx.type === 'income' ? '+' : '-'}${tx.amount.toLocaleString()}
                      </td>
                      {role === 'Admin' && (
                        <td className="px-4 py-3 text-right space-x-2">
                          <Button variant="ghost" size="icon" onClick={() => handleEdit(tx)}>
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-expense-500 hover:text-expense-600" onClick={() => handleDelete(tx.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </CardContent>
      </Card>

      <Modal 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)}
        title={editingTx ? 'Edit Transaction' : 'Add Transaction'}
      >
        <TransactionForm 
          tx={editingTx} 
          onSuccess={() => setIsFormOpen(false)} 
          onCancel={() => setIsFormOpen(false)} 
        />
      </Modal>
    </div>
  );
}

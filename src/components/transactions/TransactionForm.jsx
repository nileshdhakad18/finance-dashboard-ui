import React, { useState } from 'react';
import useStore from '../../store/useStore';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { CATEGORIES } from '../../data/mockData';

export function TransactionForm({ tx, onSuccess, onCancel }) {
  const { addTransaction, editTransaction } = useStore();
  
  const [formData, setFormData] = useState({
    date: tx ? tx.date : new Date().toISOString().split('T')[0],
    amount: tx ? tx.amount : '',
    category: tx ? tx.category : CATEGORIES[0],
    type: tx ? tx.type : 'expense',
    description: tx ? tx.description : ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.amount || formData.amount <= 0) return;

    const payload = {
      ...formData,
      amount: parseFloat(formData.amount)
    };

    if (tx) {
      editTransaction(tx.id, payload);
    } else {
      addTransaction({
        id: Math.random().toString(36).substr(2, 9),
        ...payload
      });
    }
    
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Type</label>
        <Select 
          value={formData.type}
          onChange={(e) => setFormData(prev => ({...prev, type: e.target.value}))}
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </Select>
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium">Amount ($)</label>
        <Input 
          type="number"
          min="0.01" step="0.01" required
          value={formData.amount}
          onChange={(e) => setFormData(prev => ({...prev, amount: e.target.value}))}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Category</label>
        <Select 
          value={formData.category}
          onChange={(e) => setFormData(prev => ({...prev, category: e.target.value}))}
        >
          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Date</label>
        <Input 
          type="date" required
          value={formData.date}
          onChange={(e) => setFormData(prev => ({...prev, date: e.target.value}))}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Description</label>
        <Input 
          type="text" placeholder="Optional"
          value={formData.description}
          onChange={(e) => setFormData(prev => ({...prev, description: e.target.value}))}
        />
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t dark:border-gray-800">
        <Button type="button" variant="ghost" onClick={onCancel}>Cancel</Button>
        <Button type="submit">Save Transaction</Button>
      </div>
    </form>
  );
}

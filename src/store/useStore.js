import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { MOCK_TRANSACTIONS } from '../data/mockData';

const useStore = create(
  persist(
    (set) => ({
      // Theming
      theme: 'dark', // Default to clean dark mode as requested
      toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
      
      // Role
      role: 'Admin', // 'Viewer' or 'Admin'
      setRole: (role) => set({ role }),

      // Data
      mockDataLoaded: true,
      transactions: MOCK_TRANSACTIONS,
      addTransaction: (transaction) => set((state) => ({
        transactions: [...state.transactions, transaction]
      })),
      editTransaction: (id, updatedData) => set((state) => ({
        transactions: state.transactions.map(t => t.id === id ? { ...t, ...updatedData } : t)
      })),
      deleteTransaction: (id) => set((state) => ({
        transactions: state.transactions.filter(t => t.id !== id)
      })),

      // UI State for filtering
      searchQuery: '',
      setSearchQuery: (searchQuery) => set({ searchQuery }),
      filterType: 'all', // 'all', 'income', 'expense'
      setFilterType: (filterType) => set({ filterType }),
    }),
    {
      name: 'finance-dashboard-store',
      partialize: (state) => ({ transactions: state.transactions, theme: state.theme, role: state.role }),
    }
  )
);

export default useStore;

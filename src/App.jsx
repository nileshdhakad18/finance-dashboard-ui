import React, { useEffect, useState } from 'react';
import useStore from './store/useStore';
import { Layout } from './components/layout/Layout';
import { Dashboard } from './pages/Dashboard';
import { TransactionsPage } from './pages/Transactions';
import { InsightsPage } from './pages/Insights';

function App() {
  const { theme, mockDataLoaded } = useStore();
  const [currentView, setCurrentView] = useState('dashboard');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  if (!mockDataLoaded) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const renderView = () => {
    switch (currentView) {
      case 'dashboard': return <Dashboard />;
      case 'transactions': return <TransactionsPage />;
      case 'insights': return <InsightsPage />;
      default: return <Dashboard />;
    }
  };

  return (
    <Layout currentView={currentView} setCurrentView={setCurrentView}>
      {renderView()}
    </Layout>
  );
}

export default App;

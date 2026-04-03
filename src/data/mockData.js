// Realistic financial mock data
const generateId = () => Math.random().toString(36).substr(2, 9);
const randomDateInLastMonths = (months) => {
  const date = new Date();
  date.setMonth(date.getMonth() - Math.floor(Math.random() * months));
  date.setDate(Math.floor(Math.random() * 28) + 1);
  return date.toISOString().split('T')[0];
};

export const MOCK_TRANSACTIONS = [
  { id: generateId(), date: randomDateInLastMonths(0), amount: 5000, category: 'Salary', type: 'income', description: 'Monthly Salary' },
  { id: generateId(), date: randomDateInLastMonths(1), amount: 5000, category: 'Salary', type: 'income', description: 'Monthly Salary' },
  { id: generateId(), date: randomDateInLastMonths(2), amount: 5000, category: 'Salary', type: 'income', description: 'Monthly Salary' },
  { id: generateId(), date: randomDateInLastMonths(0), amount: 800, category: 'Freelance', type: 'income', description: 'Web Project' },
  { id: generateId(), date: randomDateInLastMonths(0), amount: 1500, category: 'Rent', type: 'expense', description: 'Apartment Rent' },
  { id: generateId(), date: randomDateInLastMonths(0), amount: 450, category: 'Food', type: 'expense', description: 'Groceries & Dining' },
  { id: generateId(), date: randomDateInLastMonths(0), amount: 120, category: 'Utilities', type: 'expense', description: 'Electricity & Water' },
  { id: generateId(), date: randomDateInLastMonths(0), amount: 45, category: 'Subscriptions', type: 'expense', description: 'Netflix & Spotify' },
  { id: generateId(), date: randomDateInLastMonths(0), amount: 350, category: 'Shopping', type: 'expense', description: 'Clothes & Amazon' },
  { id: generateId(), date: randomDateInLastMonths(1), amount: 1500, category: 'Rent', type: 'expense', description: 'Apartment Rent' },
  { id: generateId(), date: randomDateInLastMonths(1), amount: 800, category: 'Travel', type: 'expense', description: 'Flight Tickets' },
  { id: generateId(), date: randomDateInLastMonths(1), amount: 380, category: 'Food', type: 'expense', description: 'Groceries' },
  { id: generateId(), date: randomDateInLastMonths(1), amount: 130, category: 'Utilities', type: 'expense', description: 'Internet & Power' },
  { id: generateId(), date: randomDateInLastMonths(2), amount: 1500, category: 'Rent', type: 'expense', description: 'Apartment Rent' },
  { id: generateId(), date: randomDateInLastMonths(2), amount: 650, category: 'Shopping', type: 'expense', description: 'Tech Gadgets' },
  { id: generateId(), date: randomDateInLastMonths(2), amount: 500, category: 'Food', type: 'expense', description: 'Groceries & Dining' }
];

export const CATEGORIES = ['Food', 'Rent', 'Travel', 'Shopping', 'Salary', 'Freelance', 'Utilities', 'Subscriptions', 'Other'];

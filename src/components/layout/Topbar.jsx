import React from 'react';
import { Moon, Sun, ShieldAlert, User } from 'lucide-react';
import useStore from '../../store/useStore';
import { Button } from '../ui/Button';
import { Select } from '../ui/Select';

export function Topbar() {
  const { theme, toggleTheme, role, setRole } = useStore();

  return (
    <header className="h-16 border-b border-gray-200/50 dark:border-white/10 bg-white/70 dark:bg-gray-950/70 backdrop-blur-xl flex items-center justify-between px-6 sticky top-0 z-10 w-full">
      <div className="flex items-center md:hidden">
        <h2 className="text-xl font-bold text-primary-600">FinDash</h2>
      </div>
      <div className="hidden md:block"></div> {/* Spacer */}
      
      <div className="flex items-center space-x-4">
        {/* Role Toggle */}
        <div className="flex items-center space-x-2">
          {role === 'Admin' ? <ShieldAlert className="w-4 h-4 text-expense-500" /> : <User className="w-4 h-4 text-gray-500" />}
          <Select 
            value={role} 
            onChange={(e) => setRole(e.target.value)} 
            className="w-36 bg-gray-50 dark:bg-gray-900 border-none font-medium shadow-sm hover:ring-1 hover:ring-primary-500 transition-shadow cursor-pointer"
          >
            <option value="Viewer">Role: Viewer</option>
            <option value="Admin">Role: Admin</option>
          </Select>
        </div>

        <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full">
          {theme === 'dark' ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5" />}
        </Button>
      </div>
    </header>
  );
}

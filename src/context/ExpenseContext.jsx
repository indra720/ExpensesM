;;import React, { createContext, useContext, useState, useEffect } from 'react';

const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  // Initialize expenses from localStorage if available
  const [expenses, setExpenses] = useState(() => {
    try {
      const saved = localStorage.getItem('expenses');
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("Failed to load expenses from localStorage", error);
      return [];
    }
  });

  // Persist expenses to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (newExpense) => {
    const expenseWithId = {
      ...newExpense,
      id: Date.now(), // Unique identifier
      amount: parseFloat(newExpense.amount) || 0, // Ensure amount is a number
      date: newExpense.date || new Date().toISOString().split('T')[0]
    };
    setExpenses((prev) => [expenseWithId, ...prev]);
  };

  const deleteExpense = (id) => {
    setExpenses((prev) => prev.filter(exp => exp.id !== id));
  };

  return (
    <ExpenseContext.Provider value={{ expenses, addExpense, deleteExpense }}>
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpenses = () => {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error('useExpenses must be used within an ExpenseProvider');
  }
  return context;
};

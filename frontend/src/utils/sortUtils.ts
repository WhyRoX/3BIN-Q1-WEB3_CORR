import type { Expense } from '../types/Expense';
import type { SortOption } from '../components/ExpenseSorter';

/**
 * Sorts an array of expenses based on the provided sort option
 * @param expenses - Array of expense objects to sort
 * @param sortOption - The sorting criteria
 * @returns Sorted array of expenses
 */
export const sortExpenses = (expenses: Expense[], sortOption: SortOption): Expense[] => {
  const sortedExpenses = [...expenses]; // Create a copy to avoid mutating the original array

  switch (sortOption) {
    case 'date-newest':
      return sortedExpenses.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    case 'date-oldest':
      return sortedExpenses.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    case 'amount-highest':
      return sortedExpenses.sort((a, b) => b.amount - a.amount);
    
    case 'amount-lowest':
      return sortedExpenses.sort((a, b) => a.amount - b.amount);
    
    default:
      return sortedExpenses;
  }
};

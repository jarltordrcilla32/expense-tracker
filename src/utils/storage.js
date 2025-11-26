/* Handles Everything related to storing data to local storage*/

const STORAGE_KEY = 'expense_tracker_data';

export const loadExpenses = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    return null;
  } catch (error) {
    console.error('Error loading expenses from localStorage:', error);
    return null;
  }
};

/* Save data to local storage */
export const saveExpenses = (expenses) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
  } catch (error) {
    console.error('Error saving expenses to localStorage:', error);
  }
};

/* Clear data from local storage */
export const clearExpenses = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing expenses from localStorage:', error);
  }
};
import React, { useState, useEffect, useMemo } from 'react';
import { Plus, Search, BarChart3, Trash2, Edit2, X, ChevronDown, ChevronUp } from 'lucide-react';

import { loadExpenses, saveExpenses } from './utils/storage';
import { formatCurrency } from './utils/formatters';
import { CATEGORIES } from './data/categories';
import { getSampleData } from './data/sampleData';


export default function ExpenseTracker() {
  // ========================================================================
  //                              STATE MANAGEMENT
  // ========================================================================
  
  const [showModal, setShowModal] = useState(false);
  const [showReports, setShowReports] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('date');
  const [sortDirection, setSortDirection] = useState('desc');
  
  const [expenses, setExpenses] = useState(() => {
    const stored = loadExpenses();
    return stored || getSampleData();
  });
  
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    description: '',
    amount: '',
    category: 'Other'
  });

  // ========================================================================
  //                              SIDE EFFECTS
  // ========================================================================
  
  useEffect(() => {
    saveExpenses(expenses);
  }, [expenses]);

  // ========================================================================
  //                             COMPUTED VALUES
  // ========================================================================
  
  const filteredExpenses = useMemo(() => {
    if (!searchTerm) return expenses;
    
    const term = searchTerm.toLowerCase();
    return expenses.filter(expense => {
      const matchesDescription = expense.description.toLowerCase().includes(term);
      
      const matchesCategory = expense.category.toLowerCase().includes(term);
      
      const matchesDate = expense.date.includes(term);
      
      const amountString = expense.amount.toString();
      const matchesAmount = amountString.includes(term);
      
      return matchesDescription || matchesCategory || matchesDate || matchesAmount;
    });
  }, [expenses, searchTerm]);

  const sortedExpenses = useMemo(() => {
    const sorted = [...filteredExpenses].sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];

      if (sortField === 'amount') {
        aValue = Number(aValue);
        bValue = Number(bValue);
      } else if (sortField === 'date') {
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
      } else {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
      } else {
        return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
      }
    });

    return sorted;
  }, [filteredExpenses, sortField, sortDirection]);
  
  const total = useMemo(() => {
    return sortedExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  }, [sortedExpenses]);

  // ========================================================================
  //                              EVENT HANDLERS
  // ========================================================================
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'amount' ? parseFloat(value) || '' : value
    }));
  };

  const handleSubmit = () => {
    if (!formData.description || !formData.amount) {
      alert('Please fill in all fields');
      return;
    }

    if (editingId) {
      setExpenses(expenses.map(exp =>
        exp.id === editingId
          ? { ...formData, amount: Number(formData.amount), id: editingId }
          : exp
      ));
      setEditingId(null);
    } else {
      const newExpense = {
        id: Date.now().toString(),
        date: formData.date,
        description: formData.description,
        amount: Number(formData.amount),
        category: formData.category
      };
      setExpenses([newExpense, ...expenses]);
    }

    setFormData({
      date: new Date().toISOString().split('T')[0],
      description: '',
      amount: '',
      category: 'Other'
    });

    // Close modal
    setShowModal(false);
  };

  const handleEdit = (expense) => {
    setFormData({
      date: expense.date,
      description: expense.description,
      amount: expense.amount,
      category: expense.category
    });
    setEditingId(expense.id);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      setExpenses(expenses.filter(exp => exp.id !== id));
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({
      date: new Date().toISOString().split('T')[0],
      description: '',
      amount: '',
      category: 'Other'
    });
    setShowModal(false);
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };
  // ========================================================================
  //                                 RENDER
  // ========================================================================

  return (
    <div className="min-h-screen bg-gray-50">
      {/* =================================================================== 
                                      HEADER 
          ===================================================================*/}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Expense Tracker</h1>
            <button 
              onClick={() => setShowReports(!showReports)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <BarChart3 size={20} />
              {showReports ? 'View Expenses' : 'View Reports'}
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        
        {!showReports ? (
          <>
            {/* Search Bar */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by description, category, date, or amount..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              {searchTerm && (
                <p className="text-sm text-gray-500 mt-2">
                  Found {sortedExpenses.length} expense{sortedExpenses.length !== 1 ? 's' : ''} matching "{searchTerm}"
                </p>
              )}
            </div>

            {/* Expenses Table */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th 
                        onClick={() => handleSort('date')}
                        className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer hover:bg-gray-100 transition-colors select-none"
                      >
                        <div className="flex items-center gap-1">
                          Date
                          {sortField === 'date' && (
                            sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                          )}
                        </div>
                      </th>
                      <th 
                        onClick={() => handleSort('description')}
                        className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer hover:bg-gray-100 transition-colors select-none"
                      >
                        <div className="flex items-center gap-1">
                          Description
                          {sortField === 'description' && (
                            sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                          )}
                        </div>
                      </th>
                      <th 
                        onClick={() => handleSort('category')}
                        className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer hover:bg-gray-100 transition-colors select-none"
                      >
                        <div className="flex items-center gap-1">
                          Category
                          {sortField === 'category' && (
                            sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                          )}
                        </div>
                      </th>
                      <th 
                        onClick={() => handleSort('amount')}
                        className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase cursor-pointer hover:bg-gray-100 transition-colors select-none"
                      >
                        <div className="flex items-center justify-end gap-1">
                          Amount
                          {sortField === 'amount' && (
                            sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                          )}
                        </div>
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {sortedExpenses.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="px-4 py-12 text-center text-gray-500">
                          <div className="flex flex-col items-center gap-2">
                            <p className="text-lg font-medium">
                              {searchTerm ? 'No expenses found' : 'No expenses yet'}
                            </p>
                            <p className="text-sm">
                              {searchTerm ? 'Try a different search term' : 'Click the + button to add your first expense'}
                            </p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      sortedExpenses.map(expense => (
                        <tr key={expense.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm text-gray-900">{expense.date}</td>
                          <td className="px-4 py-3 text-sm text-gray-900">{expense.description}</td>
                          <td className="px-4 py-3 text-sm">
                            <span className="inline-flex px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                              {expense.category}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm text-right font-medium text-gray-900">
                            {formatCurrency(expense.amount)}
                          </td>
                          <td className="px-4 py-3 text-sm text-center">
                            <div className="flex items-center justify-center gap-2">
                              <button 
                                onClick={() => handleEdit(expense)}
                                className="text-blue-600 hover:text-blue-800"
                                aria-label="Edit expense"
                              >
                                <Edit2 size={16} />
                              </button>
                              <button 
                                onClick={() => handleDelete(expense.id)}
                                className="text-red-600 hover:text-red-800"
                                aria-label="Delete expense"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                  <tfoot className="bg-gray-50 border-t-2 border-gray-300">
                    <tr>
                      <td colSpan="3" className="px-4 py-3 text-sm font-bold text-gray-900">Total</td>
                      <td className="px-4 py-3 text-sm text-right font-bold text-gray-900">
                        {formatCurrency(total)}
                      </td>
                      <td></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </>
        ) : (
          // REPORTS VIEW
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Yearly Total (2025)
              </h2>
              <p className="text-3xl font-bold text-blue-600">{formatCurrency(total)}</p>
              <p className="text-sm text-gray-500 mt-2">
                Reports functionality coming in next commit
              </p>
            </div>
          </div>
        )}
      </main>

      {/* ADD EXPENSES BUTTON */}
      {!showReports && (
        <button
          onClick={() => setShowModal(true)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all hover:scale-110 flex items-center justify-center z-40"
          aria-label="Add expense"
        >
          <Plus size={24} />
        </button>
      )}

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                {editingId ? 'Edit Expense' : 'Add New Expense'}
              </h2>
              <button 
                onClick={cancelEdit}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select 
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="e.g., Taxi to client meeting"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount (₱)</label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex gap-2 p-4 border-t border-gray-200 bg-gray-50">
              <button 
                onClick={handleSubmit}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus size={20} />
                {editingId ? 'Update Expense' : 'Add Expense'}
              </button>
              <button 
                onClick={cancelEdit}
                className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
import React, { useState } from 'react';
import { Plus, Search, BarChart3, Trash2, Edit2, X, ChevronDown } from 'lucide-react';

export default function ExpenseTracker() {
  const [showModal, setShowModal] = useState(false);
  const [showReports, setShowReports] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ========================================================================
                                      HEADER
          ======================================================================== */}
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

      {/* ========================================================================
                                    MAIN CONTENT
          ======================================================================== */}
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        
        {!showReports ? (
          //=======================================================================
          //                        EXPENSES VIEW
          //=======================================================================
          <>
            {/* 
            ========================================================================
                                    SEARCH BAR
            ======================================================================== */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search expenses..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* 
            ========================================================================
                                    EXPENSES TABLE
            ======================================================================== */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer hover:bg-gray-100 transition-colors">
                        <div className="flex items-center gap-1">
                          Date
                          <ChevronDown size={16} />
                        </div>
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer hover:bg-gray-100 transition-colors">
                        Description
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer hover:bg-gray-100 transition-colors">
                        Category
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase cursor-pointer hover:bg-gray-100 transition-colors">
                        Amount
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td colSpan="5" className="px-4 py-12 text-center text-gray-500">
                        <div className="flex flex-col items-center gap-2">
                          <p className="text-lg font-medium">No expenses yet</p>
                          <p className="text-sm">Click the + button to add your first expense</p>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                  <tfoot className="bg-gray-50 border-t-2 border-gray-300">
                    <tr>
                      <td colSpan="3" className="px-4 py-3 text-sm font-bold text-gray-900">Total</td>
                      <td className="px-4 py-3 text-sm text-right font-bold text-gray-900">
                        ₱0.00
                      </td>
                      <td></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </>
        ) : (
          //=======================================================================
          //                        REPORTS VIEW
          //=======================================================================
          <div className="space-y-6">
            {/* 
            ========================================================================
                                    YEARLY TOTAL
            ======================================================================== */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Yearly Total (2025)
              </h2>
              <p className="text-3xl font-bold text-blue-600">₱0.00</p>
            </div>

            {/* 
            ========================================================================
                                    QUARTERLY REPORT
            ======================================================================== */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Quarterly Report</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map(q => (
                  <div key={q} className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-1">Q{q}</div>
                    <div className="text-xl font-bold text-gray-900">₱0.00</div>
                  </div>
                ))}
              </div>
            </div>

            {/* 
            ========================================================================
                                    MONTHLY REPORT
            ======================================================================== */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Monthly Report</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month) => (
                  <div key={month} className="bg-gray-50 rounded-lg p-3">
                    <div className="text-xs text-gray-600 mb-1">{month}</div>
                    <div className="text-sm font-bold text-gray-900">₱0.00</div>
                  </div>
                ))}
              </div>
            </div>

            {/* 
            ========================================================================
                                    WEEKLY REPORT CHART
            ======================================================================== */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Weekly Report (Chart)</h2>
              <div className="px-4 py-12 text-center text-gray-500">
                <p>No expense data yet</p>
              </div>
            </div>

            {/* 
            ========================================================================
                                    WEEKLY REPORT TABLE
            ======================================================================== */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Weekly Report (Table)</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Week</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan="2" className="px-4 py-8 text-center text-gray-500">
                        No expense data yet
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ========================================================================
                                    ADD EXPENSE BUTTON
          ======================================================================== */}
      {!showReports && (
        <button
          onClick={() => setShowModal(true)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all hover:scale-110 flex items-center justify-center z-40"
          aria-label="Add expense"
        >
          <Plus size={24} />
        </button>
      )}

      {/* ========================================================================
                                      EXPENSE MODAL
          ======================================================================== */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Add New Expense</h2>
              <button 
                onClick={() => setShowModal(false)}
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>Travel</option>
                  <option>Food</option>
                  <option>Office Supplies</option>
                  <option>Software</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <input
                  type="text"
                  placeholder="e.g., Taxi to client meeting"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount (₱)</label>
                <input
                  type="number"
                  placeholder="0.00"
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex gap-2 p-4 border-t border-gray-200 bg-gray-50">
              <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Plus size={20} />
                Add Expense
              </button>
              <button 
                onClick={() => setShowModal(false)}
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
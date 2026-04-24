import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Plus, 
  Calendar, 
  Tag, 
  DollarSign, 
  FileText,
  MapPin,
  Coffee,
  Car,
  MoreHorizontal
} from 'lucide-react';
import { useExpenses } from '../context/ExpenseContext';

const AddExpenseModal = ({ isOpen, onClose }) => {
  const { addExpense } = useExpenses();
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: '',
    subcategory: '',
    type: 'Personal', // New field
    projectName: '', // For project expenses
    date: new Date().toISOString().split('T')[0],
    notes: ''
  });

  const categories = {
    'Travelling': ['Bus', 'Train', 'Flight'],
    'Local Transport': ['Cab', 'Auto', 'Rickshaw', 'Local Bus'],
    'Fooding': ['Restaurant', 'Snacks', 'Groceries'],
    'Infrastructure': ['Materials', 'Labor', 'Equipment'], // Added for projects
    'Others': ['Custom']
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addExpense(formData);
    setFormData({
      title: '',
      amount: '',
      category: '',
      subcategory: '',
      type: 'Personal',
      projectName: '',
      date: new Date().toISOString().split('T')[0],
      notes: ''
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#3D2B1F]/40 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg h-[90vh] overflow-y-auto no-scrollbar bg-white rounded-[2.5rem] shadow-2xl border border-stone-100"
          >
            {/* Header */}
            <div className="px-8 py-6 bg-stone-50 border-b border-stone-100 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-[#3D2B1F]">Add New Expense</h2>
                <p className="text-stone-400 text-xs font-medium">Keep your financial records accurate</p>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-stone-200 rounded-full transition-colors text-stone-400 hover:text-[#3D2B1F]"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-8 space-y-5">
              {/* Type Toggle */}
              <div className="flex bg-stone-50 p-1 rounded-2xl border border-stone-100">
                {['Personal', 'Project'].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setFormData({...formData, type: t})}
                    className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
                      formData.type === t 
                        ? 'bg-[#3D2B1F] text-white shadow-md' 
                        : 'text-stone-400 hover:text-[#3D2B1F]'
                    }`}
                  >
                    {t} Expense
                  </button>
                ))}
              </div>

              {formData.type === 'Project' && (
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest ml-1">Project Name</label>
                  <select 
                    required
                    className="w-full bg-stone-50 border border-stone-100 text-[#3D2B1F] rounded-2xl py-3 px-4 outline-none focus:border-[#8B5E3C] transition-all text-sm font-medium appearance-none cursor-pointer"
                    onChange={(e) => setFormData({...formData, projectName: e.target.value})}
                  >
                    <option value="">Select Project</option>
                    <option value="Eco Resort">Eco Resort</option>
                    <option value="App Revamp">App Revamp</option>
                    <option value="Marketing">Marketing</option>
                  </select>
                </div>
              )}
              {/* Title & Amount */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest ml-1">Title</label>
                  <div className="relative group">
                    <FileText className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-300 group-focus-within:text-[#8B5E3C] transition-colors" />
                    <input 
                      type="text"
                      required
                      className="w-full bg-stone-50 border border-stone-100 text-[#3D2B1F] rounded-2xl py-3 pl-11 pr-4 outline-none focus:border-[#8B5E3C] transition-all text-sm font-medium"
                      placeholder="e.g. Flight to Mumbai"
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest ml-1">Amount (₹)</label>
                  <div className="relative group">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-bold text-stone-300 group-focus-within:text-[#8B5E3C] transition-colors">₹</span>
                    <input 
                      type="number"
                      required
                      className="w-full bg-stone-50 border border-stone-100 text-[#3D2B1F] rounded-2xl py-3 pl-11 pr-4 outline-none focus:border-[#8B5E3C] transition-all text-sm font-bold"
                      placeholder="0.00"
                      value={formData.amount}
                      onChange={(e) => setFormData({...formData, amount: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              {/* Category & Subcategory */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest ml-1">Category</label>
                  <select 
                    required
                    className="w-full bg-stone-50 border border-stone-100 text-[#3D2B1F] rounded-2xl py-3 px-4 outline-none focus:border-[#8B5E3C] transition-all text-sm font-medium appearance-none cursor-pointer"
                    onChange={(e) => setFormData({...formData, category: e.target.value, subcategory: ''})}
                  >
                    <option value="">Select Category</option>
                    {Object.keys(categories).map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest ml-1">Subcategory</label>
                  <select 
                    required
                    disabled={!formData.category}
                    className="w-full bg-stone-50 border border-stone-100 text-[#3D2B1F] rounded-2xl py-3 px-4 outline-none focus:border-[#8B5E3C] transition-all text-sm font-medium appearance-none cursor-pointer disabled:opacity-50"
                    onChange={(e) => setFormData({...formData, subcategory: e.target.value})}
                  >
                    <option value="">Select...</option>
                    {formData.category && categories[formData.category].map(sub => <option key={sub} value={sub}>{sub}</option>)}
                  </select>
                </div>
              </div>

              {/* Date */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest ml-1">Transaction Date</label>
                <div className="relative group">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-300 group-focus-within:text-[#8B5E3C] transition-colors" />
                  <input 
                    type="date"
                    required
                    value={formData.date}
                    className="w-full bg-stone-50 border border-stone-100 text-[#3D2B1F] rounded-2xl py-3 pl-11 pr-4 outline-none focus:border-[#8B5E3C] transition-all text-sm font-medium"
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                  />
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest ml-1">Notes (Optional)</label>
                <textarea 
                  className="w-full bg-stone-50 border border-stone-100 text-[#3D2B1F] rounded-2xl py-3 px-4 outline-none focus:border-[#8B5E3C] transition-all text-sm font-medium h-24 resize-none"
                  placeholder="Additional details..."
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                ></textarea>
              </div>

              {/* Footer Actions */}
              <div className="flex flex-col md:flex-row gap-4 pt-4">
                <button 
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-4 border border-stone-100 text-stone-400 font-bold rounded-2xl hover:bg-stone-50 transition-all text-sm"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-4 bg-[#3D2B1F] text-white font-bold rounded-2xl hover:bg-[#2A1D15] shadow-lg shadow-stone-200 transition-all text-sm flex items-center justify-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Save Expense
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AddExpenseModal;

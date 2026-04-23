import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Download, 
  Calendar, 
  Filter, 
  ChevronDown,
  PieChart,
  BarChart,
  ArrowRight,
  Printer
} from 'lucide-react';
import Sidebar from '../components/Sidebar';

const Reports = () => {
  const [dateRange, setDateRange] = useState('This Month');
  
  const reportSummaries = [
    { title: 'Personal Spends', amount: '₹42,500', change: '+12%', color: 'text-[#8B5E3C]' },
    { title: 'Project Spends', amount: '₹1,25,000', change: '-5%', color: 'text-stone-600' },
    { title: 'Tax Deductions', amount: '₹8,200', change: '+2%', color: 'text-emerald-600' },
  ];

  return (
    <div className="min-h-screen bg-[#FDFCFB] flex">
      <Sidebar />
      
      <main className="flex-1 lg:ml-64 p-6 mt-16 lg:mt-0">
        <header className="flex flex-col md:flex-row justify-between md:items-end mb-4 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-[#3D2B1F] tracking-tight">Financial Reports</h1>
            <p className="text-stone-500 font-medium mt-1">Generate and export detailed expense summaries</p>
          </div>
          
          <div className="flex gap-4">
            <button className="flex items-center gap-2 px-6 py-3.5 bg-white border border-stone-100 rounded-2xl text-[#3D2B1F] font-bold text-sm shadow-sm hover:bg-stone-50 transition-all">
              <Printer className="w-4 h-4" />
              Print
            </button>
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-[#3D2B1F] text-white px-6 py-3.5 rounded-2xl flex items-center gap-3 shadow-lg shadow-stone-200 font-bold"
            >
              <Download className="w-5 h-5" />
              Download PDF
            </motion.button>
          </div>
        </header>

        {/* Report Customization */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-4">
          <div className="lg:col-span-3 bg-white p-8 rounded-[2.5rem] border border-stone-100 shadow-sm">
            <h2 className="text-xl font-bold text-[#3D2B1F] mb-6">Report Configuration</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest ml-1">Date Range</label>
                <div className="relative cursor-pointer">
                  <select className="w-full bg-stone-50 border border-stone-100 text-[#3D2B1F] rounded-xl py-3 px-4 outline-none appearance-none font-medium text-sm">
                    <option>Last 30 Days</option>
                    <option>Last Quarter</option>
                    <option>Financial Year 2023-24</option>
                    <option>Custom Range</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest ml-1">Category</label>
                <div className="relative">
                  <select className="w-full bg-stone-50 border border-stone-100 text-[#3D2B1F] rounded-xl py-3 px-4 outline-none appearance-none font-medium text-sm">
                    <option>All Categories</option>
                    <option>Travelling</option>
                    <option>Fooding</option>
                    <option>Project Materials</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest ml-1">Report Type</label>
                <div className="relative">
                  <select className="w-full bg-stone-50 border border-stone-100 text-[#3D2B1F] rounded-xl py-3 px-4 outline-none appearance-none font-medium text-sm">
                    <option>Detailed Transaction List</option>
                    <option>Category Summary</option>
                    <option>Project Cost Analysis</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-[#3D2B1F] p-8 rounded-[2.5rem] text-white flex flex-col justify-center">
            <p className="text-stone-400 text-xs font-bold uppercase tracking-widest mb-2">Ready to Export</p>
            <h3 className="text-2xl font-bold mb-4">124 Items Selected</h3>
            <button className="text-sm font-bold text-[#8B5E3C] flex items-center gap-2 hover:gap-3 transition-all">
              Preview Selection <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quick Summaries */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {reportSummaries.map((s) => (
            <div key={s.title} className="bg-white p-8 rounded-[2.5rem] border border-stone-100 shadow-sm group hover:border-[#8B5E3C] transition-all">
              <p className="text-stone-400 text-sm font-medium mb-1">{s.title}</p>
              <div className="flex justify-between items-end">
                <h3 className={`text-2xl font-bold ₹{s.color}`}>{s.amount}</h3>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">{s.change}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Reports List */}
        <div className="bg-white rounded-[2.5rem] border border-stone-100 shadow-sm overflow-hidden">
          <div className="px-8 py-6 border-b border-stone-100">
            <h2 className="text-xl font-bold text-[#3D2B1F]">Recently Generated Reports</h2>
          </div>
          <div className="divide-y divide-stone-50">
            {[1, 2, 3].map((i) => (
              <div key={i} className="px-8 py-5 flex items-center justify-between group hover:bg-stone-50/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-stone-50 rounded-xl flex items-center justify-center text-[#8B5E3C]">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-[#3D2B1F]">Monthly_Summary_Oct_2023.pdf</p>
                    <p className="text-xs text-stone-400 font-medium">Generated on Oct 22, 2023 • 2.4 MB</p>
                  </div>
                </div>
                <button className="p-3 text-stone-300 hover:text-[#3D2B1F] hover:bg-white rounded-xl transition-all shadow-sm">
                  <Download className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Reports;

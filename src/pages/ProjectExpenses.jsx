import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Plus, 
  MoreVertical,
  Building2,
  Globe,
  Layers,
  Trash2
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import AddExpenseModal from '../components/AddExpenseModal';
import { useExpenses } from '../context/ExpenseContext';

const ProjectExpenses = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { expenses, deleteExpense } = useExpenses();

  // Project definitions with budgets
  const initialProjects = [
    { id: 'Eco Resort', name: 'Eco Resort', category: 'Infrastructure', budget: 1000000, icon: Building2, color: 'text-[#8B5E3C]' },
    { id: 'App Revamp', name: 'App Revamp', category: 'Software', budget: 200000, icon: Globe, color: 'text-stone-600' },
    { id: 'Marketing', name: 'Marketing', category: 'Marketing', budget: 150000, icon: Layers, color: 'text-stone-400' },
  ];

  // Calculate project spent amounts
  const projects = initialProjects.map(p => {
    const spent = expenses
      .filter(exp => exp.type === 'Project' && exp.projectName === p.name)
      .reduce((sum, exp) => sum + exp.amount, 0);
    
    const percentage = p.budget > 0 ? Math.min((spent / p.budget) * 100, 100) : 0;
    
    return { ...p, spent, percentage };
  });

  const projectBillings = expenses.filter(exp => 
    exp.type === 'Project' && 
    (exp.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
     exp.projectName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-[#FDFCFB] flex flex-col md:flex-row">
      <Sidebar />
      
      <main className="flex-1 p-6 lg:ml-64 mt-16 ">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-[#3D2B1F] tracking-tight">Project Expenses</h1>
            <p className="text-stone-500 font-medium mt-1 text-sm">Manage and track your commercial project costs</p>
          </div>
          
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsModalOpen(true)}
            className="w-full md:w-auto bg-[#3D2B1F] text-white px-6 py-3.5 rounded-2xl flex items-center justify-center gap-3 shadow-lg font-bold"
          >
            <Plus className="w-5 h-5" />
            New Project Entry
          </motion.button>
        </header>

        {/* Project Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
          {projects.map((project) => (
            <div key={project.id} className="bg-white p-6 md:p-8 rounded-2xl md:rounded-3xl border border-stone-100 shadow-sm hover:shadow-xl transition-all duration-500 group">
              <div className="flex justify-between items-start mb-6">
                <div className={`w-12 h-12 md:w-14 md:h-14 bg-stone-50 rounded-2xl flex items-center justify-center ${project.color} group-hover:bg-[#3D2B1F] group-hover:text-white transition-colors`}>
                  <project.icon className="w-6 h-6 md:w-7 md:h-7" />
                </div>
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  project.percentage >= 100 ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-600'
                }`}>
                  {project.percentage >= 100 ? 'Budget Exceeded' : 'On Track'}
                </span>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-[#3D2B1F] mb-1">{project.name}</h3>
              <p className="text-stone-400 text-xs md:text-sm font-medium mb-6">{project.category}</p>
              
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-stone-400 font-medium">Spent</span>
                  <span className="text-[#3D2B1F] font-bold">₹{project.spent.toLocaleString()}</span>
                </div>
                <div className="w-full bg-stone-50 h-2 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ${project.percentage > 90 ? 'bg-rose-500' : 'bg-[#8B5E3C]'}`} 
                    style={{ width: `${project.percentage}%` }} 
                  />
                </div>
                <div className="flex justify-between text-[10px] md:text-xs">
                  <span className="text-stone-400">Budget: ₹{project.budget.toLocaleString()}</span>
                  <span className={`${project.percentage > 90 ? 'text-rose-600' : 'text-[#8B5E3C]'} font-bold`}>
                    {project.percentage.toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Project Expenses Table */}
        <div className="bg-white rounded-2xl md:rounded-3xl border border-stone-100 shadow-sm overflow-hidden">
          <div className="px-8 py-6 border-b border-stone-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h2 className="text-sm md:text-xl font-bold text-[#3D2B1F]">Recent Project Billings</h2>
            <div className="w-full md:w-auto relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-300" />
              <input 
                type="text" 
                placeholder="Search billings..." 
                className="w-full md:w-auto pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-100 rounded-xl text-xs outline-none focus:border-[#8B5E3C] transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-150">
              <thead className="bg-stone-50/50">
                <tr className="border-b border-stone-100">
                  <th className="px-8 py-4 text-[10px] font-bold text-stone-400 uppercase tracking-widest">Project</th>
                  <th className="px-8 py-4 text-[10px] font-bold text-stone-400 uppercase tracking-widest">Title</th>
                  <th className="px-8 py-4 text-[10px] font-bold text-stone-400 uppercase tracking-widest">Category</th>
                  <th className="px-8 py-4 text-[10px] font-bold text-stone-400 uppercase tracking-widest">Amount</th>
                  <th className="px-8 py-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-50">
                {projectBillings.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-8 py-10 text-center text-stone-400 font-medium">No project billings found.</td>
                  </tr>
                ) : (
                  projectBillings.map((bill) => (
                    <tr key={bill.id} className="group hover:bg-stone-50/30 transition-colors">
                      <td className="px-8 py-5 text-sm font-bold text-[#3D2B1F]">{bill.projectName}</td>
                      <td className="px-8 py-5 text-sm font-medium text-stone-600">{bill.title}</td>
                      <td className="px-8 py-5 text-sm font-medium text-stone-400">{bill.category}</td>
                      <td className="px-8 py-5 text-sm font-bold text-[#3D2B1F]">₹{bill.amount.toLocaleString()}</td>
                      <td className="px-8 py-5 text-center">
                        <button 
                          onClick={() => { if(window.confirm('Delete this billing?')) deleteExpense(bill.id) }}
                          className="p-2 text-stone-300 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <AddExpenseModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </main>
    </div>
  );
};

export default ProjectExpenses;

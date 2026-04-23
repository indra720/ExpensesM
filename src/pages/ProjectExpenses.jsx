import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Plus, 
  MoreVertical,
  Building2,
  Globe,
  Layers
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import AddExpenseModal from '../components/AddExpenseModal';

const ProjectExpenses = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const projects = [
    { id: 1, name: 'Eco Resort', category: 'Infrastructure', spent: '₹4,50,000', budget: '₹10,00,000', status: 'In Progress', icon: Building2, color: 'text-[#8B5E3C]' },
    { id: 2, name: 'App Revamp', category: 'Software', spent: '₹1,20,000', budget: '₹2,00,000', status: 'Completed', icon: Globe, color: 'text-stone-600' },
    { id: 3, name: 'Marketing', category: 'Marketing', spent: '₹75,000', budget: '₹1,50,000', status: 'In Progress', icon: Layers, color: 'text-stone-400' },
  ];

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
                  project.status === 'Completed' ? 'bg-emerald-50 text-emerald-600' : 'bg-stone-100 text-[#3D2B1F]'
                }`}>
                  {project.status}
                </span>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-[#3D2B1F] mb-1">{project.name}</h3>
              <p className="text-stone-400 text-xs md:text-sm font-medium mb-6">{project.category}</p>
              
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-stone-400 font-medium">Spent</span>
                  <span className="text-[#3D2B1F] font-bold">{project.spent}</span>
                </div>
                <div className="w-full bg-stone-50 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#8B5E3C] h-full rounded-full" style={{ width: '45%' }} />
                </div>
                <div className="flex justify-between text-[10px] md:text-xs">
                  <span className="text-stone-400">Target: {project.budget}</span>
                  <span className="text-[#8B5E3C] font-bold">45%</span>
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
              <input type="text" placeholder="Search billings..." className="w-full md:w-auto pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-100 rounded-xl text-xs outline-none focus:border-[#8B5E3C] transition-all" />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-150">
              <thead className="bg-stone-50/50">
                <tr className="border-b border-stone-100">
                  <th className="px-8 py-4 text-[10px] font-bold text-stone-400 uppercase tracking-widest">Project</th>
                  <th className="px-8 py-4 text-[10px] font-bold text-stone-400 uppercase tracking-widest">Vendor/Title</th>
                  <th className="px-8 py-4 text-[10px] font-bold text-stone-400 uppercase tracking-widest">Category</th>
                  <th className="px-8 py-4 text-[10px] font-bold text-stone-400 uppercase tracking-widest">Amount</th>
                  <th className="px-8 py-4 text-center"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-50">
                <tr className="group hover:bg-stone-50/30 transition-colors">
                  <td className="px-8 py-5 text-sm font-bold text-[#3D2B1F]">Eco Resort</td>
                  <td className="px-8 py-5 text-sm font-medium text-stone-600">Timber Supply</td>
                  <td className="px-8 py-5 text-sm font-medium text-stone-400">Materials</td>
                  <td className="px-8 py-5 text-sm font-bold text-[#3D2B1F]">₹45,000</td>
                  <td className="px-8 py-5 text-center">
                    <button className="p-2 text-stone-300 hover:text-stone-600 transition-colors"><MoreVertical className="w-5 h-5" /></button>
                  </td>
                </tr>
                <tr className="group hover:bg-stone-50/30 transition-colors">
                  <td className="px-8 py-5 text-sm font-bold text-[#3D2B1F]">App Revamp</td>
                  <td className="px-8 py-5 text-sm font-medium text-stone-600">Cloud Hosting</td>
                  <td className="px-8 py-5 text-sm font-medium text-stone-400">Infrastructure</td>
                  <td className="px-8 py-5 text-sm font-bold text-[#3D2B1F]">₹12,400</td>
                  <td className="px-8 py-5 text-center">
                    <button className="p-2 text-stone-300 hover:text-stone-600 transition-colors"><MoreVertical className="w-5 h-5" /></button>
                  </td>
                </tr>
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

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  Coffee,
  Car,
  ShoppingBag,
  MoreHorizontal,
  Calendar,
  Briefcase,
  BarChart3,
  Wallet,
} from "lucide-react";
import Sidebar from "../components/Sidebar";
import AddExpenseModal from "../components/AddExpenseModal";
import { useExpenses } from "../context/ExpenseContext";

const StatCard = ({ title, amount, trend, trendUp, icon: Icon }) => (
  <div className="bg-white p-6 rounded-2xl md:rounded-2.5rem border border-stone-100 shadow-sm hover:shadow-xl transition-all duration-500 group">
    <div className="flex flex-col md:flex-row justify-between items-start mb-4 gap-2">
      <div className="w-10 h-10 md:w-12 md:h-12 bg-stone-50 rounded-xl md:rounded-2xl flex  items-center justify-center text-[#3D2B1F] group-hover:bg-[#3D2B1F] group-hover:text-white transition-colors">
        <Icon className="w-5 h-5 md:w-6 md:h-6 " />
      </div>
      <div
        className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${trendUp ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"}`}
      >
        {trendUp ? (
          <ArrowUpRight className="w-3 h-3" />
        ) : (
          <ArrowDownRight className="w-3 h-3" />
        )}
        <p> {trend}</p>
      </div>
    </div>
    <p className="text-stone-400 text-xs font-medium mb-1">{title}</p>
    <h3 className="text-xl md:text-2xl font-bold text-[#3D2B1F]">{amount}</h3>
  </div>
);

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { expenses } = useExpenses();

  const getIcon = (category) => {
    switch (category) {
      case 'Fooding': return Coffee;
      case 'Local Transport': return Car;
      case 'Travelling': return TrendingUp;
      default: return ShoppingBag;
    }
  };

  const getColor = (category) => {
    switch (category) {
      case 'Fooding': return 'text-[#8B5E3C]';
      case 'Local Transport': return 'text-stone-600';
      case 'Travelling': return 'text-emerald-600';
      default: return 'text-blue-600';
    }
  };

  // Calculate stats
  const totalSpent = expenses.reduce((acc, exp) => acc + exp.amount, 0);
  const monthlySpent = expenses
    .filter(exp => new Date(exp.date).getMonth() === new Date().getMonth())
    .reduce((acc, exp) => acc + exp.amount, 0);

  return (
    <div className="min-h-screen bg-[#FDFCFB] flex flex-col lg:flex-row">
      <Sidebar />

      <main className="flex-1 p-6 mt-6 lg:mt-0   lg:ml-64">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-5 mt-14 md:mt-10 lg:mt-0">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-[#3D2B1F] tracking-tight">
              Financial Overview
            </h1>
            <p className="text-stone-500 font-medium mt-1 flex items-center gap-2 text-sm">
              <Calendar className="w-4 h-4" />
              {new Date().toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsModalOpen(true)}
            className="w-full md:w-auto bg-[#3D2B1F] text-white px-6 py-3.5 rounded-2xl flex items-center justify-center gap-3 shadow-lg font-bold"
          >
            <Plus className="w-5 h-5" />
            Add New Expense
          </motion.button>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-5">
          <StatCard
            title="Total Spent"
            amount={`₹${totalSpent.toLocaleString()}`}
            trend="+0.0%"
            trendUp={true}
            icon={Wallet}
          />
          <StatCard
            title="Monthly Spent"
            amount={`₹${monthlySpent.toLocaleString()}`}
            trend="Current"
            trendUp={true}
            icon={TrendingUp}
          />
          <StatCard
            title="Transactions"
            amount={expenses.length}
            trend={`+${expenses.length}`}
            trendUp={true}
            icon={Briefcase}
          />
          <StatCard
            title="Avg. Expense"
            amount={`₹${expenses.length > 0 ? (totalSpent / expenses.length).toFixed(2) : 0}`}
            trend="Live"
            trendUp={true}
            icon={BarChart3}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10">
          {/* Recent Transactions */}
          <section className="lg:col-span-2">
            <div className="flex justify-between items-center mb-6 px-2">
              <h2 className="text-xl font-bold text-[#3D2B1F]">
                Recent Transactions
              </h2>
              <button className="text-[#8B5E3C] text-sm font-bold hover:underline">
                View All
              </button>
            </div>

            <div className="overflow-x-auto -mx-2 px-2 pb-4">
              <div className="inline-block min-w-full  align-middle">
                <div className="space-y-4">
                  {expenses.length === 0 ? (
                    <p className="text-center py-10 text-stone-400 font-medium">No transactions yet. Add your first expense!</p>
                  ) : (
                    expenses.slice(0, 5).map((t) => {
                      const Icon = getIcon(t.category);
                      return (
                        <div
                          key={t.id}
                          className="min-w-75 bg-white p-4 md:p-5 rounded-2xl md:rounded-[4xl] border border-stone-100 flex items-center justify-between group hover:border-[#8B5E3C] transition-all shadow-sm"
                        >
                          <div className="flex items-center gap-4">
                            <div
                              className={`w-10 h-10 md:w-12 md:h-12 bg-stone-50 rounded-xl md:rounded-2xl flex items-center justify-center ${getColor(t.category)}`}
                            >
                              <Icon className="w-5 h-5" />
                            </div>
                            <div>
                              <p className="font-bold text-[#3D2B1F] text-sm md:text-base group-hover:text-[#8B5E3C] transition-colors">
                                {t.title}
                              </p>
                              <p className="text-[10px] md:text-xs text-stone-400 font-medium">
                                {t.category} • {new Date(t.date).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-base md:text-lg font-bold text-[#3D2B1F]">
                              ₹{t.amount}
                            </span>
                            <button className="p-1.5 text-stone-300 hover:text-stone-600 transition-colors">
                              <MoreHorizontal className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          </section>
          {/* ... (rest of the component like Spending Breakdown) */}

          {/* Category Breakdown */}
          <section>
            <div className="mb-6 px-2">
              <h2 className="text-xl font-bold text-[#3D2B1F]">
                Spending Breakdown
              </h2>
            </div>
            <div className="bg-[#3D2B1F] p-6 md:p-8 rounded-4xl md:rounded-[2.5rem] text-white shadow-xl">
              <div className="mb-8 text-center md:text-left">
                <p className="text-stone-400 text-sm font-medium mb-1">
                  Top Category
                </p>
                <h3 className="text-xl md:text-2xl font-bold italic underline decoration-[#8B5E3C] underline-offset-8">
                  Local Transport
                </h3>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-[10px] font-bold mb-2 uppercase tracking-widest text-stone-400">
                    <span>Fooding</span>
                    <span>35%</span>
                  </div>
                  <div className="w-full bg-stone-700 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#8B5E3C] h-full w-[35%] rounded-full" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[10px] font-bold mb-2 uppercase tracking-widest text-stone-400">
                    <span>Transport</span>
                    <span>48%</span>
                  </div>
                  <div className="w-full bg-stone-700 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#8B5E3C] h-full w-[48%] rounded-full" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[10px] font-bold mb-2 uppercase tracking-widest text-stone-400">
                    <span>Traveling</span>
                    <span>17%</span>
                  </div>
                  <div className="w-full bg-stone-700 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#8B5E3C] h-full w-[17%] rounded-full" />
                  </div>
                </div>
              </div>

              <button className="w-full mt-10 py-4 bg-white/10 hover:bg-white/20 border border-white/10 rounded-2xl text-xs font-bold transition-all uppercase tracking-widest">
                Generate Full Report
              </button>
            </div>
          </section>
        </div>

        <AddExpenseModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </main>
    </div>
  );
};

export default Dashboard;

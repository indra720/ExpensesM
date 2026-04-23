import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  Download,
  Coffee,
  Car,
  ShoppingBag,
  Utensils,
  Plane,
  MoreVertical,
} from "lucide-react";
import Sidebar from "../components/Sidebar";
import AddExpenseModal from "../components/AddExpenseModal";

const PersonalExpenses = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const transactions = [
    {
      id: 1,
      title: "Morning Starbucks",
      category: "Fooding",
      amount: "₹350.00",
      date: "Oct 22, 2023",
      icon: Coffee,
      color: "text-[#8B5E3C]",
      status: "Completed",
    },
    {
      id: 2,
      title: "Uber to Office",
      category: "Local Transport",
      amount: "₹220.00",
      date: "Oct 22, 2023",
      icon: Car,
      color: "text-stone-600",
      status: "Completed",
    },
    {
      id: 3,
      title: "Lunch at Haldirams",
      category: "Fooding",
      amount: "₹850.00",
      date: "Oct 21, 2023",
      icon: Utensils,
      color: "text-orange-600",
      status: "Completed",
    },
    {
      id: 4,
      title: "BigBasket Groceries",
      category: "Others",
      amount: "₹2,450.00",
      date: "Oct 20, 2023",
      icon: ShoppingBag,
      color: "text-emerald-600",
      status: "Pending",
    },
    {
      id: 5,
      title: "Flight to Delhi",
      category: "Travelling",
      amount: "₹4,200.00",
      date: "Oct 18, 2023",
      icon: Plane,
      color: "text-blue-600",
      status: "Completed",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FDFCFB] flex flex-col md:flex-row">
      <Sidebar />

      <main className="flex-1 p-6 lg:ml-64 mt-16  lg:mt-0">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-[#3D2B1F] tracking-tight">
              Personal Expenses
            </h1>
            <p className="text-stone-500 font-medium mt-1 text-sm">
              Track and manage your daily spends
            </p>
          </div>

          <div className="flex gap-4 w-full md:w-auto">
            <button className="flex-1 md:flex-none p-3.5 bg-white border border-stone-100 rounded-2xl text-stone-500 hover:text-[#3D2B1F] transition-all shadow-sm flex justify-center">
              <Download className="w-5 h-5" />
            </button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsModalOpen(true)}
              className="flex-3 md:flex-none bg-[#3D2B1F] text-white px-6 py-3.5 rounded-2xl flex items-center justify-center gap-3 shadow-lg font-bold"
            >
              Add Expense
            </motion.button>
          </div>
        </header>

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1 relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-300 group-focus-within:text-[#8B5E3C] transition-colors" />
            <input
              type="text"
              placeholder="Search expenses..."
              className="w-full bg-white border border-stone-100 rounded-3xl py-3.5 pl-12 pr-4 outline-none focus:border-[#8B5E3C] transition-all text-sm font-medium shadow-sm"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="flex items-center justify-center gap-2 px-6 py-3.5 bg-white border border-stone-100 rounded-3xl text-stone-500 font-bold text-sm shadow-sm hover:bg-stone-50 transition-all">
            <Filter className="w-4 h-4" />
            Filters
          </button>
        </div>

        {/* Expenses List */}
        <div className="bg-white rounded-2xl  border border-stone-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto ">
            <table className="w-full text-left border-collapse min-w-175 ">
              <thead>
                <tr className="bg-stone-50/50 border-b border-stone-100">
                  <th className="px-4 md:px-8 py-5 text-[10px] font-bold text-stone-400 uppercase tracking-widest whitespace-nowrap">
                    Transaction
                  </th>
                  <th className=" px-8 py-5 text-[10px] font-bold text-stone-400 uppercase tracking-widest whitespace-nowrap">
                    Category
                  </th>
                  <th className=" px-8 py-5 text-[10px] font-bold text-stone-400 uppercase tracking-widest whitespace-nowrap">
                    Date
                  </th>
                  <th className="px-4 md:px-8 py-5 text-[10px] font-bold text-stone-400 uppercase tracking-widest whitespace-nowrap">
                    Amount
                  </th>
                  <th className=" px-8 py-5 text-[10px] font-bold text-stone-400 uppercase tracking-widest whitespace-nowrap">
                    Status
                  </th>
                  <th className="px-4 md:px-8 py-5 text-center"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-50">
                {transactions.map((t) => (
                  <tr
                    key={t.id}
                    className="group hover:bg-stone-50/50 transition-colors cursor-pointer"
                  >
                    <td className="px-4 md:px-8 py-5">
                      <div className="flex items-center gap-3 md:gap-4">
                        <div
                          className={`w-8 h-8 md:w-10 md:h-10  bg-stone-50 rounded-xl flex items-center justify-center shrink-0 ${t.color}`}
                        >
                          <t.icon className="w-4 h-4 md:w-5 md:h-5" />
                        </div>
                        <span className="text-xs md:text-sm font-bold text-[#3D2B1F] group-hover:text-[#8B5E3C] transition-colors">
                          {t.title}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-5 text-sm font-medium text-stone-500">
                      {t.category}
                    </td>
                    <td className=" py-5 text-sm font-medium text-stone-500">
                      {t.date}
                    </td>
                    <td className="px-8 py-5">
                      <span className="text-base font-bold text-[#3D2B1F]">
                        {t.amount}
                      </span>
                    </td>
                    <td className="px-8 py-5">
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          t.status === "Completed"
                            ? "bg-emerald-50 text-emerald-600"
                            : "bg-amber-50 text-amber-600"
                        }`}
                      >
                        {t.status}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-center">
                      <button className="p-2 text-stone-300 hover:text-stone-600">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Placeholder */}
          <div className="px-8 py-5 border-t border-stone-100 flex flex-col md:flex-row justify-between items-center gap-4 bg-stone-50/30">
            <p className="text-xs text-stone-400 font-medium">
              Showing 5 of 124 transactions
            </p>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-white border border-stone-100 rounded-xl text-xs font-bold text-stone-400 hover:text-[#3D2B1F] transition-all">
                Previous
              </button>
              <button className="px-4 py-2 bg-[#3D2B1F] text-white rounded-xl text-xs font-bold shadow-md">
                Next
              </button>
            </div>
          </div>
        </div>

        <AddExpenseModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </main>
    </div>
  );
};

export default PersonalExpenses;

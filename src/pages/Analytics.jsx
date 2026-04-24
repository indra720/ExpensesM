import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';
import { 
  TrendingUp, 
  ArrowUpRight, 
  Download, 
  Calendar,
  Filter
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { useExpenses } from '../context/ExpenseContext';

const Analytics = () => {
  const { expenses } = useExpenses();

  // Process data for Bar Chart (Last 6 Months)
  const getMonthlyData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const last6Months = [];
    const now = new Date();

    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthName = months[d.getMonth()];
      const amount = expenses
        .filter(exp => {
          const expDate = new Date(exp.date);
          return expDate.getMonth() === d.getMonth() && expDate.getFullYear() === d.getFullYear();
        })
        .reduce((sum, exp) => sum + exp.amount, 0);
      
      last6Months.push({ name: monthName, amount });
    }
    return last6Months;
  };

  // Process data for Pie Chart (Category Breakdown)
  const getCategoryData = () => {
    const categoryTotals = expenses.reduce((acc, exp) => {
      acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
      return acc;
    }, {});

    const total = Object.values(categoryTotals).reduce((a, b) => a + b, 0);

    return Object.keys(categoryTotals).map(cat => ({
      name: cat,
      value: total > 0 ? Math.round((categoryTotals[cat] / total) * 100) : 0,
      rawAmount: categoryTotals[cat]
    }));
  };

  const barData = getMonthlyData();
  const pieData = getCategoryData().length > 0 ? getCategoryData() : [
    { name: 'No Data', value: 100 }
  ];

  const COLORS = ['#3D2B1F', '#8B5E3C', '#A67B5B', '#D9C5B2', '#5C4033'];

  const totalSpent = expenses.reduce((acc, exp) => acc + exp.amount, 0);

  return (
    <div className="min-h-screen bg-[#FDFCFB] flex">
      <Sidebar />
      
      <main className="flex-1 lg:ml-64 p-6 mt-16 lg:mt-0">
        <header className="flex flex-col md:flex-row justify-between md:items-end mb-4">
          <div>
            <h1 className="text-3xl font-extrabold text-[#3D2B1F] tracking-tight">Financial Analytics</h1>
            <p className="text-stone-500 font-medium mt-1">Deep dive into your spending patterns</p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4">
            <button className="flex items-center gap-2 px-6 py-3.5 bg-white border border-stone-100 rounded-2xl text-[#3D2B1F] font-bold text-sm shadow-sm hover:bg-stone-50 transition-all">
              <Calendar className="w-4 h-4" />
              Last 6 Months
            </button>
            <button className="bg-[#3D2B1F] text-white px-6 py-3.5 rounded-2xl flex items-center gap-3 shadow-lg shadow-stone-200 font-bold">
              <Download className="w-5 h-5" />
              Export Data
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-4">
          {/* Main Bar Chart */}
          <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-stone-100 shadow-sm">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-bold text-[#3D2B1F]">Monthly Spends</h2>
              <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm">
                <TrendingUp className="w-4 h-4" />
                Live Tracking
              </div>
            </div>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F1F1" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#A8A29E', fontSize: 12, fontWeight: 500 }}
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#A8A29E', fontSize: 12, fontWeight: 500 }}
                  />
                  <Tooltip 
                    cursor={{ fill: '#FDFCFB' }}
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar 
                    dataKey="amount" 
                    fill="#3D2B1F" 
                    radius={[10, 10, 0, 0]} 
                    barSize={40}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pie Chart */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-stone-100 shadow-sm">
            <h2 className="text-xl font-bold text-[#3D2B1F] mb-8">Category Breakdown</h2>
            <div className="h-64 w-full mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={8}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-3 h-40 overflow-y-auto no-scrollbar">
              {pieData.map((item, index) => (
                <div key={item.name} className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                    <span className="text-sm font-medium text-stone-500">{item.name}</span>
                  </div>
                  <span className="text-sm font-bold text-[#3D2B1F]">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Area Chart for Trends */}
        <div className="bg-[#3D2B1F] p-10 rounded-[2.5rem] text-white shadow-xl shadow-stone-300">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-2xl font-bold">Spending Trend</h2>
              <p className="text-stone-400 text-sm mt-1 font-medium">Visual representation of your cash flow</p>
            </div>
            <div className="text-right">
              <p className="text-stone-400 text-xs font-bold uppercase tracking-widest mb-1">Total Expenses</p>
              <h3 className="text-3xl font-extrabold">₹{totalSpent.toLocaleString()}</h3>
            </div>
          </div>
          <div className="h-48 w-full opacity-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={barData}>
                <defs>
                  <linearGradient id="colorAmt" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5E3C" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8B5E3C" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="amount" stroke="#8B5E3C" strokeWidth={4} fillOpacity={1} fill="url(#colorAmt)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Analytics;

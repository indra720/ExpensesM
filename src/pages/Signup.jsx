import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, Wallet } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/dashboard');
    }, 1500);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#FDFCFB] font-sans relative overflow-hidden px-4 py-6 md:px-8">
      {/* Decorative Brown Blobs */}
      <div className="absolute top-[-10%] left-[-5%] w-[30%] h-[30%] bg-[#8B5E3C] opacity-5 blur-[100px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[30%] h-[30%] bg-[#3D2B1F] opacity-5 blur-[100px] rounded-full" />

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="bg-white border border-stone-100 rounded-[4xl] md:rounded-[3rem] p-6 md:p-10 shadow-xl shadow-stone-200/50">
          <div className="text-center mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl font-extrabold text-[#3D2B1F] tracking-tight mb-1">Create Account</h1>
            <p className="text-stone-400 font-medium text-xs md:text-sm">Join our premium expanse community</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] md:text-xs font-bold text-[#3D2B1F] ml-1 uppercase tracking-wider">Full Name</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-300 group-focus-within:text-[#8B5E3C] transition-colors" />
                <input 
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-stone-50 border border-stone-100 text-[#3D2B1F] rounded-xl md:rounded-2xl py-3 md:py-3.5 pl-11 pr-4 outline-none focus:border-[#8B5E3C] focus:ring-1 focus:ring-[#8B5E3C] transition-all text-sm font-medium placeholder:text-stone-300"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] md:text-xs font-bold text-[#3D2B1F] ml-1 uppercase tracking-wider">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-300 group-focus-within:text-[#8B5E3C] transition-colors" />
                <input 
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-stone-50 border border-stone-100 text-[#3D2B1F] rounded-xl md:rounded-2xl py-3 md:py-3.5 pl-11 pr-4 outline-none focus:border-[#8B5E3C] focus:ring-1 focus:ring-[#8B5E3C] transition-all text-sm font-medium placeholder:text-stone-300"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] md:text-xs font-bold text-[#3D2B1F] ml-1 uppercase tracking-wider">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-300 group-focus-within:text-[#8B5E3C] transition-colors" />
                <input 
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-stone-50 border border-stone-100 text-[#3D2B1F] rounded-xl md:rounded-2xl py-3 md:py-3.5 pl-11 pr-4 outline-none focus:border-[#8B5E3C] focus:ring-1 focus:ring-[#8B5E3C] transition-all text-sm font-medium placeholder:text-stone-300"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="space-y-1 text-stone-300">
              <label className="text-[10px] md:text-xs font-bold text-[#3D2B1F] ml-1 uppercase tracking-wider">Confirm Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-300 group-focus-within:text-[#8B5E3C] transition-colors" />
                <input 
                  type="password"
                  name="confirmPassword"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full bg-stone-50 border border-stone-100 text-[#3D2B1F] rounded-xl md:rounded-2xl py-3 md:py-3.5 pl-11 pr-4 outline-none focus:border-[#8B5E3C] focus:ring-1 focus:ring-[#8B5E3C] transition-all text-sm font-medium placeholder:text-stone-300"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-[#3D2B1F] hover:bg-[#2A1D15] text-white font-bold py-3.5 md:py-4 rounded-xl md:rounded-2xl flex items-center justify-center gap-3 shadow-lg shadow-stone-200 transition-all mt-4 md:mt-6"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Get Started
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </motion.button>
          </form>

          <p className="text-center text-stone-400 mt-6 md:mt-8 font-medium text-xs md:text-sm">
            Already have an account? <Link to="/login" className="text-[#8B5E3C] font-bold hover:underline">Sign In</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, Wallet } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#FDFCFB] font-sans relative overflow-hidden px-4 py-4 md:px-8">
      {/* Decorative Brown Blobs */}
      <div className="absolute top-[-10%] left-[-5%] w-[30%] h-[30%] bg-[#8B5E3C] opacity-5 blur-[100px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[30%] h-[30%] bg-[#3D2B1F] opacity-5 blur-[100px] rounded-full" />

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="bg-white border border-stone-100 rounded-[4xl] md:rounded-[3rem] p-6 md:p-8 shadow-xl shadow-stone-200/50">
          <div className="text-center mb-6">
            <div className="w-12 h-12 bg-[#3D2B1F] rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg shadow-stone-200">
              <Wallet className="text-white w-6 h-6" />
            </div>
            <h1 className="text-2xl font-extrabold text-[#3D2B1F] tracking-tight mb-0.5">Welcome Back</h1>
            <p className="text-stone-400 font-medium text-xs">Manage your expanses with elegance</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-[#3D2B1F] ml-1 uppercase tracking-wider">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-300 group-focus-within:text-[#8B5E3C] transition-colors" />
                <input 
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-100 text-[#3D2B1F] rounded-xl py-3 md:py-3.5 pl-11 pr-4 outline-none focus:border-[#8B5E3C] focus:ring-1 focus:ring-[#8B5E3C] transition-all text-sm font-medium placeholder:text-stone-300"
                  placeholder="name@email.com"
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center ml-1">
                <label className="text-[10px] font-bold text-[#3D2B1F] uppercase tracking-wider">Password</label>
                <a href="#" className="text-[10px] font-bold text-[#8B5E3C] hover:underline">Forgot?</a>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-300 group-focus-within:text-[#8B5E3C] transition-colors" />
                <input 
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-100 text-[#3D2B1F] rounded-xl py-3 md:py-3.5 pl-11 pr-4 outline-none focus:border-[#8B5E3C] focus:ring-1 focus:ring-[#8B5E3C] transition-all text-sm font-medium placeholder:text-stone-300"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-[#3D2B1F] hover:bg-[#2A1D15] text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-3 shadow-lg shadow-stone-200 transition-all mt-4"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </motion.button>
          </form>

          <div className="mt-6 md:mt-8">
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-stone-100"></div></div>
              <div className="relative flex justify-center text-[9px] uppercase font-bold tracking-widest text-stone-300"><span className="bg-white px-4">Or continue with</span></div>
            </div>

            <button className="w-full flex items-center justify-center gap-3 bg-white border border-stone-100 text-[#3D2B1F] font-bold rounded-xl py-3 hover:bg-stone-50 transition-all text-xs md:text-sm shadow-sm">
              <svg className="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24">
                <path fill="#EA4335" d="M12.48 10.92v3.28h7.84c-.24 1.84-.908 3.152-1.928 4.176-1.288 1.288-3.312 2.712-7.392 2.712-6.416 0-11.456-5.184-11.456-11.6s5.04-11.6 11.456-11.6c3.456 0 6.192 1.376 8.04 3.144l2.304-2.304C19.216 1.456 16.32 0 12.48 0 5.68 0 0 5.68 0 12.48s5.68 12.48 12.48 12.48c3.704 0 6.504-1.208 8.704-3.512 2.264-2.264 2.968-5.416 2.968-7.912 0-.768-.064-1.496-.184-2.144H12.48z" />
              </svg>
              Sign in with Google
            </button>
          </div>

          <p className="text-center text-stone-400 mt-6 font-medium text-xs md:text-sm">
            New here? <Link to="/signup" className="text-[#8B5E3C] font-bold hover:underline">Create Account</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;

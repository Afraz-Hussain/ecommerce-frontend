import React, { useState } from "react";
import { Mail, X, Send, Sparkles, CheckCircle2 } from "lucide-react";

const NewsLetter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    // Handle API logic here
    setSubscribed(true);
    setTimeout(() => {
      setIsOpen(false);
      setSubscribed(false);
      setEmail("");
    }, 3000);
  };

  return (
    <div className="fixed bottom-8 left-8 z-[100] font-sans">
      {!isOpen ? (
        /* MINI FLOATING TRIGGER */
        <button
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-3 bg-gray-900 text-white pl-4 pr-6 py-4 rounded-full shadow-2xl hover:bg-indigo-600 transition-all duration-500 animate-bounce hover:animate-none"
        >
          <div className="bg-indigo-500 p-2 rounded-full group-hover:bg-white group-hover:text-indigo-600 transition-colors">
            <Mail size={18} />
          </div>
          <span className="text-sm font-bold tracking-tight">Get 10% Off</span>
        </button>
      ) : (
        /* EXPANDED NEWSLETTER CARD */
        <div className="relative w-[350px] bg-white rounded-[2.5rem] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.2)] border border-gray-100 animate-in slide-in-from-bottom-10 fade-in duration-500">
          
          {/* Close Button */}
          <button 
            onClick={() => setIsOpen(false)}
            className="absolute top-5 right-5 text-gray-400 hover:text-black transition-colors"
          >
            <X size={20} />
          </button>

          {!subscribed ? (
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-indigo-600 mb-1">
                  <Sparkles size={16} />
                  <span className="text-[10px] font-black uppercase tracking-widest">Insider Access</span>
                </div>
                <h3 className="text-3xl font-black text-gray-900 tracking-tighter leading-none">
                  Join the <br /> Inner Circle.
                </h3>
                <p className="text-gray-500 text-sm font-medium leading-relaxed">
                  Subscribe to receive early access to drops and a 10% discount on your first order.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="yourname@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-gray-50 border-2 border-transparent px-5 py-4 rounded-2xl text-sm focus:bg-white focus:border-indigo-600 outline-none transition-all"
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full bg-gray-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-600 transition-all active:scale-95 shadow-lg shadow-indigo-100"
                >
                  Subscribe <Send size={16} />
                </button>
              </form>
              
              <p className="text-[10px] text-center text-gray-400 font-medium">
                By joining, you agree to our Terms & Privacy Policy.
              </p>
            </div>
          ) : (
            /* SUCCESS STATE */
            <div className="py-10 text-center space-y-4 animate-in zoom-in-95 duration-300">
              <div className="bg-emerald-100 text-emerald-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 size={32} />
              </div>
              <h3 className="text-2xl font-black text-gray-900 tracking-tight">Check your inbox!</h3>
              <p className="text-gray-500 text-sm font-medium">Your discount code is on its way.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NewsLetter;

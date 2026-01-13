import React, { useState, useEffect } from "react";
import { ArrowUpRight, Heart, Sparkles, Star, TrendingUp, Zap } from "lucide-react";

const OnSaleSec = () => {
  const [products, setProducts] = useState([]);
  const [activeID, setActiveID] = useState(null);

  const BASE_URL = `${import.meta.env.VITE_API_URL}/backend/product/viewallproducts`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(BASE_URL);
        const data = await res.json();
        setProducts(data.data?.slice(0, 4) || []);
      } catch (err) {
        console.error("Gallery fetch failed", err);
      }
    };
    fetchData();
  }, [BASE_URL]);

  return (
    <div className=" mt-10 rounded-sm w-full py-30  mb-20
    bg-gradient-to-br from-slate-950 via-indigo-950
     to-purple-950 font-sans relative overflow-hidden">
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-20 w-96 h-96
         bg-indigo-500 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-20 right-20 
        w-80 h-80 bg-purple-500 rounded-full blur-[120px] animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-72 
        h-72 bg-pink-500 rounded-full blur-[100px] animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)',
        backgroundSize: '50px 50px'
      }}></div>
      
      <div className="max-w-[1800px] mx-auto px-8 relative z-10">
        
        {/* Section Header - Futuristic */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-20 gap-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-6 py-3 rounded-full text-xs font-black uppercase tracking-[0.3em] shadow-2xl shadow-indigo-500/50 animate-pulse">
                <Sparkles size={16} className="animate-spin" style={{animationDuration: '3s'}} />
                <span>2026 Collection</span>
                <Zap size={16} />
              </div>
              <div className="px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white text-xs font-bold flex items-center gap-2">
                <TrendingUp size={14} />
                <span>Trending Now</span>
              </div>
            </div>
            
            <h2 className="text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] mb-6">
              <span className="bg-gradient-to-r from-white via-indigo-200 to-purple-300 bg-clip-text text-transparent">
                The Future
              </span>
              <br />
              <span className="text-white italic">of Luxury</span>
            </h2>
            
            <p className="text-indigo-200 text-xl font-light max-w-2xl leading-relaxed">
              Experience transcendent design where innovation meets artistry. Every piece crafted for those who dare to stand out.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="flex gap-4">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 min-w-[140px]">
              <div className="text-4xl font-black text-white mb-1">4.9</div>
              <div className="flex items-center gap-1 mb-2">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} size={12} className="fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <div className="text-indigo-300 text-xs font-semibold">Customer Rating</div>
            </div>
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 min-w-[140px]">
              <div className="text-4xl font-black text-white mb-1">12K+</div>
              <div className="text-indigo-300 text-xs font-semibold mt-3">Happy Customers</div>
            </div>
          </div>
        </div>

        {/* Diagonal Staggered Grid */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((p, idx) => {
              // Create diagonal stagger effect with transform
              const staggerDelay = idx * 150;
              const diagonalOffset = idx * 60;
              
              return (
                <div 
                  key={p._id}
                  onMouseEnter={() => setActiveID(p._id)}
                  onMouseLeave={() => setActiveID(null)}
                  className="group relative"
                  style={{
                    animation: 'slideInDiagonal 0.8s ease-out forwards',
                    animationDelay: `${staggerDelay}ms`,
                    opacity: 0,
                    transform: `translateY(${diagonalOffset}px)`
                  }}
                >
                  {/* Card Container with 3D Transform */}
                  <div className={`relative h-[500px] rounded-[2.5rem] overflow-hidden transition-all duration-700 ${
                    activeID === p._id 
                      ? 'scale-105 rotate-0 shadow-2xl shadow-indigo-500/40' 
                      : 'scale-100 hover:scale-[1.02] shadow-xl shadow-black/30'
                  }`}
                  style={{
                    transform: activeID === p._id ? 'perspective(1000px) rotateY(0deg)' : 'perspective(1000px) rotateY(-2deg)',
                  }}>
                    
                    {/* Holographic Border Effect */}
                    <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 p-[2px]">
                      <div className="w-full h-full bg-slate-900 rounded-[2.4rem] overflow-hidden">
                        
                        {/* Product Image */}
                        <img 
                         src={`${import.meta.env.VITE_API_URL}/${p.images?.[0]}`}
                          alt={p.title}
                          className={`w-full h-full object-cover transition-all duration-1000 ${
                            activeID === p._id ? 'scale-110 brightness-110' : 'scale-100'
                          }`}
                        />

                        {/* Gradient Overlay */}
                        <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent transition-opacity duration-500 ${
                          activeID === p._id ? 'opacity-100' : 'opacity-60'
                        }`}></div>

                        {/* Premium Badge */}
                        <div className="absolute top-6 left-6 flex gap-2">
                          <div className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black rounded-full text-xs font-black uppercase tracking-wider shadow-lg flex items-center gap-1">
                            <Star size={12} className="fill-current" />
                            <span>Premium</span>
                          </div>
                        </div>

                        {/* Favorite Button */}
                        <button className={`absolute top-6 right-6 p-4 rounded-2xl backdrop-blur-xl border transition-all duration-500 ${
                          activeID === p._id 
                            ? 'bg-white text-red-500 border-white scale-110' 
                            : 'bg-white/10 text-white border-white/20 scale-100'
                        }`}>
                          <Heart size={20} fill={activeID === p._id ? "currentColor" : "none"} strokeWidth={2.5} />
                        </button>

                        {/* Product Info Card - Slides Up */}
                        <div className={`absolute bottom-0 left-0 right-0 p-8 transition-all duration-700 ${
                          activeID === p._id ? 'translate-y-0' : 'translate-y-4'
                        }`}>
                          
                          {/* Glass Card */}
                          <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-6 shadow-2xl">
                            
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="text-xs font-bold text-indigo-300 uppercase tracking-widest">
                                    {p.category?.name || 'Exclusive'}
                                  </span>
                                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-400"></div>
                                  <span className="text-xs text-white/60">Limited Edition</span>
                                </div>
                                
                                <h4 className="text-2xl font-black text-white tracking-tight leading-tight mb-3">
                                  {p.title}
                                </h4>
                                
                                <div className="flex items-baseline gap-3 mb-4">
                                  <span className="text-3xl font-black bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent">
                                    Rs {p.price}
                                  </span>
                                  <span className="text-sm text-white/40 line-through">
                                    Rs {Math.round(p.price * 1.3)}
                                  </span>
                                </div>

                                {/* Rating */}
                                <div className="flex items-center gap-2">
                                  <div className="flex items-center gap-0.5">
                                    {[1,2,3,4,5].map(i => (
                                      <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
                                    ))}
                                  </div>
                                  <span className="text-xs text-white/60 font-semibold">5.0 (2.4k reviews)</span>
                                </div>
                              </div>
                            </div>

                            {/* CTA Button */}
                            <button className={`w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-4 rounded-2xl font-black text-sm uppercase tracking-wider shadow-lg flex items-center justify-center gap-3 group/btn transition-all duration-500 ${
                              activeID === p._id ? 'scale-100 opacity-100' : 'scale-95 opacity-90'
                            } hover:shadow-2xl hover:shadow-indigo-500/50`}>
                              <span>Discover More</span>
                              <ArrowUpRight size={20} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Floating particles effect */}
                  <div className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ${
                    activeID === p._id ? 'opacity-100' : 'opacity-0'
                  }`}>
                    <div className="absolute top-10 right-10 w-2 h-2 bg-indigo-400 rounded-full animate-ping"></div>
                    <div className="absolute bottom-20 left-10 w-2 h-2 bg-purple-400 rounded-full animate-ping" style={{animationDelay: '0.5s'}}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA Section */}
        <div className="mt-20 text-center">
          <p className="text-indigo-300 text-sm font-semibold uppercase tracking-[0.3em] mb-6">
            Join the Revolution
          </p>
          <button className="group  px-16 py-6 bg-white text-slate-900 rounded-full font-black text-lg shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-500 flex items-center gap-4 mx-auto relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <span className="relative z-10 group-hover:text-white transition-colors">Explore Full Collection</span>
            <ArrowUpRight size={24} className="relative z-10 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform group-hover:text-white" />
          </button>
        </div>
      </div>

      {/* Custom Keyframe Animations */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800;900&display=swap');
        * { font-family: 'Inter', sans-serif; }
        
        @keyframes slideInDiagonal {
          from {
            opacity: 0;
            transform: translate(-50px, 100px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translate(0, var(--offset, 0)) scale(1);
          }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </div>
  );
};

export default OnSaleSec;
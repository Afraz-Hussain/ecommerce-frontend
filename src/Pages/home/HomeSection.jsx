import React, { useState, useEffect } from "react";
import axios from "axios";
import { ArrowRight, Sparkles } from "lucide-react"; 
import { Link } from "react-router-dom";

const HomeSection = () => {
  const BASE_URL = `${process.env.REACT_APP_API_URL}/cate/allcats`;
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(BASE_URL);
        setCategories(res.data || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="w-full bg-[#fafafa] min-h-screen font-sans">
      
      <div className="relative group px-4 py-6 max-w-[1400px] mx-auto">
        <div className="relative h-[450px] w-full overflow-hidden rounded-[2.5rem] shadow-2xl">
          <img
            src="imgs/banner3.jpg"
            alt="banner"
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          {/* Hero Content Overlay */}
          <div className="absolute inset-0 bg-black/50 flex flex-col justify-center px-12 text-white">
            <div className="flex items-center gap-2 mb-4 bg-white/20 backdrop-blur-md w-fit px-4 py-1 rounded-full border border-white/30">
              <Sparkles size={16} className="text-yellow-300" />
              <span className="text-xs font-bold tracking-widest uppercase">New Collection 2026</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter max-w-2xl mb-6 leading-tight">
              Elevate Your <br /> Essentials Style.
            </h1>
            <Link to="/shop">
            <button className="flex items-center gap-3 bg-white text-black px-8 py-4 rounded-2xl font-bold w-fit hover:bg-indigo-600 hover:text-white transition-all duration-300 shadow-xl active:scale-95">
              Explore Now <ArrowRight size={20} />
            </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-16 max-w-7xl mx-auto px-6 pb-20">
        <div className="flex justify-between items-end mb-10">
          <div>
            <p className="text-indigo-600 font-black text-sm uppercase tracking-[0.3em] mb-2">Curated Selection</p>
            <h2 className="text-4xl font-black text-gray-900 tracking-tighter">Shop by Category</h2>
          </div>
          <Link to="/shop">
          <button className="text-sm font-bold border-b-2 border-black pb-1 hover:text-indigo-600 hover:border-indigo-600 transition-all">
            View All Collections
          </button>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            [1, 2, 3].map((n) => (
              <div key={n} className="h-80 w-full bg-gray-200 animate-pulse rounded-3xl" />
            ))
          ) : (
            categories.slice(0,3).map((cat, index) => (
              <div
                key={cat._id || index}
                className="group relative h-[400px] w-full overflow-hidden rounded-[2rem] cursor-pointer bg-white"
              >
               
                <img
                  src={cat.image || `picsum.photos{index}/600/800`}
                  alt={cat.cateName}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
              
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500 opacity-80 group-hover:opacity-100" />

               
                <div className="absolute bottom-0 left-0 p-8 w-full transform transition-transform duration-500 group-hover:-translate-y-2">
                  <div className="flex justify-between items-end">
                    <div>
                      <span className="text-white/60 text-xs font-bold tracking-widest uppercase mb-1 block">
                        Collection
                      </span>
                      <h3 className="text-2xl font-black text-white tracking-tight">
                        {cat.cateName}
                      </h3>
                    </div>
                    <div className="bg-white p-3 rounded-xl transform translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                      <ArrowRight size={20} className="text-black" />
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <style>{`
        @import url('fonts.googleapis.com');
        .font-sans { font-family: 'Inter', sans-serif; }
      `}</style>
    </div>
  );
};

export default HomeSection;

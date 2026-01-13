import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Categs = () => {
  const base_URL=`${import.meta.env.VITE_API_URL}/backend`;
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  // Get current category from URL to highlight it
  const queryParams = new URLSearchParams(location.search);
  const activeCat = queryParams.get("category");

  useEffect(() => {
    const fetchAllCategories = async () => {
      try {
        const res = await axios.get(`${base_URL}/cate/allcats`);
        setCats(res.data);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAllCategories();
  }, [base_URL]);

  return (
    <nav className="bg-white/50 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        {/* Scrollable Container for Mobile */}
        <div className="flex items-center justify-start md:justify-center overflow-x-auto no-scrollbar py-3 gap-2 md:gap-8">
          
          {loading ? (
            // Skeleton Loader while data is fetching
            [1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-8 w-20 bg-gray-100 animate-pulse rounded-full" />
            ))
          ) : (
            <>
              

              {cats.map((itm) => {
                const isActive = activeCat === itm._id;
                return (
                  <div key={itm._id} className="relative group">
                    <Link
                      to={`/shop?category=${itm._id}`}
                      className={`whitespace-nowrap px-1 py-2 text-xs font-bold uppercase tracking-widest transition-all duration-300 flex flex-col items-center ${
                        isActive ? "text-indigo-600" : "text-gray-500 hover:text-gray-900"
                      }`}
                    >
                      {itm.cateName}
                      
                      {/* Animated Underline */}
                      <span className={`h-[2px] bg-indigo-600 transition-all duration-300 mt-1 ${
                        isActive ? "w-full" : "w-0 group-hover:w-1/2"
                      }`} />
                    </Link>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>

      {/* Global CSS to hide scrollbar but keep functionality */}
      <style dangerouslySetInnerHTML={{ __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </nav>
  );
};

export default Categs;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { ArrowLeft, ArrowRight, Star, ShoppingCart, Percent } from "lucide-react";

const Onsale = () => {
  // Use the name 'featuredProducts' to make state clearer
  const [featuredProducts, setFeaturedProducts] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const itemsPerPage = 4;
  const BASE_URL = process.env.VITE_API_URL + "/backend/product/viewallproducts";

  useEffect(() => {
    const fetchOnSale = async () => {
      try {
        const res = await axios.get(BASE_URL);
        // 🔥 FILTER LOGIC: Only show products where isFeatured is true
        const filteredItems = (res.data.data || []).filter(p => p.isFeatured === true);
        setFeaturedProducts(filteredItems);
        setLoading(false);
      } catch (error) {
        console.error("Sale fetch failed", error);
        setLoading(false);
      }
    };
    fetchOnSale();
  }, []);

  const next = () => {
    if (index + itemsPerPage < featuredProducts.length) setIndex(index + itemsPerPage);
  };
  const prev = () => {
    if (index > 0) setIndex(index - itemsPerPage);
  };

  return (
    // Use font-serif for that magazine aesthetic you liked
    <div className="w-full mt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-serif">
      
      {/* Header with Navigation Controls */}
      <div className="flex justify-between items-end mb-10 border-b pb-8 border-gray-900">
        <div className="text-gray-900">
          <p className="text-sm font-semibold uppercase tracking-widest text-red-600 mb-2">Flash Sale</p>
          <h2 className="text-5xl font-black italic tracking-tighter">50% Off Today</h2>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={prev}
            disabled={index === 0}
            className="p-3 border border-gray-300 rounded-full transition-colors hover:bg-gray-900 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ArrowLeft size={20} />
          </button>
          <button
            onClick={next}
            disabled={index + itemsPerPage >= featuredProducts.length}
            className="p-3 border border-gray-300 rounded-full transition-colors hover:bg-gray-900 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ArrowRight size={20} />
          </button>
        </div>
      </div>

      {/* Products Grid (Horizontal Scroll Effect) */}
      {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {featuredProducts.map(n => (
                  <div key={n} className="h-96 bg-gray-100 rounded-lg animate-pulse" />
              ))}
          </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {featuredProducts.slice(index, index + itemsPerPage).map((p) => (
            <div
              key={p._id}
              className="group flex flex-col p-0 overflow-hidden"
            >
              {/* Image Container with Zoom */}
              <div className="relative h-80 w-full overflow-hidden mb-6 rounded-lg bg-gray-50">
                <img
                 src={`${process.env.VITE_API_URL}/${p.images?.[0]}`}
                  alt={p.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
                    <Percent size={12} /> SALE
                </div>
              </div>

              {/* Product Info - Minimalist Text */}
              <h3 className="text-lg font-bold tracking-tight text-gray-900 mb-1 leading-snug">
                {p.title}
              </h3>
              <p className="text-sm text-gray-500 mb-3">{p.category?.name || 'Category'}</p>

              {/* Price and Add to Cart */}
              <div className="flex justify-between items-center mt-auto">
                <div className="flex items-end gap-2">
                    <p className="text-xl font-black text-red-600">
                        Rs {p.price / 2}
                    </p>
                    <p className="text-sm text-gray-400 line-through mb-0.5">Rs {p.price}</p>
                </div>
                <button className="p-3 rounded-full bg-gray-900 text-white hover:bg-red-600 transition-all shadow-md active:scale-90">
                    <ShoppingCart size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Global CSS for Font */}
      <style>{`
       @import url('https://fonts.googleapis.com/css2?family=Playfair+Display&display=swap');

      `}</style>
    </div>
  );
};

export default Onsale;

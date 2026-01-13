import React, { useState, useEffect } from "react";
import axios from "axios";
import { ArrowLeft, ArrowRight, Star, ShoppingCart } from "lucide-react";

const TrendingProducts = () => {
  const BASE_URL = `${process.env.REACT_APP_API_URL}/product/viewallproducts`;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const itemsPerPage = 4;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(BASE_URL);
        // Assuming the data path is correct: res.data.data
        setProducts(res.data.data || []);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const next = () => {
    if (index + itemsPerPage < products.length) {
      setIndex(index + itemsPerPage);
    }
  };

  const prev = () => {
    if (index > 0) {
      setIndex(index - itemsPerPage);
    }
  };

  return (
    <div className="w-full mt-4 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto font-serif mb-10">
      
      {/* Header with Navigation Controls */}
      <div className="flex justify-between items-end mb-10 border-b pb-8 border-gray-900">
        <div className="text-gray-900">
          <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600 mb-2">Editor's Picks</p>
          <h2 className="text-5xl font-black italic tracking-tighter">Trending Products</h2>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={prev}
            disabled={index === 0}
            className="p-3 border border-gray-300 rounded-full transition-colors
             hover:bg-gray-900 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ArrowLeft size={20} />
          </button>
          <button
            onClick={next}
            disabled={index + itemsPerPage >= products.length}
            className="p-3 border border-gray-300 rounded-full
             transition-colors hover:bg-gray-900 hover:text-white 
             disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ArrowRight size={20} />
          </button>
        </div>
      </div>

      {/* Products Grid (Horizontal Scroll Effect) */}
      {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map(n => (
                  <div key={n} className="h-96 bg-gray-100 rounded-lg animate-pulse" />
              ))}
          </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {products.slice(index, index + itemsPerPage).map((p) => (
            <div
              key={p._id}
              className="group flex flex-col p-0 overflow-hidden"
            >
          
              <div className="relative h-60 w-full overflow-hidden mb-6 rounded-lg bg-gray-50">
                <img
                  src={`${process.env.REACT_APP_API_URL}/${p.images?.[0]}`}
                  alt={p.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
              </div>

              
              <h3 className="text-lg font-bold tracking-tight text-gray-900 mb-1 leading-snug">
                {p.title}
              </h3>
              <p className="text-sm text-gray-500 mb-3">{p.category?.name || 'Category'}</p>

      
              <div className="flex justify-between items-center mt-auto">
                <p className="text-xl font-black text-indigo-600">
                  Rs {p.price}
                </p>
                <button className="p-3 rounded-full bg-gray-900 text-white hover:bg-indigo-600 transition-all shadow-md active:scale-90">
                    <ShoppingCart size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <style>{`
        @import url('fonts.googleapis.com');
        .font-serif { font-family: 'Playfair Display', serif; }
      `}</style>
    </div>
  );
};

export default TrendingProducts;

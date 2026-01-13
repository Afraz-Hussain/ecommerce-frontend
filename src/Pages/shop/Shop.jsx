import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Filter, X, Search, ShoppingBag, Heart, Star, 
  Sparkles, Zap, LayoutGrid, List, ArrowUpRight 
} from "lucide-react";

const Shop = ({ Filters }) => {
  const navigate = useNavigate();
  const [sort, setSort] = useState("new");
  const [products, setProducts] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [hoveredProduct, setHoveredProduct] = useState(null);

  // Use import.meta.env for Vite
  const API_URL = import.meta.env.VITE_API_URL;

  const fetchFilteredProducts = async (filters = {}) => {
    try {
      const params = new URLSearchParams();
      if (filters.category?.length) params.append("category", filters.category.join(","));
      if (filters.minPrice) params.append("minPrice", filters.minPrice);
      if (filters.maxPrice) params.append("maxPrice", filters.maxPrice);

      // Construct the full URL properly
      const res = await fetch(`${API_URL}/backend/product/filterproducts?${params.toString()}`);
      const data = await res.json();
      setProducts(data.data || []);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => { 
    fetchFilteredProducts(); 
  }, [API_URL]); // Added dependency

  const handleProductClick = (productId) => {
    navigate(`/singlepage/${productId}`);
  };

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans pb-20">
      {/* Immersive Hero Banner - FIXED URL */}
      <div className="relative h-[400px] overflow-hidden">
        <img
          src="images.unsplash.com" 
          alt="banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/90 via-purple-900/80 to-pink-900/90"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4 text-center leading-none italic">
            THE <span className="not-italic bg-gradient-to-r from-indigo-200 to-white bg-clip-text text-transparent">SHOP COLLECTION</span>
          </h1>
          <p className="text-indigo-200 font-medium">Curated Essentials 2026</p>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 -mt-12 relative z-10">
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Filters Panel */}
          {Filters && (
            <div className="hidden lg:block w-72 flex-shrink-0">
              <div className="sticky top-28 bg-white border border-gray-100 rounded-[2rem] p-6 shadow-2xl shadow-indigo-100/30">
                <Filters onFilterChange={fetchFilteredProducts} />
              </div>
            </div>
          )}

          {/* Main Content */}
          <section className="flex-1">
            <div className="bg-white/80 backdrop-blur-xl border border-gray-100 rounded-[1.5rem] p-5 mb-8 shadow-sm flex justify-between items-center">
              <h2 className="text-xl font-black text-gray-900">
                {products.length} <span className="text-indigo-600 font-bold text-sm uppercase tracking-widest ml-2">Items</span>
              </h2>
              <div className="flex gap-3">
                 <select 
                    className="bg-gray-50 border-none px-4 py-2 rounded-xl font-bold text-xs outline-none"
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                 >
                    <option value="new">Latest Drops</option>
                    <option value="price-low">Price: Low-High</option>
                 </select>
              </div>
            </div>

            <div className={`grid gap-8 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
              {products.map((p) => (
                <div
                  key={p._id}
                  onClick={() => handleProductClick(p._id)}
                  onMouseEnter={() => setHoveredProduct(p._id)}
                  onMouseLeave={() => setHoveredProduct(null)}
                  className="group bg-white rounded-[2rem] p-4 border border-gray-50 shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer"
                >
                  <div className="relative h-80 w-full overflow-hidden rounded-[1.5rem] bg-gray-50 mb-5">
                    <img
                      // FIXED IMAGE PATH: Ensure this matches where your backend stores images
                      src={`${API_URL}/${p.images?.[0]}`}
                      alt={p.title}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                      onError={(e) => { e.target.src = "via.placeholder.com"; }}
                    />
                    
                    <div className={`absolute inset-0 bg-indigo-900/10 backdrop-blur-[2px] flex items-center justify-center transition-all duration-500 ${hoveredProduct === p._id ? 'opacity-100' : 'opacity-0'}`}>
                      <div className="bg-white text-indigo-900 p-4 rounded-full shadow-2xl transform translate-y-6 group-hover:translate-y-0 transition-transform">
                        <ArrowUpRight size={24} />
                      </div>
                    </div>
                  </div>

                  <div className="px-1 space-y-2">
                    <div className="flex justify-between items-start">
                      <h3 className="text-md font-black text-gray-900 tracking-tight uppercase truncate max-w-[80%]">
                        {p.title}
                      </h3>
                      <div className="flex items-center gap-1 text-yellow-400">
                        <Star size={12} fill="currentColor" />
                        <span className="text-[10px] font-bold text-gray-400">4.9</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-1">
                      <p className="text-xl font-black text-indigo-600 italic">
                        Rs {p.price?.toLocaleString()}
                      </p>
                      <button className="bg-gray-900 text-white p-2.5 rounded-xl hover:bg-indigo-600 transition-all shadow-sm">
                        <ShoppingBag size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Shop;

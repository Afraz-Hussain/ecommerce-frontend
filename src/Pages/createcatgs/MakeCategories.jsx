import React, { useState } from "react";
import axios from "axios";
import { PlusCircle, Loader2, Tag } from "lucide-react"; // Optional: npm i lucide-react

const MakeCategories = () => {
  const [catname, setcatname] = useState("");
  const [loading, setLoading] = useState(false);

  const makecate = async () => {
    if (!catname.trim()) return;

    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.REACT_APP_API_URL}/cate/createcate`,
        { cateName: catname },
        { 
          withCredentials: true,
          headers: { 'Content-Type': 'application/json' }
        }
      );
      
      setcatname("");
      // You could replace alert with a toast library like react-hot-toast
      alert("Category created successfully! 🎉");
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Failed to create category");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[300px] p-4">
      <div className="w-full max-w-md p-8 transition-all duration-300 bg-white border border-gray-100 shadow-2xl rounded-3xl hover:shadow-indigo-100/50">
        
        {/* Header */}
        <div className="flex items-center mb-6 space-x-3">
          <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
            <Tag size={24} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 tracking-tight">
            New Category
          </h2>
        </div>

        <div className="space-y-5">
          {/* Input Group */}
          <div className="relative">
            <input
              type="text"
              placeholder="e.g. Summer Collection"
              value={catname}
              onChange={(e) => setcatname(e.target.value)}
              className="w-full px-5 py-4 text-gray-700 transition-all bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 placeholder:text-gray-400"
            />
          </div>

          {/* Button */}
          <button
            onClick={makecate}
            disabled={loading || !catname.trim()}
            className="group relative w-full flex items-center justify-center py-4 px-6 font-semibold text-white transition-all duration-200 bg-indigo-600 rounded-2xl hover:bg-indigo-700 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:active:scale-100 shadow-lg shadow-indigo-200"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <span className="mr-2">Create Category</span>
                <PlusCircle className="w-5 h-5 transition-transform group-hover:rotate-90" />
              </>
            )}
          </button>
        </div>

        {/* Subtle Footer Hint */}
        <p className="mt-4 text-xs text-center text-gray-400">
          Press enter to quickly save your category
        </p>
      </div>
    </div>
  );
};

export default MakeCategories;

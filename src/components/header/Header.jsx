import React, { useState,useEffect } from "react";
import { ShoppingCart, Search, ChevronDown, User, LogOut, Package, ShieldCheck, Store, PlusSquare } from "lucide-react";
import Categs from "./Categs";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useSelector } from "react-redux";

const Header = () => {
  const { user, logout } = useAuth();
  const cartCounter = useSelector((state) => state.cart.totalQuantity);
  const [showDropdown, setShowDropdown] = useState(false);

  // Check user roles
  const isSeller = user?.roles?.some(role => role.roleName === "seller");
  const isSuperAdmin = user?.roles?.some(role => role.roleName === "superadmin");
  const isAdmin = user?.roles?.some(role => role.roleName === "admin");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // If scroll is more than 80px, hide the top part
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <header className="sticky top-0 z-50 shadow-sm border-b border-gray-100 bg-white/80 backdrop-blur-md">
      {/* Upper Deal Bar - Animated Gradient */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-800 to-blue-900 py-2.5 overflow-hidden">
        <p className="animate-pulse text-xs md:text-sm font-bold tracking-widest text-white text-center uppercase">
          ⚡ Super Deal! Flat 40% Off on all items above Rs:5000 ⚡
        </p>
      </div>

      {/* Main Header */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
        
        {/* Search Bar - Modern Rounded Style */}
        <div className="hidden md:flex flex-1 max-w-sm items-center space-x-3 rounded-2xl bg-gray-100 px-4 py-2 group focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:bg-white transition-all duration-300">
          <Search className="h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
          <input
            type="text"
            placeholder="Search the collection..."
            className="bg-transparent outline-none text-sm text-gray-700 w-full placeholder:text-gray-400"
          />
        </div>

       
        <div className="flex-1 flex justify-center">
          <Link to="/" className="group">
            <p className="text-3xl font-black italic tracking-tighter text-blue-900 group-hover:text-indigo-600 transition-all duration-300 transform group-hover:scale-105">
              CHOKERS<span className="text-indigo-600 not-italic">.</span>
            </p>
          </Link>
        </div>

        {/* Actions (Cart + Auth) */}
        <div className="flex-1 flex items-center justify-end space-x-4 md:space-x-8">
          
          {/* Cart Icon with Badge */}
          <Link to="/cart" className="relative group p-2 rounded-full hover:bg-gray-100 transition-colors">
            <ShoppingCart className="h-6 w-6 text-gray-700 group-hover:text-blue-600 transition-colors" />
            {cartCounter > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold text-white ring-2 ring-white">
                {cartCounter}
              </span>
            )}
          </Link>

          {!user ? (
            <div className="flex items-center space-x-3">
              <Link to="/login" className="text-sm font-semibold text-gray-600 hover:text-blue-600">
                Log In
              </Link>
              <Link 
                to="/register" 
                className="bg-blue-900 text-white px-5 py-2 rounded-xl text-sm font-bold hover:bg-indigo-800 transition-all shadow-lg shadow-blue-200"
              >
                Join
              </Link>
            </div>
          ) : (
            <div 
              className="relative"
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
            >
              {/* Profile Trigger */}
              <button className="flex items-center space-x-2 p-1 pr-3 rounded-full bg-gray-50 border border-gray-100 hover:border-blue-200 hover:bg-white transition-all shadow-sm">
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm">
                  {user.username.charAt(0).toUpperCase()}
                </div>
                <span className="hidden md:block text-sm font-bold text-gray-700">{user.username}</span>
                <ChevronDown size={16} className={`text-gray-400 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown - Modern Glass Card */}
              {showDropdown && (
                <div className="absolute top-full right-0 mt-3 w-64 origin-top-right bg-white rounded-2xl shadow-2xl border border-gray-100 py-3 z-[100] animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-4 py-3 mb-2 border-b border-gray-50">
                    <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest">Signed in as</p>
                    <p className="font-bold text-gray-800 truncate">{user.email}</p>
                  </div>

                  {/* Standard Links */}
                  <DropdownLink to="/profile" icon={<User size={16}/>} label="My Profile" />
                  <DropdownLink to="/orders" icon={<Package size={16}/>} label="Order History" />

                  {/* Seller Section */}
                  {isSeller && (
                    <div className="mt-3 pt-3 border-t border-gray-50">
                      <p className="px-4 text-[10px] font-black text-gray-400 uppercase mb-1">Merchant</p>
                      <DropdownLink to="/uploadproducts" icon={<PlusSquare size={16}/>} label="Add Product" color="text-emerald-600" />
                      <DropdownLink to="/my-products" icon={<Store size={16}/>} label="Store Manager" color="text-emerald-600" />
                    </div>
                  )}

                  {/* Admin Section */}
                  {(isAdmin || isSuperAdmin) && (
                    <div className="mt-3 pt-3 border-t border-gray-50">
                      <p className="px-4 text-[10px] font-black text-gray-400 uppercase mb-1">Administration</p>
                      <DropdownLink to="/createcate" icon={<ShieldCheck size={16}/>} label="Manage Categories" color="text-purple-600" />
                      <DropdownLink to="/manage-orders" icon={<Package size={16}/>} label="Global Orders" color="text-purple-600" />
                    </div>
                  )}

                  <button
                    onClick={logout}
                    className="w-[90%] mx-auto mt-4 flex items-center justify-center space-x-2 px-4 py-2.5 text-sm font-bold text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-colors"
                  >
                    <LogOut size={16} />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Categories Sub-nav */}
      <div className="border-t border-gray-50 bg-gray-50/50">
        <div className="mx-auto max-w-7xl">
           <Categs />
        </div>
      </div>
    </header>
  );
};

// Helper Component for Dropdown Links
const DropdownLink = ({ to, icon, label, color = "text-gray-700" }) => (
  <Link 
    to={to} 
    className={`flex items-center space-x-3 px-4 py-2.5 text-sm font-medium ${color} hover:bg-gray-50 transition-all rounded-lg mx-2`}
  >
    <span className="opacity-70">{icon}</span>
    <span>{label}</span>
  </Link>
);

export default Header;

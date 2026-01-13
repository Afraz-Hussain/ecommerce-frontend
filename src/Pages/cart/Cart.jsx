import React, { useEffect, useState } from "react";
import { ShoppingBag, Plus, Minus, CreditCard, ArrowRight, Trash2, Package } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import { increaseQuantity, decreaseQuantity } from "../../app/features/cart/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
const Cart = () => {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const [cartproducts, setcartproducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const handleIncrease = (productId) => dispatch(increaseQuantity(productId));
  const handleDecrease = (productId) => dispatch(decreaseQuantity(productId));
  // Calculate total price whenever cart products change
  useEffect(() => {
    const total = cartproducts.reduce((sum, prod) => {
      const price = prod.productId?.price || prod.price || 0;
      const quantity = prod.quantity || 0;
      return sum + (price * quantity);
    }, 0);
    setTotalPrice(total);
  }, [cartproducts]);

  const fetchCart = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/backend/cart/gcart`,
        { withCredentials: true }
      );
      setcartproducts(res.data.products);
    } catch (err) {
      console.error("Cart fetch failed", err.response?.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchCart();
  }, [user]);

  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50/50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading your cart...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-200">
              <ShoppingBag className="text-white w-6 h-6" />
            </div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Shopping Cart</h1>
          </div>
          <span className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-xl text-sm font-bold shadow-sm">
            {cartproducts.length} Items
          </span>
        </div>

        {cartproducts.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Product List */}
            <div className="lg:col-span-8 space-y-6">
              {cartproducts.map((prod) => {
                const productId = prod.productId?._id || prod._id;
                const price = prod.productId?.price || prod.price || 0;
                const title = prod.productId?.title || prod.productName || 'Product';
                const image = prod.image || prod.productId?.image;
                
                return (
                  <div 
                    key={productId}
                    className="group bg-white rounded-3xl p-5 flex flex-col sm:flex-row items-center gap-6 border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-500"
                  >
                    {/* Product Image */}
                    <div className="relative w-full sm:w-40 h-40 overflow-hidden rounded-2xl bg-gray-50">
                      <img 
                        src={`${process.env.REACT_APP_API_URL}/${image}`} 
                        alt={title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>

                    {/* Info Section */}
                    <div className="flex-1 w-full space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-bold text-gray-800 tracking-tight">
                            {title}
                          </h3>
                          <p className="text-gray-400 text-sm font-medium uppercase tracking-wider">
                            Product ID: {productId}
                          </p>
                        </div>
                        <button 
                          onClick={() => handleRemove(productId)}
                          className="text-gray-300 hover:text-red-500 transition-colors p-2 hover:bg-red-50 rounded-xl"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>

                      <div className="flex items-center justify-between pt-4">
                        {/* Price Tag */}
                        <div className="flex flex-col">
                          <span className="text-xs text-gray-400 font-bold uppercase">Unit Price</span>
                          <span className="text-lg font-black text-indigo-600">
                            Rs {price}
                          </span>
                          <span className="text-xs text-gray-500 font-medium mt-1">
                            Subtotal: Rs {price * prod.quantity}
                          </span>
                        </div>

                        {/* Quantity Logic */}
                        <div className="flex items-center bg-gray-100 rounded-2xl p-1.5 border border-gray-200/50">
                        <button
                      onClick={() => handleDecrease(prod.productId)}
                      className="p-2 hover:bg-white hover:text-indigo-600 rounded-lg
                       transition-colors text-gray-500"
                    >
                      <Minus size={18} />
                    </button>
                          <span className="w-12 text-center font-black text-gray-800 text-lg">
                            {prod.quantity}
                          </span>
                          <button
                      onClick={() => handleIncrease(prod.productId)}
                      className="p-2 hover:bg-white hover:text-indigo-600 rounded-lg
                       transition-colors text-gray-500"
                    >
                      <Plus size={18} />
                    </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Sticky Checkout Sidebar */}
            <div className="lg:col-span-4 sticky top-24">
              <div className="bg-gray-900 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-indigo-200">
                <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
                  <Package className="text-indigo-400" /> Summary
                </h2>
                
                <div className="space-y-5 mb-8">
                  <div className="flex justify-between text-gray-400 font-medium">
                    <span>Selected Items</span>
                    <span>{cartproducts.length}</span>
                  </div>
                  <div className="flex justify-between text-gray-400 font-medium">
                    <span>Total Quantity</span>
                    <span>{cartproducts.reduce((sum, item) => sum + item.quantity, 0)}</span>
                  </div>
                  <div className="flex justify-between text-gray-400 font-medium">
                    <span>Shipping Fee</span>
                    <span className="text-emerald-400">FREE</span>
                  </div>
                  <div className="border-t border-gray-800 pt-5 flex justify-between items-end">
                    <span className="text-gray-400 font-bold">Total Payable</span>
                    <div className="text-right">
                      <p className="text-3xl font-black text-white">Rs {totalPrice.toFixed(2)}</p>
                      <p className="text-[10px] text-indigo-400 uppercase tracking-widest font-bold">Including Taxes</p>
                    </div>
                  </div>
                </div>
                <Link to="/checkout">
                <button 
                  className="group w-full bg-indigo-500 hover:bg-indigo-400 text-white py-5 px-8 rounded-2xl font-black text-lg flex items-center justify-center gap-4 transition-all hover:shadow-xl hover:shadow-indigo-500/20 active:scale-[0.98]"
                >
               

             
                  <CreditCard size={22} />
                  <span>CHECKOUT NOW</span>
                  <ArrowRight size={22} className="group-hover:translate-x-2 transition-transform" />
                </button>
                </Link>

                <div className="mt-8 flex items-center justify-center gap-2 grayscale opacity-50">
                   <div className="h-4 w-8 bg-white/20 rounded" />
                   <div className="h-4 w-8 bg-white/20 rounded" />
                   <div className="h-4 w-8 bg-white/20 rounded" />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-32 bg-white rounded-[3rem] border-2 border-dashed border-gray-100">
            <div className="bg-indigo-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
              <ShoppingBag className="text-indigo-600 w-10 h-10" />
            </div>
            <h2 className="text-3xl font-black text-gray-900 mb-3">Your cart is feeling light</h2>
            <p className="text-gray-500 mb-10 max-w-xs mx-auto text-lg">Add some of our premium chokers to start your collection.</p>
            <button className="bg-gray-900 text-white px-12 py-4 rounded-2xl font-black hover:bg-indigo-600 transition-all shadow-xl active:scale-95">
              EXPLORE SHOP
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
import React from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { ShieldCheck, Truck, CreditCard, Lock, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import axios from 'axios'
const Checkout = () => {
  const { cart, totalPrice } = useSelector((state) => state.cart);
  const { register, handleSubmit, formState: { errors } } = useForm();
const base_URL=`${process.env.REACT_APP_API_URL}`
const onProcessOrder = async(data) => {
  console.log("Processing Order for:", data);
  
  try {
    // 1. Place the order in the database
    const response = await axios.post(`${base_URL}/backend/order/create`, { ...data, cart },{ withCredentials: true });
    
    // 2. If order is successful, trigger the email
    if (response.status === 200 || response.status === 201) {
      
      // Prepare email details
      const emailData = {
        to: "farazishah14@gmail.com", // The seller's email // replace with seller email
        subject: `🚀 New Order from ${data.fullName}`,
        text: `
          You have received a new order!
          
          Customer: ${data.fullName}
          Phone: ${data.phone}
          Address: ${data.address}, ${data.city}
          Total Amount: Rs ${totalPrice}
          
          Items ordered: ${cart.map(item => `${item.productName} (x${item.quantity})`).join(", ")}
        `
      };
      await axios.post(`${base_URL}/sendmail`, emailData);

      alert("Order Placed Successfully! An email has been sent to the seller.");
      // Optional: navigate to a success page or clear cart
    }
  } catch (err) {
    console.error("Checkout Error:", err);
    alert(err.response?.data?.message || "Server error occurred during checkout.");
  }
};

  

  return (
    <div className="min-h-screen bg-[#fafafa] py-12 px-6 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* LEFT: Shipping & Payment Form */}
        <div className="lg:col-span-8 space-y-8">
          <Link to="/cart" className="flex items-center gap-2 text-gray-400
           hover:text-indigo-600 transition-colors font-bold text-sm uppercase tracking-widest">
            <ArrowLeft size={16} /> Back to Cart
          </Link>

          <form onSubmit={handleSubmit(onProcessOrder)} className="space-y-8">
            {/* Shipping Section */}
            <div className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-gray-50">
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-indigo-100 p-2 rounded-xl text-indigo-600">
                  <Truck size={24} />
                </div>
                <h2 className="text-2xl font-black tracking-tighter text-gray-900">Shipping Details</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField label="Full Name" name="fullName" register={register} required errors={errors} placeholder="John Doe" />
                <InputField label="Phone Number" name="phone" register={register} required errors={errors} placeholder="+92 300 0000000" />
                <div className="md:col-span-2">
                  <InputField label="Street Address" name="address" register={register} required errors={errors} placeholder="House #, Street name, Area" />
                </div>
                <InputField label="City" name="city" register={register} required errors={errors} placeholder="Lahore" />
                <InputField label="Postal Code" name="zip" register={register} required errors={errors} placeholder="54000" />
              </div>
            </div>

            {/* Payment Section (Visual Placeholder) */}
            <div className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-gray-50">
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-indigo-100 p-2 rounded-xl text-indigo-600">
                  <CreditCard size={24} />
                </div>
                <h2 className="text-2xl font-black tracking-tighter text-gray-900">Payment Method</h2>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="border-2 border-indigo-600 p-4 rounded-2xl flex items-center justify-between bg-indigo-50/50">
                  <span className="font-bold text-gray-900">Cash on Delivery</span>
                  <div className="w-5 h-5 rounded-full border-4 border-indigo-600 bg-white"></div>
                </div>
                <div className="border-2 border-gray-100 p-4 rounded-2xl flex items-center justify-between opacity-50 cursor-not-allowed">
                  <span className="font-bold text-gray-400">Card (Coming Soon)</span>
                  <div className="w-5 h-5 rounded-full border-2 border-gray-200 bg-white"></div>
                </div>
              </div>
            </div>

            <button type="submit"
             className="w-full bg-gray-900 text-white 
             py-6 rounded-[2rem] font-black text-xl hover:bg-indigo-600 
             transition-all shadow-2xl shadow-indigo-100 flex items-center 
             justify-center gap-3 active:scale-95">
              Complete Purchase <ShieldCheck size={24} />
            </button>
          </form>
        </div>

        {/* RIGHT: Order Summary Sidebar */}
        <div className="lg:col-span-4">
          <div className="sticky top-32 bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-2xl shadow-gray-200/50">
            <h3 className="text-xl font-black text-gray-900 mb-8 border-b pb-4">Your Order</h3>
            
            <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {cart.map((item) => (
                <div key={item.productId} className="flex gap-4 items-center">
                  <div className="w-16 h-16 rounded-xl bg-gray-100 overflow-hidden flex-shrink-0">
                    <img src={`${base_URL}/${item.image}`} className="w-full h-full object-cover" alt={item.productName} />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-gray-900 text-sm truncate uppercase">{item.productName}</p>
                    <p className="text-xs text-gray-400 font-bold">QTY: {item.quantity}</p>
                  </div>
                  <p className="font-black text-gray-900 text-sm">Rs {item.price * item.quantity}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-8 border-t border-dashed border-gray-200 space-y-4">
              <div className="flex justify-between text-gray-500 font-bold text-sm">
                <span>Subtotal</span>
                <span>Rs {totalPrice}</span>
              </div>
              <div className="flex justify-between text-gray-500 font-bold text-sm">
                <span>Shipping</span>
                <span className="text-emerald-600 uppercase tracking-widest text-[10px]">Free</span>
              </div>
              <div className="flex justify-between items-end pt-4">
                <span className="text-lg font-black text-gray-900 uppercase">Total</span>
                <span className="text-3xl font-black text-indigo-600">Rs {totalPrice}</span>
              </div>
            </div>

           
          </div>
        </div>

      </div>
    </div>
  );
};

// Reusable Input Field
const InputField = ({ label, name, register, required, errors, placeholder }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">{label}</label>
    <input 
      {...register(name, { required: required ? `${label} is required` : false })}
      placeholder={placeholder}
      className={`w-full px-6 py-4 bg-gray-50 rounded-2xl border-2 transition-all outline-none font-bold text-sm ${errors[name] ? 'border-red-100 focus:border-red-500' : 'border-transparent focus:border-indigo-600 focus:bg-white'}`}
    />
    {errors[name] && <p className="text-red-500 text-[10px] font-black ml-1">{errors[name].message}</p>}
  </div>
);

export default Checkout;

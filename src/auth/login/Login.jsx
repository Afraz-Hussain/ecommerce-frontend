import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Mail, Lock, Loader2, AlertCircle, ArrowRight } from "lucide-react";

const Login = () => {
  const { loading, login } = useAuth();
  const navigate = useNavigate();

  // Initialize React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched", // Validates when the user clicks away from an input
  });

  const onSubmit = async (data) => {
    try {
      await login(data);
      navigate("/cart");
    } catch (err) {
      console.error("Login failed", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fafafa] font-sans p-6">
      <div className="w-full max-w-md">
        {/* Branding/Logo */}
        <div className="text-center mb-10">
          <Link to="/">
            <h1 className="text-4xl font-black italic tracking-tighter text-blue-900 mb-2">
              CHOKERS<span className="text-indigo-600 not-italic">.</span>
            </h1>
          </Link>
          <p className="text-gray-400 font-medium">Welcome back. Enter your details.</p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-indigo-100 border border-gray-100 space-y-6"
        >
          <h2 className="text-2xl font-black text-gray-900 tracking-tight mb-8">Login</h2>

          {/* Email Field */}
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                <Mail size={18} />
              </div>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                type="email"
                placeholder="name@company.com"
                className={`w-full pl-12 pr-4 py-4 bg-gray-50 border-2 rounded-2xl outline-none transition-all duration-300 font-medium ${
                  errors.email 
                    ? "border-red-100 focus:border-red-500 focus:bg-white" 
                    : "border-transparent focus:border-indigo-600 focus:bg-white"
                }`}
              />
            </div>
            {errors.email && (
              <div className="flex items-center gap-1 text-red-500 text-xs font-bold mt-1 ml-1">
                <AlertCircle size={14} />
                <span>{errors.email.message}</span>
              </div>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <div className="flex justify-between items-center ml-1">
              <label className="text-xs font-black uppercase tracking-widest text-gray-400">
                Password
              </label>
              <Link to="/forgot" className="text-xs font-bold text-indigo-600 hover:underline">
                Forgot?
              </Link>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                <Lock size={18} />
              </div>
              <input
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Must be at least 6 characters",
                  },
                })}
                type="password"
                placeholder="••••••••"
                className={`w-full pl-12 pr-4 py-4 bg-gray-50 border-2 rounded-2xl outline-none transition-all duration-300 font-medium ${
                  errors.password 
                    ? "border-red-100 focus:border-red-500 focus:bg-white" 
                    : "border-transparent focus:border-indigo-600 focus:bg-white"
                }`}
              />
            </div>
            {errors.password && (
              <div className="flex items-center gap-1 text-red-500 text-xs font-bold mt-1 ml-1">
                <AlertCircle size={14} />
                <span>{errors.password.message}</span>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="group w-full bg-gray-900 text-white p-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-indigo-600 transition-all duration-300 shadow-xl shadow-indigo-100 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <>
                Sign In <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>

          <p className="text-center text-sm font-medium text-gray-500 mt-8">
            Don't have an account?{" "}
            <Link to="/register" className="text-indigo-600 font-bold hover:underline">
              Create one
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;

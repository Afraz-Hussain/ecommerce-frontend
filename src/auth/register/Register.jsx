import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useForm } from "react-hook-form";
import { User, Mail, Lock, MapPin, Loader2, AlertCircle, ArrowRight, UserPlus } from "lucide-react";

const Register = () => {
  const { loading, register: authRegister } = useAuth(); 
  const navigate = useNavigate();

  const { 
    register,      
    handleSubmit, 
    formState: { errors } 
  } = useForm({
    mode: "onTouched",
    defaultValues: { 
      username: "",
      email: "",
      password: "",
      address: ""
    }
  });

  const onSubmit = async (data) => {
    try {
      await authRegister(data); 
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fafafa] font-sans p-6">
      <div className="w-full max-w-lg">
        
        {/* Branding */}
        <div className="text-center mb-8">
          <Link to="/">
            <h1 className="text-4xl font-black italic tracking-tighter text-blue-900 mb-2">
              CHOKERS<span className="text-indigo-600 not-italic">.</span>
            </h1>
          </Link>
          <p className="text-gray-400 font-medium">Create your account to start shopping.</p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)} 
          className="bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-indigo-100 border border-gray-100"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-indigo-100 p-2 rounded-xl text-indigo-600">
               <UserPlus size={24} />
            </div>
            <h2 className="text-2xl font-black text-gray-900 tracking-tight">Register</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Username Field */}
            <div className="space-y-2">
              <Label text="Username" />
              <div className="relative">
                <IconWrapper icon={<User size={18} />} />
                <input
                  {...register("username", { required: "Required", maxLength: 20 })}
                  placeholder="johndoe"
                  className={inputClass(errors.username)}
                />
              </div>
              <ErrorMessage message={errors.username?.message} />
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <Label text="Email Address" />
              <div className="relative">
                <IconWrapper icon={<Mail size={18} />} />
                <input
                  {...register("email", { 
                    required: "Required",
                    pattern: { value: /^\S+@\S+$/i, message: "Invalid email" }
                  })}
                  type="email"
                  placeholder="name@email.com"
                  className={inputClass(errors.email)}
                />
              </div>
              <ErrorMessage message={errors.email?.message} />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label text="Password" />
              <div className="relative">
                <IconWrapper icon={<Lock size={18} />} />
                <input
                  {...register("password", { 
                    required: "Required",
                    minLength: { value: 6, message: "Min 6 chars" }
                  })}
                  type="password"
                  placeholder="••••••••"
                  className={inputClass(errors.password)}
                />
              </div>
              <ErrorMessage message={errors.password?.message} />
            </div>

            {/* Address Field */}
            <div className="space-y-2">
              <Label text="Shipping Address" />
              <div className="relative">
                <IconWrapper icon={<MapPin size={18} />} />
                <input
                  {...register("address", { required: "Required" })}
                  placeholder="City, Country"
                  className={inputClass(errors.address)}
                />
              </div>
              <ErrorMessage message={errors.address?.message} />
            </div>

          </div>

          <button
            type="submit"
            disabled={loading}
            className="group w-full bg-gray-900 text-white p-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-indigo-600 transition-all duration-300 shadow-xl shadow-indigo-100 active:scale-95 disabled:opacity-70 mt-8 flex items-center justify-center gap-3"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <>
                Create Account <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>

          <p className="text-center text-sm font-medium text-gray-500 mt-8">
            Already a member?{" "}
            <Link to="/login" className="text-indigo-600 font-bold hover:underline">
              Log in instead
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

// Helper UI Components for cleaner code
const Label = ({ text }) => (
  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">
    {text}
  </label>
);

const IconWrapper = ({ icon }) => (
  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
    {icon}
  </div>
);

const inputClass = (error) => `
  w-full pl-12 pr-4 py-4 bg-gray-50 border-2 rounded-2xl outline-none transition-all duration-300 font-medium text-sm
  ${error ? "border-red-100 focus:border-red-500 focus:bg-white" : "border-transparent focus:border-indigo-600 focus:bg-white"}
`;

const ErrorMessage = ({ message }) => message ? (
  <div className="flex items-center gap-1 text-red-500 text-[10px] font-bold mt-1 ml-1">
    <AlertCircle size={12} />
    <span>{message}</span>
  </div>
) : null;

export default Register;

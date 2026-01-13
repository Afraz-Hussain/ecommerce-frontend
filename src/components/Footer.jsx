import React from "react";
import { Link } from "react-router-dom";
import { 
  Mail, Phone, MapPin, Instagram, 
  Twitter, Facebook, MessageCircle, ArrowUpRight 
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0a0a0c] text-gray-400 py-16 px-6 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* 1. TOP SECTION: BRAND & BIG CONTACT CTA */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6 pb-8 border-b border-gray-800">
          <div className="text-center lg:text-left space-y-4">
            <Link to="/">
              <h2 className="text-4xl font-black italic tracking-tighter text-white">
                CHOKERS<span className="text-indigo-500">.</span>
              </h2>
            </Link>
            <p className="max-w-sm text-lg text-gray-500 font-medium">
              Defining elegance through handcrafted chokers since 2026. 
             
            </p>
          </div>

          {/* LARGE CONTACT BUTTON */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r
             from-indigo-600 to-blue-500 rounded-2xl blur 
             opacity-25 group-hover:opacity-60 transition duration-1000"></div>
            <button className="relative flex items-center gap-4 
            bg-white text-black px-10 py-6 rounded-2xl font-black 
            text-xl hover:bg-indigo-600 hover:text-white transition-all 
            transform active:scale-95 shadow-2xl">
             Contact
              <div className="bg-indigo-100 p-2 rounded-full text-indigo-600 group-hover:bg-white/20 group-hover:text-white transition-colors">
                <MessageCircle size={24} />
              </div>
            </button>
          </div>
        </div>

        {/* 2. MIDDLE SECTION: LINKS GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 py-16 border-b border-gray-800">
          {/* Shop Column */}
          <div className="space-y-6">
            <h4 className="text-white font-bold tracking-widest uppercase text-sm">Shop</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link to="/shop" className="hover:text-white transition-colors">All Collections</Link></li>
              <li><Link to="/trending" className="hover:text-white transition-colors">Best Sellers</Link></li>
              <li><Link to="/new-arrivals" className="hover:text-white transition-colors">New Arrivals</Link></li>
              <li><Link to="/onsale" className="hover:text-white transition-colors text-red-500">Flash Sale</Link></li>
            </ul>
          </div>

          {/* Support Column */}
          <div className="space-y-6">
            <h4 className="text-white font-bold tracking-widest uppercase text-sm">Support</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link to="/track" className="hover:text-white transition-colors">Track Order</Link></li>
              <li><Link to="/shipping" className="hover:text-white transition-colors">Shipping Policy</Link></li>
              <li><Link to="/returns" className="hover:text-white transition-colors">Returns & Exchanges</Link></li>
              <li><Link to="/faq" className="hover:text-white transition-colors">FAQs</Link></li>
            </ul>
          </div>

          {/* Socials Column */}
          <div className="space-y-6">
            <h4 className="text-white font-bold tracking-widest uppercase text-sm">Socials</h4>
            <div className="flex gap-4">
              <SocialIcon icon={<Instagram size={20} />} />
              <SocialIcon icon={<Twitter size={20} />} />
              <SocialIcon icon={<Facebook size={20} />} />
            </div>
            <p className="text-xs pt-2">Tag us in your photos <br/> #ecommerce2026</p>
          </div>

          {/* Contact Details */}
          <div className="space-y-6">
            <h4 className="text-white font-bold tracking-widest uppercase text-sm">Contact Us</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li className="flex items-center gap-3"><Mail size={16} /> afrazmuhmmad310@gmail.com</li>
              <li className="flex items-center gap-3"><Phone size={16} /> 03124928496</li>
              <li className="flex items-center gap-3"><MapPin size={16} /> Lahore, Pakistan</li>
            </ul>
          </div>
        </div>

        {/* 3. BOTTOM SECTION: LEGAL & COPYRIGHT */}
        <div className="flex flex-col md:flex-row justify-between items-center py-10 gap-6">
          <p className="text-xs font-medium">
            © {currentYear} CHOKERS INC. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-8 text-xs font-bold uppercase tracking-widest">
            <Link to="/privacy" className="hover:text-white">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Helper Component for Social Icons
const SocialIcon = ({ icon }) => (
  <div className="w-10 h-10 rounded-xl bg-gray-900 border
   border-gray-800 flex items-center justify-center
    hover:bg-indigo-600 hover:border-indigo-500 hover:text-white transition-all cursor-pointer">
    {icon}
  </div>
);

export default Footer;

import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Star, Plus, Minus } from "lucide-react"; 
import { useDispatch } from "react-redux";
import { addToCart } from "../../app/features/cart/cartSlice";
import { useAuth } from "../../context/AuthContext";

const SinglePage = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [sameprods, setsameprods] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);

  const API_BASE_URL = `${process.env.REACT_APP_API_URL}/backend/product`;

  const increaseQty = () => setQuantity((prev) => prev + 1);
  const decreaseQty = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  
  const addProduct = async (product) => {
    // Check if user is logged in
    if (!user) {
      alert("Please login to add items to cart");
      navigate("/login");
      return;
    }

    setAddingToCart(true);

    try {
      // Make API call to add to cart
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/backend/cart/create`,
        {
          productId: product._id,
          quantity: quantity,
        },
        {
          withCredentials: true, // This sends cookies
        }
      );

      console.log("Added to backend cart ", response.data);
      alert(`${quantity} item(s) added to cart!`);
      
      // Optionally dispatch to Redux to update UI
      dispatch(addToCart({
        productId: product._id,
        productName: product.title,
        price: product.price,
        image: product.images?.[0],
        quantity: quantity
      }));

      setQuantity(1); // Reset quantity
    } catch (err) {
      console.error("Add to cart failed:", err.response?.data || err.message);
      
      if (err.response?.status === 401) {
        alert("Session expired. Please login again.");
        navigate("/login");
      } else {
        alert(err.response?.data?.message || "Failed to add to cart");
      }
    } finally {
      setAddingToCart(false);
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_BASE_URL}/single/${id}`);
        setProduct(res.data.data);
        setError(null);
        setQuantity(1); 
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Product not found or failed to load");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  useEffect(() => {
    const fetchSameProds = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/sameproducts/${id}`);
        setsameprods(res.data.data);
      } catch (error) {
        console.error("Failed to fetch similar products:", error);
      }
    }
    fetchSameProds();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-5xl mx-auto p-6 text-center mt-20">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Product Not Found</h2>
        <p className="text-gray-600 mb-6">{error}</p>
        <button 
          onClick={() => navigate("/shop")} 
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
        >
          Back to Shop
        </button>
      </div>
    );
  }
  
  
  
  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-6xl mx-auto p-6">
        <button 
          onClick={() => navigate(-1)} 
          className="mb-6 flex items-center text-indigo-600 hover:text-indigo-700 transition"
        >
          <span className="mr-2">←</span> Back
        </button>

        <div className="grid md:grid-cols-2 gap-10 bg-white p-8 rounded-xl shadow-lg">
          <div>
            <img
              src={
                product.images?.length
                  ? `${process.env.REACT_APP_API_URL}/${product.images[selectedImage]}`
                  : "https://via.placeholder.com/400"
              }
              alt={product.title}
              className="w-full h-96 object-cover rounded-lg mb-4 shadow-md"
            />
            
            {/* Thumbnail Gallery */}
            {product.images?.length > 1 && (
              <div className="flex gap-2 overflow-x-auto mt-4">
                {product.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={`${process.env.REACT_APP_API_URL}/${img}`}
                    alt={`${product.title} ${idx + 1}`}
                    onClick={() => setSelectedImage(idx)}
                    className={`w-20 h-20 object-cover rounded cursor-pointer border-2 transition ${
                      selectedImage === idx ? 'border-indigo-600' : 'border-gray-300 hover:border-gray-400'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          <div>
            <h1 className="text-4xl font-bold text-gray-800">{product.title}</h1>
            <p className="text-indigo-600 text-3xl font-bold mt-4">RS {product.price.toFixed(2)}</p>
            
            <div className="flex gap-4 mt-4 text-sm text-gray-600">
              <p><span className="font-semibold">Category:</span> {product.category?.cateName || "N/A"}</p>
              <p><span className="font-semibold">Brand:</span> {product.brand || "N/A"}</p>
            </div>

            <div className="mt-4 flex items-center">
              {[...Array(product.rating || 0)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              ))}
              <span className="ml-2 text-gray-600 text-sm">({product.reviews?.length || 0} reviews)</span>
            </div>

            <div className="mt-6">
              <h3 className="font-semibold text-gray-700 mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Quantity Selector */}
            <div className="mt-8">
              <h3 className="font-semibold text-lg mb-3">Quantity</h3>
              <div className="flex items-center space-x-4">
                <button 
                  onClick={decreaseQty}
                  disabled={addingToCart}
                  className="p-2 border rounded-lg hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Minus className="w-5 h-5 text-gray-600" />
                </button>
                <span className="text-xl font-bold w-8 text-center">{quantity}</span>
                <button 
                  onClick={increaseQty}
                  disabled={addingToCart}
                  className="p-2 border rounded-lg hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Plus className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            <button
              onClick={() => addProduct(product)}
              disabled={addingToCart}
              className={`mt-8 w-full px-6 py-4 rounded-lg transition font-semibold text-lg shadow-md ${
                addingToCart 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white'
              }`}
            >
              {addingToCart ? 'Adding to Cart...' : 'Add to Cart'}
            </button>
          </div>
        </div>

        {sameprods.length > 0 && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">You May Also Like</h2>
            <div className="flex overflow-x-auto gap-6 pb-4">
              {sameprods.map((itm) => (
                <Link 
                  to={`/singlepage/${itm._id}`} 
                  key={itm._id} 
                  className="flex-shrink-0 w-64 bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition"
                >
                  <img 
                    src={
                      itm.images?.length 
                        ? `${process.env.REACT_APP_API_URL}/${itm.images[0]}`
                        : "https://via.placeholder.com/400"
                    } 
                    alt={itm.title} 
                    className="w-full h-48 object-cover" 
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 truncate">{itm.title}</h3>
                    <p className="text-indigo-600 font-bold mt-1">RS {itm.price.toFixed(2)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SinglePage;
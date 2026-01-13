import React, { useEffect, useState } from "react";
import axios from "axios";

const UploadProducts = () => {
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const [price, setprice] = useState("");
  const [category, setcategory] = useState("");
  const [file, setfile] = useState(null);
  const [brand, setbrand] = useState("");
  const [categories, setcategories] = useState([]);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/cate/allcats`,
          { withCredentials: true }
        );
        setcategories(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategories();
  }, []);

  const uploadProduct = async (e) => {
    e.preventDefault();

    if (!title || !price || !description || !brand || !category || !file) {
      alert("All fields are required");
      return;
    }

    setloading(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("price", price);
      formData.append("description", description);
      formData.append("brand", brand);
      formData.append("category", category);
      formData.append("images", file);

      const res = await axios.post(
        "http://localhost:3000/backend/product/createproduct",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (res.status === 201 || res.data.success) {
        alert("✅ Product uploaded successfully");
        settitle("");
        setprice("");
        setdescription("");
        setbrand("");
        setcategory("");
        setfile(null);
      }
    } catch (err) {
      alert(err.response?.data?.message || "Upload failed");
    } finally {
      setloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Upload New Product
        </h2>

        <form onSubmit={uploadProduct} className="space-y-5">
          {/* Product Name */}
          <input
            type="text"
            placeholder="Product Name"
            value={title}
            onChange={(e) => settitle(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
          />

          {/* Price & Brand */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setprice(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <input
              type="text"
              placeholder="Brand"
              value={brand}
              onChange={(e) => setbrand(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Category */}
          <select
            value={category}
            onChange={(e) => setcategory(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 bg-white focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.cateName}
              </option>
            ))}
          </select>

          {/* Description */}
          <textarea
            placeholder="Product Description"
            value={description}
            onChange={(e) => setdescription(e.target.value)}
            rows="4"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
          />

          {/* Image Upload */}
          <div className="border-2 border-dashed rounded-lg p-4 text-center">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setfile(e.target.files[0])}
              className="w-full"
            />
            {file && (
              <p className="mt-2 text-sm text-gray-600">
                Selected: <span className="font-medium">{file.name}</span>
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold text-white transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Uploading..." : "Upload Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadProducts;

import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { Plus, Edit3, Trash2, X, Save, Search, Loader2 } from "lucide-react";

const ProductPanel = () => {
  const location = useLocation();
  const cat = location.state || {};
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    discountedPrice: "",
    image: [],
    category: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const API = "http://localhost:5000/api";

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const url = `${API}/products/${
        cat?._id ? `?category=${encodeURIComponent(cat?._id)}` : ""
      }`;
      console.log(url, cat);
      const res = await fetch(url);
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Failed to fetch products");
      setProducts(data);
    } catch (error) {
      alert("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch(`${API}/categories`);
      const data = await res.json();
      if (!res.ok)
        throw new Error(data?.message || "Failed to fetch categories");
      setCategories(data);
    } catch (error) {
      console.error("Failed to load categories");
    }
  };

  const handleSaveProduct = async () => {
    if (
      !formData.name.trim() ||
      !formData.description.trim() ||
      !formData.price ||
      !formData.category ||
      formData.image.length === 0
    ) {
      return alert("Please fill all required fields");
    }

    setIsSubmitting(true);
    const method = editProduct ? "PUT" : "POST";
    const endpoint = editProduct
      ? `${API}/products/update/${editProduct._id}`
      : `${API}/products/create`;

    try {
      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Save failed");

      alert(`Product ${editProduct ? "updated" : "created"} successfully`);
      setIsModalOpen(false);
      await fetchProducts();
    } catch (err) {
      alert("Failed to save product.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;
    try {
      const res = await fetch(`${API}/products/delete/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");
      alert("Product deleted successfully");
      await fetchProducts();
    } catch (err) {
      alert("Failed to delete product.");
    }
  };

  const openModal = (product = null) => {
    setEditProduct(product);
    setFormData({
      name: product?.name || "",
      description: product?.description || "",
      price: product?.price || "",
      discountedPrice: product?.discountedPrice || "",
      image: product?.image || [],
      category: product?.category || "",
    });
    setIsModalOpen(true);
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const filteredProducts = products.filter(({ name, description }) =>
    `${name} ${description}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-[90vh] bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 mb-1">
                Product Panel
              </h1>
              <p className="text-gray-600">Manage products</p>
            </div>
            <button
              onClick={() => openModal()}
              disabled={loading}
              className="mt-4 sm:mt-0 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              <Plus className="w-4 h-4" /> Add Product
            </button>
          </div>
          <div className="mt-6 relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden group w-full max-w-[280px]"
              >
                <div className="relative w-full h-64 overflow-hidden">
                  <img
                    src={product.image?.[0]}
                    alt={product.name}
                    className="w-full h-full object-cover transition-opacity duration-500"
                  />
                  {product.image?.length >= 2 && (
                    <img
                      src={product.image?.[1]}
                      alt={`${product.name} alt`}
                      className="w-full h-full object-cover absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    />
                  )}
                </div>

                <div className="p-4 flex flex-col gap-2">
                  <h3 className="text-md font-semibold text-gray-900 leading-tight line-clamp-2">
                    {product.name}
                  </h3>

                  <p className="text-sm text-gray-600 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex justify-between items-center mt-2">
                    <span className="text-lg font-bold text-green-600">
                      ₹{product.price}
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => openModal(product)}
                        className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product._id)}
                        className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No products found
            </h3>
            <p className="text-gray-500">
              {products.length === 0
                ? "Add your first product"
                : "Try a different search term"}
            </p>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-900">
                {editProduct ? "Edit Product" : "Add Product"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                disabled={isSubmitting}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              {[
                { label: "Name *", key: "name", type: "text" },
                { label: "Description *", key: "description", type: "text" },
                { label: "Price *", key: "price", type: "number" },
                {
                  label: "Discounted Price",
                  key: "discountedPrice",
                  type: "number",
                },
                {
                  label: "Images (comma-separated URLs) *",
                  key: "image",
                  type: "text",
                  transform: (v) => v.split(",").map((s) => s.trim()),
                  display: (v) => v.join(", "),
                },
              ].map(({ label, key, type, transform, display }) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {label}
                  </label>
                  <input
                    type={type}
                    value={
                      display ? display(formData[key]) : formData[key] || ""
                    }
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        [key]: transform
                          ? transform(e.target.value)
                          : e.target.value,
                      })
                    }
                    disabled={isSubmitting}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              ))}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  disabled={isSubmitting}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select category</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setIsModalOpen(false)}
                disabled={isSubmitting}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveProduct}
                disabled={isSubmitting}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <Save className="w-4 h-4" /> Save
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPanel;

import React, { useState } from "react";

const productData = [
  {
    id: 1,
    name: "Wireless Earbuds",
    price: 89,
    tag: "Best Seller",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400",
  },
  {
    id: 2,
    name: "Charging Cable",
    price: 19,
    tag: "Trending",
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400",
  },
  {
    id: 3,
    name: "Phone Mount",
    price: 29,
    tag: "New",
    image: "https://images.unsplash.com/photo-1616410011236-7a42121dd981?w=400",
  },
  {
    id: 4,
    name: "Wireless Charger",
    price: 39,
    tag: "Best Seller",
    image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400",
  },
  {
    id: 5,
    name: "MagSafe Stand",
    price: 99,
    tag: "Trending",
    image:
      "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSCqirgyO6W4DUD-rll4XTtN_ekvKnBVK0YoEVfvDQ3xPwzdWeJitWXkA5VFl5-ixY6IndvzYPwnjaSgwxmZDiBKUwtz36JtDGZThR-heWKfVMYRmaEDMrv",
  },
];

const filters = ["All", "Best Seller", "Trending", "New", "Price: High to Low"];

const Product = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filteredProducts = productData
    .filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (filter === "Price: High to Low") return b.price - a.price;
      return 0;
    })
    .filter((product) => {
      if (filter === "All" || filter === "Price: High to Low") return true;
      return product.tag === filter;
    });

  return (
    <section className="px-6 py-20 bg-[#fdfdfb]">
      <div className="max-w-7xl mx-auto">
        {/* Search + Filters */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded-full px-5 py-2 text-sm outline-none w-full md:w-1/3"
          />
          <div className="flex flex-wrap gap-3">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-full text-sm border transition-all duration-300 ${
                  filter === f
                    ? "bg-black text-white"
                    : "border-gray-300 text-gray-700 hover:border-black"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition-all"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-60 object-cover rounded-lg mb-4"
              />
              <h3 className="text-lg font-medium text-gray-800 mb-1">
                {product.name}
              </h3>
              <p className="text-gray-500 text-sm mb-2">${product.price}</p>
              <span className="text-xs bg-gray-200 rounded-full px-3 py-1 text-gray-600">
                {product.tag}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Product;

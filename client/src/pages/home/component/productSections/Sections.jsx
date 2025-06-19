import React from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

const ProductShowcase = () => {
  const products = [
    {
      id: 1,
      name: "Wireless Pro Earbuds",
      price: "89",
      image:
        "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop",
      description: "Crystal-clear sound with noise cancellation.",
    },
    {
      id: 2,
      name: "Fast Charging Cable",
      price: "24",
      image:
        "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop",
      description: "Durable and supports ultra-fast charging.",
    },
    {
      id: 3,
      name: "Magnetic Phone Mount",
      price: "19",
      image:
        "https://images.unsplash.com/photo-1616410011236-7a42121dd981?w=400&h=400&fit=crop",
      description: "Secure grip for your device while driving.",
    },
    {
      id: 4,
      name: "Wireless Charging Pad",
      price: "39",
      image:
        "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop",
      description: "Charge your phone effortlessly and wirelessly.",
    },
  ];

  return (
    <>
      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:wght@400;500;600&display=swap");
      `}</style>

      <div className="py-24 px-6" style={{ backgroundColor: "#fffef6" }}>
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2
              className="text-5xl text-gray-900 mb-4 tracking-tight"
              style={{ fontFamily: "Playfair Display, serif", fontWeight: 400 }}
            >
              Mobile Accessories
            </h2>
            <div className="w-16 h-px bg-gray-300 mx-auto"></div>
          </motion.div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.15,
                  ease: "easeInOut",
                }}
                className="group cursor-pointer"
              >
                {/* Product Image */}
                <div className="relative mb-6 overflow-hidden bg-white rounded-xl shadow-sm">
                  <motion.img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-80 object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                  />

                  {/* Heart Icon (top-right) */}
                  <div className="absolute top-3 right-3">
                    <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform">
                      <Heart className="w-5 h-5 text-red-500" />
                    </button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="text-center space-y-2">
                  <h3
                    className="text-gray-900 text-lg tracking-wide"
                    style={{ fontFamily: "Inter, sans-serif", fontWeight: 400 }}
                  >
                    {product.name}
                  </h3>
                  <p
                    className="text-gray-500 text-sm italic"
                    style={{ fontFamily: "Inter, sans-serif", fontWeight: 300 }}
                  >
                    {product.description}
                  </p>
                  <p
                    className="text-gray-700 text-sm tracking-wider"
                    style={{ fontFamily: "Inter, sans-serif", fontWeight: 300 }}
                  >
                    ${product.price}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* View All Link */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1 }}
            className="text-center mt-16"
          >
            <motion.div whileHover={{ y: -2 }} className="inline-block">
              <Link
                to="/products"
                className="text-gray-900 text-sm tracking-wider border-b border-gray-400 pb-1 hover:border-gray-900 transition-colors duration-300"
                style={{ fontFamily: "Inter, sans-serif", fontWeight: 400 }}
              >
                View All Products
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default ProductShowcase;

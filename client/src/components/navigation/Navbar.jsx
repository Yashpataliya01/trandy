import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, User, Menu, X, Heart } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("Home");
  const [cartCount, setCartCount] = useState(2);
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    {
      name: "Categories",
      subItems: [
        "Smartphones",
        "Tablets",
        "Smartwatches",
        "Earbuds",
        "Chargers",
        "Screen Guards",
      ],
    },
    {
      name: "Services",
      subItems: [
        "Repair",
        "Insurance",
        "Extended Warranty",
        "Trade-in",
        "Installation",
      ],
    },
    { name: "Contact", path: "#" },
  ];

  return (
    <nav className="bg-white border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center">
            <div className="text-3xl font-light tracking-wide text-gray-900">
              TMP
              <span className="w-2 h-2 bg-black rounded-full inline-block ml-1 mb-2"></span>
            </div>
            <div className="ml-3 text-xs text-gray-500 font-medium tracking-wider">
              THE MOBILE POINT
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-12">
            {navItems.map((item, index) => (
              <div key={index} className="relative group">
                <button
                  onClick={() => {
                    setActiveNav(item.name);
                    if (item.path) navigate(item.path);
                  }}
                  className="relative py-2"
                >
                  <span
                    className={`text-sm font-medium tracking-wide transition-colors duration-300 ${
                      activeNav === item.name
                        ? "text-black"
                        : "text-gray-500 hover:text-black"
                    }`}
                  >
                    {item.name.toUpperCase()}
                  </span>
                  <div
                    className={`absolute bottom-0 left-0 w-full h-0.5 bg-black transition-all duration-300 ${
                      activeNav === item.name
                        ? "opacity-100"
                        : "opacity-0 group-hover:opacity-100"
                    }`}
                  ></div>
                </button>

                {item.subItems && (
                  <div className="absolute top-full left-0 mt-3 w-56 bg-white rounded-lg shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
                    <div className="py-4">
                      {item.subItems.map((subItem, subIndex) => (
                        <a
                          key={subIndex}
                          href="#"
                          className="block px-6 py-3 text-sm text-gray-600 hover:text-black hover:bg-gray-50 transition-all duration-200 font-medium tracking-wide"
                        >
                          {subItem}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-6">
            <Heart className="w-5 h-5 text-gray-600" />
            <div className="relative">
              <ShoppingCart className="w-5 h-5 text-gray-600" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </div>
            <User className="w-5 h-5 text-gray-600" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

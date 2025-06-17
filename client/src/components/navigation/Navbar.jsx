import React, { useState } from "react";
import { ShoppingCart, User, Menu, X, Heart } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("Home");
  const [cartCount, setCartCount] = useState(2);

  const navItems = [
    { name: "Home", subItems: null },
    {
      name: "Shop",
      subItems: [
        "iPhone",
        "Samsung",
        "OnePlus",
        "Xiaomi",
        "Accessories",
        "Cases & Covers",
      ],
    },
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
    { name: "Contact", subItems: null },
  ];

  return (
    <nav className="bg-white border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          {/* Logo - Left aligned with unique typography */}
          <div className="flex items-center">
            <div className="text-3xl font-light tracking-wide text-gray-900">
              TMP
              <span className="w-2 h-2 bg-black rounded-full inline-block ml-1 mb-2"></span>
            </div>
            <div className="ml-3 text-xs text-gray-500 font-medium tracking-wider">
              THE MOBILE POINT
            </div>
          </div>

          {/* Center Navigation - Minimal with underline animation and dropdowns */}
          <div className="hidden md:flex items-center space-x-12">
            {navItems.map((item, index) => (
              <div key={index} className="relative group">
                <button
                  onClick={() => setActiveNav(item.name)}
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

                {/* Dropdown Menu */}
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

          {/* Right Side Actions - Minimal icons */}
          <div className="flex items-center space-x-6">
            {/* Wishlist - Hidden on mobile */}
            <button className="hidden md:block relative group">
              <Heart className="w-5 h-5 text-gray-600 hover:text-black transition-colors duration-300" />
              <span className="absolute -top-2 -right-2 w-4 h-4 bg-black text-white text-xs rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                3
              </span>
            </button>

            {/* Cart with clean badge */}
            <button className="relative group">
              <ShoppingCart className="w-5 h-5 text-gray-600 hover:text-black transition-colors duration-300" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-black text-white text-xs rounded-full flex items-center justify-center font-medium">
                  {cartCount}
                </span>
              )}
            </button>

            {/* User Account */}
            <button className="hidden md:block">
              <User className="w-5 h-5 text-gray-600 hover:text-black transition-colors duration-300" />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-gray-600" />
              ) : (
                <Menu className="w-6 h-6 text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu - Clean slide down */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="py-6 border-t border-gray-100">
            <div className="space-y-6">
              {navItems.map((item, index) => (
                <div key={index}>
                  <button
                    onClick={() => {
                      setActiveNav(item.name);
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left"
                  >
                    <span
                      className={`text-lg font-light tracking-wide transition-colors duration-300 ${
                        activeNav === item.name ? "text-black" : "text-gray-500"
                      }`}
                    >
                      {item.name.toUpperCase()}
                    </span>
                  </button>

                  {/* Mobile Sub Items */}
                  {item.subItems && (
                    <div className="mt-3 ml-4 space-y-2">
                      {item.subItems.map((subItem, subIndex) => (
                        <a
                          key={subIndex}
                          href="#"
                          className="block text-sm text-gray-400 hover:text-gray-600 transition-colors duration-200 font-medium tracking-wide"
                        >
                          {subItem}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Mobile only actions */}
              <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
                <button className="flex items-center space-x-3 text-gray-600">
                  <Heart className="w-5 h-5" />
                  <span className="text-sm font-medium tracking-wide">
                    WISHLIST
                  </span>
                  <span className="w-5 h-5 bg-gray-100 text-gray-600 text-xs rounded-full flex items-center justify-center">
                    3
                  </span>
                </button>

                <button className="flex items-center space-x-3 text-gray-600">
                  <User className="w-5 h-5" />
                  <span className="text-sm font-medium tracking-wide">
                    ACCOUNT
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

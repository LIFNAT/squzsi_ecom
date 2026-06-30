"use client";

import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/80 border-b border-pink-100 shadow-sm">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 group">
          <span className="text-2xl">🧸</span>
          <span className="text-xl font-bold text-pink-500 tracking-tight group-hover:text-pink-400 transition-colors duration-200">
            SquishyLand
          </span>
        </a>

        {/* Center Nav Links (Desktop) */}
        <ul className="hidden md:flex items-center gap-8">
          {["Home", "Shop", "Categories", "About"].map((link) => (
            <li key={link}>
              <a
                href="#"
                className="text-sm font-medium text-gray-500 hover:text-pink-500 transition-colors duration-200 relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-pink-400 after:transition-all after:duration-300 hover:after:w-full"
              >
                {link}
              </a>
            </li>
          ))}
        </ul>

        {/* Right Icons */}
        <div className="hidden md:flex items-center gap-3">
          {/* Search */}
          <button
            aria-label="Search"
            className="p-2 rounded-full text-gray-500 hover:text-pink-500 hover:bg-pink-50 transition-all duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
          </button>

          {/* Wishlist */}
          <button
            aria-label="Wishlist"
            className="p-2 rounded-full text-gray-500 hover:text-pink-500 hover:bg-pink-50 transition-all duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>

          {/* Cart */}
          <button
            aria-label="Cart"
            className="p-2 rounded-full text-gray-500 hover:text-pink-500 hover:bg-pink-50 transition-all duration-200 relative"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.5 6h13M7 13l-1-4m5 4v6m4-6v6" />
            </svg>
            <span className="absolute top-1 right-1 h-2 w-2 bg-pink-400 rounded-full"></span>
          </button>

          {/* Login */}
          <a
            href="#"
            className="ml-1 px-4 py-2 bg-pink-400 text-white text-sm font-semibold rounded-full hover:bg-pink-500 active:scale-95 transition-all duration-200 shadow-sm shadow-pink-200"
          >
            Login
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          aria-label="Toggle menu"
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 rounded-full text-gray-500 hover:text-pink-500 hover:bg-pink-50 transition-all duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white/95 border-t border-pink-100 px-6 py-4 flex flex-col gap-4">
          {["Home", "Shop", "Categories", "About"].map((link) => (
            <a key={link} href="#" className="text-sm font-medium text-gray-600 hover:text-pink-500 transition-colors duration-200">
              {link}
            </a>
          ))}
          <div className="flex items-center gap-4 pt-2 border-t border-pink-50">
            <a href="#" className="px-5 py-2 bg-pink-400 text-white text-sm font-semibold rounded-full hover:bg-pink-500 transition-all duration-200">
              Login
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

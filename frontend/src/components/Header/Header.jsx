import React, { useState } from 'react';
import { AiOutlineSearch, AiOutlineShoppingCart, AiOutlineUser, AiOutlineMenu, AiOutlineClose, AiOutlineHeart, AiOutlineBell } from 'react-icons/ai';
import { Link, NavLink } from 'react-router-dom';

const Header = ({ navItems = [] }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');


  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-surface dark:bg-dark-surface border-b border-border dark:border-dark-border sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Header */}
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-primary dark:text-dark-primary font-heading">
              ShopLogo
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item, index) => (
              <NavLink
                to={item.link}
                key={item.id || index}
                className={({ isActive }) =>
                  `text-text dark:text-dark-text hover:text-primary dark:hover:text-dark-primary transition-colors duration-200 ${
                    isActive ? 'border-b-2 border-primary dark:border-dark-primary' : ''
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* Search Bar - Hidden on mobile, shown on tablet+ */}
          <div className="hidden sm:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <AiOutlineSearch className="h-5 w-5 text-text-muted dark:text-dark-text-muted" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="block w-full pl-10 pr-3 py-2 border border-border dark:border-dark-border rounded-lg bg-background dark:bg-dark-background text-text dark:text-dark-text placeholder-text-muted dark:placeholder-dark-text-muted focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-dark-primary focus:border-transparent"
              />
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="p-2 text-text-muted dark:text-dark-text-muted hover:text-primary dark:hover:text-dark-primary transition-colors duration-200">
              <AiOutlineHeart className="h-6 w-6" />
            </button>
            <button className="p-2 text-text-muted dark:text-dark-text-muted hover:text-primary dark:hover:text-dark-primary transition-colors duration-200 relative">
              <AiOutlineBell className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-error dark:bg-dark-error text-white text-xs rounded-full flex items-center justify-center">
                2
              </span>
            </button>
            <button className="p-2 text-text-muted dark:text-dark-text-muted hover:text-primary dark:hover:text-dark-primary transition-colors duration-200 relative">
              <AiOutlineShoppingCart className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-primary dark:bg-dark-primary text-white text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </button>
            <button className="p-2 text-text-muted dark:text-dark-text-muted hover:text-primary dark:hover:text-dark-primary transition-colors duration-200">
              <AiOutlineUser className="h-6 w-6" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <button className="p-2 text-text-muted dark:text-dark-text-muted hover:text-primary dark:hover:text-dark-primary transition-colors duration-200 relative">
              <AiOutlineShoppingCart className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-primary dark:bg-dark-primary text-white text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </button>
            <button
              onClick={toggleMobileMenu}
              className="p-2 text-text dark:text-dark-text hover:text-primary dark:hover:text-dark-primary transition-colors duration-200"
            >
              {isMobileMenuOpen ? (
                <AiOutlineClose className="h-6 w-6" />
              ) : (
                <AiOutlineMenu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search - Below main header on mobile */}
        <div className="sm:hidden py-3 border-t border-border dark:border-dark-border">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <AiOutlineSearch className="h-5 w-5 text-text-muted dark:text-dark-text-muted" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="block w-full pl-10 pr-3 py-2 border border-border dark:border-dark-border rounded-lg bg-background dark:bg-dark-background text-text dark:text-dark-text placeholder-text-muted dark:placeholder-dark-text-muted focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-dark-primary focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border dark:border-dark-border bg-surface dark:bg-dark-surface">
          <div className="px-4 py-3 space-y-3">
            {navItems.map((item, index) => (
              <a
                key={item.id || index}
                href={item.href}
                className="block px-3 py-2 text-text dark:text-dark-text hover:text-primary dark:hover:text-dark-primary hover:bg-background dark:hover:bg-dark-background rounded-md transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}

            {/* Mobile Action Buttons */}
            <div className="pt-3 border-t border-border dark:border-dark-border">
              <div className="flex items-center justify-around">
                <button className="flex flex-col items-center p-2 text-text-muted dark:text-dark-text-muted hover:text-primary dark:hover:text-dark-primary transition-colors duration-200">
                  <AiOutlineHeart className="h-6 w-6 mb-1" />
                  <span className="text-xs">Wishlist</span>
                </button>
                <button className="flex flex-col items-center p-2 text-text-muted dark:text-dark-text-muted hover:text-primary dark:hover:text-dark-primary transition-colors duration-200 relative">
                  <AiOutlineBell className="h-6 w-6 mb-1" />
                  <span className="absolute top-1 right-1 h-3 w-3 bg-error dark:bg-dark-error text-white text-xs rounded-full flex items-center justify-center">
                    2
                  </span>
                  <span className="text-xs">Alerts</span>
                </button>
                <button className="flex flex-col items-center p-2 text-text-muted dark:text-dark-text-muted hover:text-primary dark:hover:text-dark-primary transition-colors duration-200">
                  <AiOutlineUser className="h-6 w-6 mb-1" />
                  <span className="text-xs">Account</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
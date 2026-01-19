"use client"
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation';
import {
  ShoppingBag,
  Search,
  User,
  Heart,
  Menu,
  X,
  ShoppingCart,
  LogOut,
  ChevronRight
} from 'lucide-react';
import { categories, accountMenu } from '../../constants/navbar.constants';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';

  const accountDropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (accountDropdownRef.current && !accountDropdownRef.current.contains(event.target)) {
        setIsAccountOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navBackground = isHome && !isScrolled
    ? 'bg-transparent border-transparent'
    : 'bg-neutral-900/95 backdrop-blur-md border-neutral-800 shadow-lg';

  const textColor = isHome && !isScrolled
    ? 'text-white hover:text-white/80'
    : 'text-white hover:text-neutral-300';

  const iconColor = isHome && !isScrolled
    ? 'text-white'
    : 'text-white';

  const logoBg = isHome && !isScrolled
    ? 'bg-white text-neutral-900'
    : 'bg-white text-neutral-900';

  const borderColor = isHome && !isScrolled
    ? 'after:bg-white'
    : 'after:bg-white';

  const router = useRouter();

  const handleLogin = () => {
    router.push('/login');
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsAccountOpen(false);
    console.log('Logout clicked');
  };

  const handleRegister = () => {
    router.push('/register');
    setIsMenuOpen(false);
  };

  const closeMobileMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${navBackground}`}>
      {/* Top Utility Bar - Keep dark for contrast */}
      {!isHome && (
        <div className="bg-neutral-800 text-white text-[11px] font-medium tracking-widest text-center py-2 hidden md:block uppercase">
          Complimentary Shipping on Global Orders Over $300
        </div>
      )}

      <div className="max-w-[1920px] mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Mobile Menu Trigger */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`${iconColor} transition-colors p-2 -ml-2`}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X className="w-6 h-6" strokeWidth={1} /> : <Menu className="w-6 h-6" strokeWidth={1} />}
            </button>
          </div>

          {/* Brand Logo */}
          <div className="flex-shrink-0 flex items-center md:mr-16">
            <Link href="/" className="group flex items-center gap-2">
              <div className={`${logoBg} p-1.5 rounded-sm transition-colors duration-300`}>
                <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
              </div>
              <span className={`text-2xl font-semibold tracking-tighter group-hover:opacity-80 transition-all ${isHome && !isScrolled ? 'text-white' : 'text-white'}`}>
                SWAP.
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 lg:gap-12 absolute left-1/2 -translate-x-1/2">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className={`text-sm font-medium ${textColor} transition-all uppercase tracking-wide relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-[1px] after:bottom-[-4px] after:left-0 ${borderColor} after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left`}
              >
                {category.name}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4 md:gap-6">
            <button className={`${iconColor} hover:opacity-70 transition-colors hidden md:block`}>
              <Search className="w-5 h-5" strokeWidth={1.5} />
            </button>

            {/* Authentication Section */}
            {isAuthenticated ? (
              <div className="relative hidden md:block" ref={accountDropdownRef}>
                <button
                  onClick={() => setIsAccountOpen(!isAccountOpen)}
                  className={`flex items-center gap-1 ${iconColor} hover:opacity-70 transition-colors p-1`}
                >
                  <User className="w-5 h-5" strokeWidth={1.5} />
                </button>

                {/* Dropdown Menu - Keep white for contrast */}
                <div className={`absolute right-0 mt-4 w-48 bg-white border border-neutral-200 shadow-xl rounded-sm py-2 transition-all duration-200 origin-top-right ${isAccountOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                  {accountMenu.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="flex items-center gap-3 px-4 py-2 text-sm text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 transition-colors"
                      onClick={() => setIsAccountOpen(false)}
                    >
                      {item.icon && <item.icon className="w-4 h-4" />}
                      {item.name}
                    </Link>
                  ))}
                  <div className="border-t border-neutral-200 my-2"></div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-2 text-sm text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 transition-colors w-full text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-4">
                <button
                  onClick={handleLogin}
                  className={`text-sm font-medium ${isHome && !isScrolled ? 'text-white hover:text-white/80' : 'text-white hover:text-neutral-300'} transition-colors`}
                >
                  Login
                </button>
                <button
                  onClick={handleRegister}
                  className={`px-4 py-2 text-sm font-medium ${isHome && !isScrolled ? 'bg-white text-neutral-900 hover:bg-white/90' : 'bg-white text-neutral-900 hover:bg-neutral-100'} rounded-sm transition-colors`}
                >
                  Register
                </button>
              </div>
            )}

            <Link href="/cart" className={`flex items-center gap-2 ${iconColor} hover:opacity-70 transition-opacity relative`}>
              <div className="relative">
                <ShoppingCart className="w-5 h-5" strokeWidth={1.5} />
                <span className={`absolute -top-1.5 -right-1.5 ${isHome && !isScrolled ? 'bg-white text-neutral-900' : 'bg-white text-neutral-900'} text-[9px] font-bold h-3.5 w-3.5 flex items-center justify-center rounded-full transition-colors`}>
                  2
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay - Dark mode version */}
      <div
        className={`fixed inset-0 bg-neutral-900 z-40 transform transition-transform duration-300 ease-in-out md:hidden ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} top-0`}
      >
        {/* Mobile Menu Header with Close Button */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-800 h-20">
          <div className="flex items-center gap-2">
            <div className="bg-white text-neutral-900 p-1.5 rounded-sm">
              <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
            </div>
            <span className="text-2xl font-semibold tracking-tighter text-white">
              SWAP.
            </span>
          </div>
          <button
            onClick={closeMobileMenu}
            className="text-white p-2"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" strokeWidth={1} />
          </button>
        </div>

        {/* Mobile Menu Content */}
        <div className="p-6 space-y-6 h-full overflow-y-auto pb-40">
          {/* Mobile Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full bg-neutral-800 border border-neutral-700 p-3 pl-10 rounded-sm text-sm focus:outline-none focus:border-white transition-colors text-white placeholder:text-neutral-400"
            />
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
          </div>

          {/* Mobile Categories Links */}
          <div className="flex flex-col space-y-4">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                href={cat.href}
                onClick={closeMobileMenu}
                className="flex items-center justify-between text-lg font-medium text-white border-b border-neutral-800 pb-4 group"
              >
                {cat.name}
                <ChevronRight className="w-5 h-5 text-neutral-400 group-hover:text-white transition-colors" />
              </Link>
            ))}
          </div>

          {/* Mobile Authentication Section */}
          <div className="pt-6">
            <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-4">Account</p>

            {isAuthenticated ? (
              // Mobile logged in view
              <div className="space-y-3">
                {accountMenu.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3 text-neutral-300 hover:text-white py-2 transition-colors"
                  >
                    {item.icon && <item.icon className="w-4 h-4" />}
                    {item.name}
                  </Link>
                ))}
                <button
                  onClick={() => {
                    handleLogout();
                    closeMobileMenu();
                  }}
                  className="flex items-center gap-3 text-neutral-300 hover:text-white py-2 transition-colors w-full text-left"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            ) : (
              // Mobile not logged in view
              <div className="flex flex-col gap-3">
                <button
                  onClick={handleLogin}
                  className="w-full text-left py-3 px-4 border border-white text-white hover:bg-white/10 rounded-sm transition-colors font-medium"
                >
                  Login
                </button>
                <button
                  onClick={handleRegister}
                  className="w-full text-left py-3 px-4 bg-white text-neutral-900 hover:bg-neutral-100 rounded-sm transition-colors font-medium"
                >
                  Create Account
                </button>
              </div>
            )}
          </div>

          {/* Mobile Wishlist & Cart */}
          <div className="pt-6 border-t border-neutral-800">
            <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-4">Quick Links</p>
            <div className="space-y-3">
              <Link href="#" onClick={closeMobileMenu} className="flex items-center justify-between text-neutral-300 hover:text-white py-2">
                <div className="flex items-center gap-3">
                  <Heart className="w-4 h-4" />
                  <span>Wishlist</span>
                </div>
                <span className="bg-white text-neutral-900 text-xs font-bold h-5 w-5 flex items-center justify-center rounded-full">
                  3
                </span>
              </Link>
              <Link href="/cart" onClick={closeMobileMenu} className="flex items-center justify-between text-neutral-300 hover:text-white py-2">
                <div className="flex items-center gap-3">
                  <ShoppingCart className="w-4 h-4" />
                  <span>Shopping Cart</span>
                </div>
                <span className="bg-white text-neutral-900 text-xs font-bold h-5 w-5 flex items-center justify-center rounded-full">
                  2
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Backdrop */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={closeMobileMenu}
        />
      )}
    </nav>
  );
}
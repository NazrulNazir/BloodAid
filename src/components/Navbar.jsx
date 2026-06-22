"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  FaHeartbeat,
  FaHandHoldingHeart,
  FaSearch,
  FaMoneyBillWave,
  FaBars,
  FaTimes,
  FaRegUserCircle,
} from "react-icons/fa";

export default function NavBar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href) => pathname === href;

  const navItems = [
    { name: "Home", href: "/" },
    {
      name: "Donaton Requests",
      href: "/donation-requests",
      icon: <FaHandHoldingHeart />,
    },
    { name: "Search Donor", href: "/search-donors", icon: <FaSearch /> },
    // { name: "Funding", href: "/funding", icon: <FaMoneyBillWave /> },
  ];

  return (
    <div className="sticky top-0 z-40 border-b border-gray-200 bg-white/70 backdrop-blur-lg shadow-sm">
      <nav className="max-w-7xl mx-auto">
        <header className="flex h-16 items-center justify-between px-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <FaHeartbeat className="text-red-500 text-xl" />
            <p className="font-bold text-lg text-[#1E3A8A]">Blood<span className="text-red-600">Aid</span></p>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center gap-6 text-gray-700 font-medium">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-1 ${
                    isActive(item.href) ? "text-red-500" : "hover:text-red-500"
                  }`}
                >
                  {item.icon} {item.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Login + Mobile Button */}
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="hidden md:block bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600"
            >
              <span className="flex items-center gap-2">
                <FaRegUserCircle />
                Login
              </span>
            </Link>

            {/* Mobile Hamburger */}
            <button
              className="md:hidden text-2xl"
              onClick={() => setOpen(!open)}
            >
              {open ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </header>

        {/* Mobile Menu */}
        {open && (
          <div className="md:hidden px-6 pb-4">
            <ul className="flex flex-col gap-4 text-gray-700 font-medium">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-2 ${
                      isActive(item.href)
                        ? "text-red-500"
                        : "hover:text-red-500"
                    }`}
                  >
                    {item.icon} {item.name}
                  </Link>
                </li>
              ))}

              <li>
                <Link
                  href="/login"
                  className="inline-block bg-red-500 text-white px-15 py-2 rounded-lg hover:bg-red-600"
                >
                  <span className="flex items-center gap-2 justify-center">
                    <FaRegUserCircle />
                    Login
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </div>
  );
}

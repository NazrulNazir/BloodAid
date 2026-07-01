"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, Button, Modal, Popover } from "@heroui/react";
import { FiLogOut } from "react-icons/fi";
import { MdDashboard } from "react-icons/md";

import {
  FaHeartbeat,
  FaHandHoldingHeart,
  FaSearch,
  FaMoneyBillWave,
  FaBars,
  FaTimes,
  FaRegUserCircle,
} from "react-icons/fa";
import { signOut, useSession } from "@/lib/auth-client";
import { RiLogoutCircleRLine } from "react-icons/ri";
import toast from "react-hot-toast";
import { TbCoinTaka } from "react-icons/tb";

export default function NavBar() {
  const { data } = useSession();
  const user = data?.user;

  const handleLogout = () => {};

  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isActive = (href) => pathname === href;

  if (pathname.includes("dashboard")) {
    return null;
  }

  const navItems = [
    { name: "Home", href: "/" },
    {
      name: "Donaton Requests",
      href: "/alldonationreq",
      icon: <FaHandHoldingHeart />,
    },
    { name: "funding", href: "/funding", icon: <TbCoinTaka /> },
  ];

  // const hadleLogout = async () => {
  //   await signOut();
  //   toast.success("Logout Successful");
  //   router.push("/");
  // };

  const profileModal = (
    <>
      <Popover placement="bottom-end">
        <Popover.Trigger className="flex sm:block items-center gap-2 hover:bg-gray-100 sm:hover:bg-white py-2 pl-2 rounded-md">
          <Avatar size="sm">
            <Avatar.Image
              alt="Sarah Johnson"
              src={`${user?.image} || https://img.heroui.chat/image/avatar?w=400&h=400&u=1`}
            />
            <Avatar.Fallback>SJ</Avatar.Fallback>
          </Avatar>
          <span className="flex sm:hidden">Profile</span>
        </Popover.Trigger>

        <Popover.Content className="w-65 rounded-3xl p-4 shadow-xl">
          <div className="w-full">
            {/* User Info */}
            <div className="pb-4">
              <h4 className="text-sm font-semibold">{user?.name}</h4>
              <p className="text-xs text-default-500">{user?.email}</p>
            </div>

            {/* Menu Items */}
            <div className="space-y-1 ">
              <Link
                href={`/dashboard/${user?.role.toLowerCase()}`}
                className="flex items-center gap-1 py-2 pl-3 w-full justify-start hover:bg-gray-100 rounded-md hover:text-red-600"
              >
                <MdDashboard size={18} />
                Dashboard
              </Link>

              <Button
                onClick={() => {
                  signOut();
                  toast.success("Logout successfully..");
                }}
                variant="light"
                color="danger"
                className="w-full justify-start bg-danger-50 text-red-700 hover:bg-red-50 rounded-md"
                startContent={<FiLogOut size={18} />}
                onPress={handleLogout}
              >
                <RiLogoutCircleRLine />
                Logout
              </Button>
            </div>
          </div>
        </Popover.Content>
      </Popover>
    </>
  );

  return (
    <div className="sticky top-0 z-40 border-b border-gray-200 bg-white/70 backdrop-blur-lg shadow-sm">
      <nav className="max-w-7xl mx-auto">
        <header className="flex h-16 items-center justify-between px-6">
          {/* Logo */}
          <Link href={"/"}>
            <div className="flex items-center gap-3">
              <FaHeartbeat className="text-red-500 text-xl" />
              <p className="font-bold text-lg text-[#1E3A8A]">
                Blood<span className="text-red-600">Aid</span>
              </p>
            </div>
          </Link>
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
            <div className="hidden md:block">
              {user ? (
                <div>{profileModal}</div>
              ) : (
                <div className="flex">
                  <Link
                    href="/login"
                    className=" bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600"
                  >
                    <span className="flex items-center gap-2">
                      <FaRegUserCircle />
                      Login
                    </span>
                  </Link>
                </div>
              )}
            </div>

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
                <div className="">
                  <div>{profileModal}</div>
                </div>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </div>
  );
}

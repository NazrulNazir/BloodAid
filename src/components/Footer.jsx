'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function Footer() {
  const pathName = usePathname();
  console.log(pathName)
  if(pathName.includes('dashboard')){
    return null;
  }
  return (
    <footer className="bg-[#0F172A] text-white border border-slate-700 mt-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 px-8 py-8">
        {/* About */}
        <div>
          <h3 className="text-lg font-semibold mb-4">About BloodAid</h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            BloodAid is a voluntary blood donation platform.
            <br />
            We connect donors with people in need of blood.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>

          <div className="flex flex-col gap-2 text-sm text-slate-300">
            <Link href="/" className="hover:text-red-400 transition">
              Home
            </Link>

            <Link
              href="/donation-requests"
              className="hover:text-red-400 transition"
            >
              All Requests
            </Link>

            <Link
              href="/search-donors"
              className="hover:text-red-400 transition"
            >
              Search Donors
            </Link>

            <Link href="/funding" className="hover:text-red-400 transition">
              Funding
            </Link>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>

          <div className="space-y-3 text-sm text-slate-300">
            <div className="flex items-center gap-3">
              <FaPhoneAlt size={14} />
              <span>+880 123-4567890</span>
            </div>

            <div className="flex items-center gap-3">
              <FaEnvelope size={14} />
              <span>info@bloodaid.com</span>
            </div>

            <div className="flex items-center gap-3">
              <FaMapMarkerAlt size={14} />
              <span>Dhaka, Bangladesh</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="border-t border-slate-700 py-4 text-center text-sm text-slate-400">
        © 2024 BloodAid. All rights reserved.
      </div>
    </footer>
  );
}
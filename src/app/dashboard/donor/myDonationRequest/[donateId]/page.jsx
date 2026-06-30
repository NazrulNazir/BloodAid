'use client'
import {
  FiUser,
  FiCalendar,
  FiClock,
  FiMapPin,
} from "react-icons/fi";
import { FaHospital } from "react-icons/fa";
import { useParams } from "next/navigation";
// import { myDonationRequestDetails } from "@/lib/api";
import { useEffect, useState } from "react";
import { myDonationRequestDetails } from "@/lib/api";
import { useSession } from "@/lib/auth-client";

export default function DonationRequestDetailPage() {

    const [donations, setDonations] = useState([]);

    // dynamic route id
    const { donateReqId } = useParams();
    // console.log(donateReqId);

    const { data } = useSession();
      const user = data?.user;
      const email  = user?.email;

useEffect(() => {
  if (!donateReqId) return;

  const donationFun = async () => {
    try {
      const donationDetails = await myDonationRequestDetails(donateReqId, email);
      setDonations(donationDetails);
    } catch (error) {
      console.error(error);
    }
  };

  donationFun();
}, [donateReqId, email]);

    console.log(donations);
  return (
    <section className="bg-[#fafafa] min-h-screen py-12 px-4">

      {/* Title */}
      <div className="text-center">
        <h1 className="text-5xl font-black">
          Request <span className="text-red-600">Details</span>
        </h1>

        <p className="text-gray-500 mt-2">
          View urgency, location, and requirements.
        </p>
      </div>

      <div className="max-w-5xl mx-auto mt-12 relative">

        {/* Status */}
        <div className="flex justify-end mb-3">

          <span className="bg-orange-100 text-orange-500 text-xs font-bold uppercase tracking-widest px-5 py-2 rounded-full">
            {donations.donationStatus}
          </span>

        </div>

        {/* Card */}

        <div className="bg-white rounded-[35px] shadow-xl p-10">

          {/* Top */}

          <div className="flex flex-col md:flex-row justify-between gap-10">

            {/* Left */}

            <div className="flex items-center gap-6">

              <div className="w-20 h-20 rounded-3xl bg-red-50 flex items-center justify-center shadow">

                <FiUser className="text-red-500 text-4xl" />

              </div>

              <div>

                <h2 className="text-4xl font-black">
                  {donations.recipientName}
                </h2>

                <p className="uppercase tracking-[4px] text-xs text-gray-400 mt-2">
                  Recipient • Patient
                </p>

              </div>

            </div>

            {/* Blood */}

            <div className="bg-red-50 rounded-3xl px-8 py-6 flex items-center gap-5">

              <div className="w-14 h-14 rounded-2xl bg-red-600 text-white flex items-center justify-center font-black text-2xl">
                {donations.bloodGroup}
              </div>

              <div>

                <p className="uppercase text-[10px] tracking-[3px] text-red-500 font-bold">
                  Required
                </p>

                <h3 className="font-bold text-xl">
                  Blood Group
                </h3>

              </div>

            </div>

          </div>

          {/* Divider */}

          <div className="grid lg:grid-cols-2 gap-16 mt-16">
                        {/* Left Side */}
            <div>

              <h4 className="text-xs uppercase tracking-[4px] text-gray-400 font-bold mb-8">
                Location Details
              </h4>

              {/* Hospital */}

              <div className="flex gap-4 mb-10">

                <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center">
                  <FaHospital className="text-green-600 text-xl" />
                </div>

                <div>

                  <p className="text-[11px] uppercase tracking-[2px] text-gray-400 font-semibold">
                    Hospital
                  </p>

                  <h3 className="font-extrabold text-xl leading-7 mt-1">
                    {donations.hospitalName}
                  </h3>

                  <p className="text-gray-500 mt-1">
                    {`${donations.recipientUpazila}, ${donations.recipientDistrict}`}
                  </p>

                </div>

              </div>

              {/* Address */}

              <div className="flex gap-4">

                <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center">
                  <FiMapPin className="text-red-600 text-xl" />
                </div>

                <div>

                  <p className="text-[11px] uppercase tracking-[2px] text-gray-400 font-semibold">
                    Full Address
                  </p>

                  <h3 className="font-bold text-lg mt-1">
                    {donations.fullAddress}
                  </h3>

                </div>

              </div>

            </div>

            {/* Right Side */}

            <div>

              <h4 className="text-xs uppercase tracking-[4px] text-gray-400 font-bold mb-8">
                Timing & Urgency
              </h4>

              <div className="flex gap-10">

                {/* Date */}

                <div className="flex gap-3">

                  <div className="w-11 h-11 rounded-xl bg-red-50 flex items-center justify-center">
                    <FiCalendar className="text-red-500 text-xl" />
                  </div>

                  <div>

                    <p className="text-[11px] uppercase tracking-[2px] text-gray-400 font-semibold">
                      Required Date
                    </p>

                    <h3 className="font-black text-2xl leading-7">
                      {donations.donationDate}
                    </h3>

                  </div>

                </div>

                {/* Time */}

                <div className="flex gap-3">

                  <div className="w-11 h-11 rounded-xl bg-gray-100 flex items-center justify-center">
                    <FiClock className="text-gray-700 text-xl" />
                  </div>

                  <div>

                    <p className="text-[11px] uppercase tracking-[2px] text-gray-400 font-semibold">
                      Time
                    </p>

                    <h3 className="font-black text-2xl">
                      {donations.donationTime}
                    </h3>

                  </div>

                </div>

              </div>

              {/* Message */}

              <div className="mt-10 border border-yellow-100 bg-yellow-50 rounded-3xl p-6">

                <p className="uppercase text-[11px] tracking-[3px] text-yellow-700 font-bold">
                  Request Message
                </p>

                <p className="italic text-gray-500 mt-3">
                  {donations.requestMessage}
                </p>

              </div>

              {/* Donate Button */}

              <button className="mt-12 w-full h-16 rounded-2xl bg-red-600 text-white font-bold text-xl shadow-lg hover:bg-red-700 duration-300">
                Donate Now
              </button>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}
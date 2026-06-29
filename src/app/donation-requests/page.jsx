import { getPendingDonationRequests } from "@/lib/api";
import Link from "next/link";
import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import { FiArrowRight, FiCalendar, FiClock } from "react-icons/fi";

const DonatinsRequest = async () => {
  const donations = await getPendingDonationRequests();
  console.log(donations);
  return (
    <div className="px-10 mt-15">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {donations.map((data) => (
          <div
            key={data._id}
            className="group rounded-[32px] overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
          >
            {/* Top */}
            <div className="bg-linear-to-b from-orange-50 to-white px-8 pt-8 pb-5 relative">
              <p className="text-[11px] uppercase tracking-[4px] text-orange-500 font-bold">
                Pending
              </p>

              {/* Blood Group */}
              <div className="absolute left-8 top-14 w-16 h-16 rounded-2xl bg-white shadow-xl flex items-center justify-center">
                <span className="text-2xl font-black text-red-600">
                  {data.bloodGroup}
                </span>
              </div>
            </div>

            {/* Body */}
            <div className="px-8 pt-12 pb-8">
              <h2 className="text-2xl font-extrabold text-center">
                {data.recipientName}
              </h2>

              <p className="text-center uppercase tracking-[3px] text-xs text-gray-400 mt-1">
                Recipient
              </p>

              {/* Location */}
              <div className="flex items-start gap-3 mt-10">
                <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center">
                  <FaLocationDot className="text-orange-500 text-lg" />
                </div>

                <div>
                  <p className="uppercase text-[10px] tracking-[3px] text-gray-400 font-semibold">
                    Location
                  </p>

                  <p className="font-semibold text-gray-700">
                    {data.recipientUpazila}, {data.recipientDistrict}
                  </p>
                </div>
              </div>

              {/* Date & Time */}
              <div className="flex justify-between mt-7">
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
                    <FiCalendar className="text-red-500" />
                  </div>

                  <div>
                    <p className="uppercase text-[10px] tracking-[3px] text-gray-400 font-semibold">
                      Date
                    </p>

                    <p className="font-bold text-sm">{data.donationDate}</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
                    <FiClock className="text-gray-700" />
                  </div>

                  <div>
                    <p className="uppercase text-[10px] tracking-[3px] text-gray-400 font-semibold">
                      Time
                    </p>

                    <p className="font-bold text-sm">{data.donationTime}</p>
                  </div>
                </div>
              </div>

              {/* Button */}
              <Link
                href={`/donation-requests/${data._id}`}
                className="mt-8 flex items-center justify-center gap-2 h-14 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-bold transition-all duration-300"
              >
                View Details
                <FiArrowRight className="text-lg" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonatinsRequest;

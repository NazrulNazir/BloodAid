import NoDonationRequest from "@/components/NoDonationRequest";
import Image from "next/image";
import React from "react";

const DonorDashboardPage = () => {
  return (
    <div>
      <div className="flex flex-col-reverse sm:flex-row justify-center items-center sm:justify-between bg-[#fce8e9] sm:px-15 pb-10 sm:pb-0 rounded-b-md">
        <div className="flex flex-col sm:order-0 justify-center sm:items-start px-10 text-center">
          <h3 className="text-xl font-bold text-gray-500">Welcome Back,</h3>
          <h3 className="text-4xl font-bold text-gray-800">Moments Hub</h3>
        </div>
        <div className="">
          <Image
            className="w-40 h-30 sm:w-60 sm:h-50"
            width={350}
            height={350}
            src={`/assets/dashboard-right.png`}
            alt="dashboard"
          ></Image>
        </div>
      </div>
      <NoDonationRequest/>
    </div>
  );
};

export default DonorDashboardPage;

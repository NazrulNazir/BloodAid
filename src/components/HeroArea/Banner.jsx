"use client";

import Image from "next/image";
import React from "react";
import { Button } from "@heroui/react";
import { FaTint, FaUsers, FaHeartbeat, FaHandHoldingHeart } from "react-icons/fa";

const Banner = () => {
  const stats = [
    {
      icon: <FaUsers />,
      count: "10K+",
      label: "Donors",
    },
    {
      icon: <FaHandHoldingHeart />,
      count: "3K+",
      label: "Requests",
    },
    {
      icon: <FaHeartbeat />,
      count: "8K+",
      label: "Lives Saved",
    },
    {
      icon: <FaTint />,
      count: "50K+",
      label: "Happy People",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-10">
      <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-10">

        {/* Left Side */}
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-full mb-5">
            <FaTint />
            Donate Blood, Save Lives
          </div>

          <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
            Donate <span className="text-red-600">Blood</span>
          </h1>

          <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
            Save Life
          </h1>

          <p className="mt-6 text-gray-600 text-lg">
            Your single donation can save multiple lives.
            Join our blood donation community and help people
            when they need it most.
          </p>

          <div className="flex gap-4 mt-8">
            <Button color="danger" size="lg">
              Donate Now
            </Button>

            <Button variant="bordered" size="lg">
              Learn More
            </Button>
          </div>
        </div>

        {/* Right Side */}
        <div className="relative">
          <Image
            width={500}
            height={500}
            src="/assets/blood.png"
            alt="Blood Donation"
            className="w-full max-w-md lg:max-w-lg"
            priority
          />
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 my-10">
        {stats.map((item, index) => (
          <div
            key={index}
            className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm text-center hover:shadow-lg transition"
          >
            <div className="text-red-600 text-3xl flex justify-center mb-3">
              {item.icon}
            </div>

            <h3 className="text-3xl font-bold">{item.count}</h3>

            <p className="text-gray-500 mt-1">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Banner;
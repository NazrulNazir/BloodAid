"use client";

import { useEffect, useState } from "react";
import { getDistrict, getUpazila, searchDonors } from "@/lib/api";
import Image from "next/image";

const bloodGroups = [
  "A+",
  "A-",
  "B+",
  "B-",
  "AB+",
  "AB-",
  "O+",
  "O-",
];

export default function SearchPage({donors}) {
    
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);

  const [filteredUpazila, setFilteredUpazila] = useState([]);

  const [bloodGroup, setBloodGroup] = useState("");
  const [district, setDistrict] = useState("");
  const [upazila, setUpazila] = useState("");

//   const [donors, setDonors] = useState([]);

  const [loading, setLoading] = useState(false);

  const [searched, setSearched] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      const districtData = await getDistrict();
      const upazilaData = await getUpazila();

      setDistricts(districtData);
      setUpazilas(upazilaData);
    };

    loadData();
  }, []);

  useEffect(() => {
    if (!district) {
        
    //   setFilteredUpazila([]);
      return;
    }

    const selectedDistrict = districts.find((d) => d.name === district);

    if (!selectedDistrict) return;

    const filtered = upazilas.filter(
      (u) => u.district_id === selectedDistrict.id
    );

    setFilteredUpazila(filtered);
    setUpazila("");
  }, [district, districts, upazilas]);

  const handleSearch = async (e) => {
    e.preventDefault();

    setLoading(true);

    setSearched(true);

    try {
      const data = await searchDonors({
        bloodGroup,
        district,
        upazila,
      });

      setDonors(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gray-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-5">

        <div className="text-center mb-12">

          <h1 className="text-5xl font-black">
            Find <span className="text-red-600">Blood Donor</span>
          </h1>

          <p className="text-gray-500 mt-3">
            Search active blood donors by blood group and location.
          </p>

        </div>

        <form
          onSubmit={handleSearch}
          className="bg-white shadow-lg rounded-3xl p-8"
        >
          <div className="grid md:grid-cols-4 gap-5">

            <div>
              <label className="font-semibold mb-2 block">
                Blood Group
              </label>

              <select
                required
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
                className="w-full border rounded-xl px-4 py-3"
              >
                <option value="">Select</option>

                {bloodGroups.map((blood) => (
                  <option key={blood}>{blood}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-semibold mb-2 block">
                District
              </label>

              <select
                required
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full border rounded-xl px-4 py-3"
              >
                <option value="">Select</option>

                {districts.map((item) => (
                  <option key={item.id} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-semibold mb-2 block">
                Upazila
              </label>

              <select
                required
                value={upazila}
                onChange={(e) => setUpazila(e.target.value)}
                className="w-full border rounded-xl px-4 py-3"
              >
                <option value="">Select</option>

                {filteredUpazila.map((item) => (
                  <option key={item.id} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-end">

              <button
                className="bg-red-600 hover:bg-red-700 duration-300 text-white rounded-xl h-12.5 w-full font-semibold"
              >
                Search
              </button>

            </div>
          </div>
        </form>

        {loading && (
          <div className="text-center py-20 text-xl font-semibold">
            Loading...
          </div>
        )}

        {!loading && searched && donors.length === 0 && (
          <div className="text-center py-20">

            <h2 className="text-3xl font-bold">
              No Donor Found
            </h2>

            <p className="text-gray-500 mt-2">
              Try another blood group or location.
            </p>

          </div>
        )}

        {!loading && donors.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">

            {donors.map((donor) => (
              <div
                key={donor._id}
                className="bg-white rounded-3xl shadow-lg p-7 hover:shadow-xl duration-300"
              >
                <div className="flex items-center gap-4">

                  <Image
                  width={100} height={100}
                    src={
                      donor.image ||
                      "https://i.ibb.co/4pDNDk1/avatar.png"
                    } alt="hello"
                    className="w-20 h-20 rounded-full object-cover"
                  />

                  <div>

                    <h2 className="text-2xl font-bold">
                      {donor.name}
                    </h2>

                    <p className="text-gray-500">
                      {donor.email}
                    </p>

                  </div>
                </div>

                <div className="mt-6 space-y-3">

                  <div className="flex justify-between">

                    <span className="text-gray-500">
                      Blood Group
                    </span>

                    <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full font-bold">
                      {donor.bloodGroup}
                    </span>

                  </div>

                  <div className="flex justify-between">

                    <span className="text-gray-500">
                      District
                    </span>

                    <span className="font-semibold">
                      {donor.district}
                    </span>

                  </div>

                  <div className="flex justify-between">

                    <span className="text-gray-500">
                      Upazila
                    </span>

                    <span className="font-semibold">
                      {donor.upazila}
                    </span>

                  </div>

                  <div className="flex justify-between">

                    <span className="text-gray-500">
                      Status
                    </span>

                    <span className="text-green-600 font-bold">
                      {donor.status}
                    </span>

                  </div>

                </div>

                <button
                  className="mt-8 w-full bg-red-600 hover:bg-red-700 duration-300 text-white py-3 rounded-xl font-semibold"
                >
                  Contact Donor
                </button>

              </div>
            ))}

          </div>
        )}
      </div>
    </section>
  );
}
import { FiUsers } from "react-icons/fi";
import { FaHandHoldingUsd, FaTint } from "react-icons/fa";
import { allDonationRequest, allUser, getFunding } from "@/lib/api";

export default async function DashboardHome() {
    const donations = await allUser();
    const facilities = await allDonationRequest();
    const totalFunding = await getFunding();
    const allReq = facilities.length;
    const totalDonar = donations.length || 20;
  
    const totalAmount = totalFunding.reduce((total, item) => {
    return total + item.amount;
  }, 0);

  return (
    <section className="p-6 bg-[#fafafa] min-h-screen">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-5xl font-extrabold text-gray-900">
          Hello, <span className="text-red-500">Mahedi Hasan!</span>
        </h1>

        <p className="text-gray-500 mt-2">
          Manage your activities and help save lives today.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {/* Card 1 */}
        <div className="bg-white rounded-3xl shadow-sm p-8 hover:shadow-lg duration-300">
          <div className="flex justify-between items-start">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center">
              <FiUsers className="text-2xl text-blue-600" />
            </div>

            <span className="bg-green-50 text-green-600 text-sm font-semibold px-3 py-1 rounded-full">
              ↗ +12%
            </span>
          </div>

          <div className="mt-10">
            <p className="text-gray-400 font-medium">Total Donors</p>

            <h2 className="text-5xl font-black mt-2">{totalDonar}</h2>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-3xl shadow-sm p-8 hover:shadow-lg duration-300">
          <div className="flex justify-between items-start">
            <div className="w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center">
              <FaHandHoldingUsd className="text-2xl text-green-600" />
            </div>

            <span className="bg-green-50 text-green-600 text-sm font-semibold px-3 py-1 rounded-full">
              ↗ +5%
            </span>
          </div>

          <div className="mt-10">
            <p className="text-gray-400 font-medium">Total Funding</p>

            <h2 className="text-5xl font-black mt-2">{totalAmount} <span className="text-blue-500">$</span></h2>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-3xl shadow-sm p-8 hover:shadow-lg duration-300">
          <div className="flex justify-between items-start">
            <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center">
              <FaTint className="text-2xl text-red-500" />
            </div>

            <span className="bg-green-50 text-green-600 text-sm font-semibold px-3 py-1 rounded-full">
              ↗ +8%
            </span>
          </div>

          <div className="mt-10">
            <p className="text-gray-400 font-medium">Blood Requests</p>

            <h2 className="text-5xl font-black mt-2">{allReq}</h2>
          </div>
        </div>
      </div>
    </section>
  );
}
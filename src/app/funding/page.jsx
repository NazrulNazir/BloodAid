import { getFunding } from "@/lib/api";

export default async function FundingHistory() {
    const fundingData = await getFunding();
  return (
    <div className="min-h-screen bg-[#fafafa] py-12 px-4 mb-15">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-6 px-8 py-5 text-[11px] uppercase tracking-[3px] text-gray-400 font-semibold border-b">
          <p>Donor</p>
          <p>Transaction ID</p>
          <p>Date</p>
          <p>Amount</p>
          <p>Status</p>
          <p className="text-center">Actions</p>
        </div>

        {/* Rows */}
        {fundingData.map((item) => (
          <div
            key={item._id}
            className="grid grid-cols-6 items-center px-8 py-6 hover:bg-gray-50 transition border-b last:border-none"
          >
            {/* Donor */}
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-full bg-gray-100 flex items-center justify-center text-sm font-bold text-gray-600">
                {item.image}
              </div>

              <div>
                <h3 className="font-bold text-gray-800">{item.name}</h3>
                <p className="text-xs text-gray-400 uppercase">
                  Member
                </p>
              </div>
            </div>

            {/* Transaction */}
            <p className="text-gray-400 font-semibold text-sm">
              {item.transactionId}
            </p>

            {/* Date */}
            <p className="font-semibold text-gray-700">
              {new Date(item.date)}
            </p>

            {/* Amount */}
            <h3 className="font-extrabold text-xl text-gray-900">
              {item.amount}
            </h3>

            {/* Status */}
            <div>
              <span className="bg-emerald-100 text-emerald-600 text-[11px] font-bold uppercase tracking-wider px-4 py-1 rounded-full">
                ● Success
              </span>
            </div>

            {/* Action */}
            <div className="flex justify-center">
              <button className="w-9 h-9 rounded-lg border border-gray-200 hover:bg-red-50 hover:border-red-300 transition">
                📄
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
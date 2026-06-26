// import { Toaster } from "react-hot-toast";

import DashboardSidebar from "@/components/Dashboard/DashboardSidebar";
import { auth } from "@/lib/auth";
import { useSession } from "@/lib/auth-client";
import { headers } from "next/headers";

export default async function DashboardLayout({ children }) {
  const session = await auth.api.getSession({
    headers: await headers()
  });
  const user = session?.user;

  return (
    <div className="flex bg-background">
      <div className="flex flex-1">
        {/* sidebar */}
        <div className="h-screen sticky top-0 left-0 sm:bg-gray-300">
          <DashboardSidebar />
        </div>
        <div className="flex-1">
          {/* navbar  */}
          <div variant="secondary" className="flex justify-between items-center sm:px-5 pr-5 bg-gray-200 w-full py-3 sticky top-0">
            <div>
              <h2 className="font-bold text-2xl">Dashboard</h2>
              <p className="text-xs text-default-500 font-semibold text-gray-500">WELCOME BACK , {user?.role?.toUpperCase()}</p>
            </div>
            <div className="font-bold text-red-500">{user?.role?.toUpperCase()}</div>
          </div>
          <main className="mt-5 sm:ml-5">{children}</main>
        </div>
      </div>
    </div>
  );
}

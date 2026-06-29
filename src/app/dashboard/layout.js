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
      <div className="flex flex-1 bg-red-50/80">
        {/* sidebar */}
        <div className="h-screen sticky top-0 left-0 sm:bg-red-50 sm:shadow-sm">
          <DashboardSidebar />
        </div>
        <div className="flex-1">
          {/* navbar  */}
          <div variant="secondary" className="flex justify-between items-center sm:px-5 pr-5 w-full py-3 sticky top-0 z-10  bg-red-50 backdrop-blur-md shadow-sm pl-3">
            <div>
              <h2 className="font-bold text-2xl">Dashboard</h2>
              <p className="text-xs text-default-500 font-semibold text-gray-500">WELCOME BACK , {user?.role?.toUpperCase()}</p>
            </div>
            <div className="font-bold text-red-500">{user?.role?.toUpperCase()}</div>
          </div>
          <main className="">{children}</main>
        </div>
      </div>
    </div>
  );
}

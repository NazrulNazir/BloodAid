import { ComponentType, SVGProps } from "react";
import {
  Bars,
  Bell,
  Circles4Square,
  Envelope,
  Gear,
  House,
  Magnifier,
  Person,
} from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import { BiSolidDonateHeart } from "react-icons/bi";
import { IoCreate } from "react-icons/io5";
import { HiUserGroup } from "react-icons/hi";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";

const DashboardSidebar = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;
  console.log(user);
  const admin = [
    { icon: Circles4Square, label: "Dashboard", link: "/dashboard/admin" },
    { icon: Person, label: "Profile", link: "/dashboard/profile" },
    {
      icon: HiUserGroup,
      label: "All User",
      link: "/dashboard/admin/allUser",
    },
    {
      icon: BiSolidDonateHeart,
      label: "All Blood Donation Requests",
      link: "/dashboard/admin/myDonationRequest",
    },
  ];
  const volunteer = [
    { icon: Circles4Square, label: "Dashboard", link: "/dashboard/volunteer" },
    { icon: Person, label: "Profile", link: "/dashboard/profile" },
    {
      icon: BiSolidDonateHeart,
      label: "All Blood Donation Requests",
      link: "/dashboard/volunteer/myDonationRequest",
    },
  ];
  const donor = [
    { icon: Circles4Square, label: "Dashboard", link: "/dashboard/donor" },
    { icon: Person, label: "Profile", link: "/dashboard/profile" },
    {
      icon: BiSolidDonateHeart,
      label: "My Donation Requests",
      link: "/dashboard/donor/myDonationRequest",
    },
    {
      icon: IoCreate,
      label: "Create Donation Request",
      link: "/dashboard/donor/createDonationRequest",
    },
  ];
  const menuItems =
    user?.role === "Admin"
      ? admin
      : user?.role === "Volunteer"
        ? volunteer
        : donor;
  return (
    <Drawer>
      <Button
        variant="secondary"
        className={
          "flex sm:hidden rounded-none py-9 bg-gray-200 justify-center items-center"
        }
      >
        <Bars />
      </Button>
      <aside>
        <nav className="hidden sm:flex flex-col justify-between pb-10 gap-2 w-65 sticky top-0 h-screen">
         <div>
           <Link href={`/`} className="text-4xl text-center font-bold px-3 py-4 bg-gray-200 mb-2 block">
            Blood<span className="text-red-500">Aid</span>
          </Link>
          {menuItems.map((item) => (
            <Link
              key={item.label}
              href={item.link}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm hover:bg-default mx-2"
            >
              <item.icon className="size-5" />
              {item.label}
            </Link>
          ))}
         </div>
        <div className="pl-5">
          <Link href={'/dashboard/donor/profile'} className="hover:text-purple-600 font-semibold">Profile</Link>
          <p>{user?.role}</p>
        </div>
        </nav>
      </aside>
      <Drawer.Backdrop>
        <Drawer.Content placement="left">
          <Drawer.Dialog>
            <Drawer.CloseTrigger />
            <Drawer.Header>
              <Drawer.Heading>Navigation</Drawer.Heading>
            </Drawer.Header>
            <Drawer.Body>
              <nav className="flex flex-col gap-1">
                {menuItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.link}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm hover:bg-default"
                  >
                    <item.icon className="size-5" />
                    {item.label}
                  </Link>
                ))}
              </nav>
            </Drawer.Body>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </Drawer>
  );
};

export default DashboardSidebar;

"use client";
import {
  Bars,
  Circles4Square,
  Person,
} from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import { BiSolidDonateHeart } from "react-icons/bi";
import { IoCreate } from "react-icons/io5";
import { HiUserGroup } from "react-icons/hi";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import { signOut } from "better-auth/api";
import { useSession } from "@/lib/auth-client";

const DashboardSidebar = () => {
  // const session = await auth.api.getSession({
  //   headers: await headers(),
  // });
  const { data } = useSession();
  const user = data?.user;
  // const user = session?.user;
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
      link: "/dashboard/admin/allBloodDonationRequest",
    },
  ];
  const volunteer = [
    { icon: Circles4Square, label: "Dashboard", link: "/dashboard/volunteer" },
    { icon: Person, label: "Profile", link: "/dashboard/profile" },
    {
      icon: BiSolidDonateHeart,
      label: "All Blood Donation Requests",
      link: "/dashboard/volunteer/allBloodDonationRequest",
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
          "flex sm:hidden rounded-none py-9 bg-red-50 justify-center items-center shadow-sm"
        }
      >
        <Bars />
      </Button>
      <aside>
        <nav className="hidden sm:flex flex-col justify-between pb-10 gap-2 w-65 sticky top-0 h-screen">
          <div>
            <Link
              href={`/`}
              className="text-4xl text-center font-bold px-3 py-4  mb-2 shadow-sm block"
            >
              Blood<span className="text-red-500">Aid</span>
            </Link>
            {menuItems.map((item) => (
              <Link
                key={item.label}
                href={item.link}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm hover:bg-red-200/50 hover:text-red-500 mx-2"
              >
                <item.icon className="size-5" />
                {item.label}
              </Link>
            ))}
          </div>
          <div className="w-50 pl-4">
            <Link
              href={"/dashboard/donor/profile"}
              className="hover:text-purple-600 font-semibold"
            >
              <div className="flex gap-2 items-center">
                <Image
                  width={70}
                  height={70}
                  src={user?.image}
                  alt="user"
                  className="rounded-full w-15 h-15"
                ></Image>
                <div className="pb-4">
                  <h4 className="text-sm font-semibold">{user?.name}</h4>
                  <p className="text-xs text-default-500">{user?.email}</p>
                </div>
              </div>
            </Link>
            <Button className={'mt-3 rounded-md w-full'} variant="danger"
              onClick={() => {
                signOut();
                toast.success("Logout successfully..");
              }}
            >
              Logout
            </Button>
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

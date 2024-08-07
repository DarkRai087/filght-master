import DeskNav from "@/components/Custom/Navbar/DeskNav";
import { authOptions } from "@/services/Auth/authOption";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import { ArrowLeftCircle } from "lucide-react";
import Link from "next/link";
import { Guest } from "@prisma/client";
import { getGuestList } from "@/actions/getGuestAction";
import { getSingleGuest } from "@/actions/getSingleGuest";
import Dashboard from "@/components/Custom/Table/Dashboard";



const admin = async () => {
  const session = await getServerSession(authOptions);
  const guestList = await getGuestList(true);

  const GetGuest = async (id: string) => {
    "use server";
    const getGuest = await getSingleGuest(id);
    return getGuest;
  };

  if (session?.user.role !== "admin") {
    redirect("/home");
  }
 
  return (
    <div>
      <div className=" bg-sky-100 py-4">
        <div className="flex gap-4 px-8 items-center">
          <Link href={"/home"}>
            <ArrowLeftCircle className="h-5 cursor-pointer hover:translate-x-[-5px] hover:text-sky-400 transition-all" />
          </Link>
          <h1 className="text-lg  font-semibold">Dashboard</h1>
        </div>
      </div>
      
      <div className="px-8 py-4 h-[84vh] bg-gray-50">
        <Dashboard guestList={guestList as Guest[]} Guest={GetGuest} />
      </div>
    </div>
  );
};

export default admin;
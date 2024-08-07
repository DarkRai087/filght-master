"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { GetSessionParams, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect } from "react";

import logo from '../../../public/logo.png';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, UserCircle, UserCog } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

const DeskNav = () => {
  const { data, status } = useSession();
  const router = useRouter();
  const path = usePathname();


  useEffect(() => {
    if (status === "unauthenticated") {
      if (!path.includes("register"))
        router.replace('/');
    }
  }, [data])

  return (
    <>
      <div className="flex items-center justify-between gap-4  min-h-[8vh] w-full  flex-wrap py-5">
        <Link href={"/home"} className="text-xl tracking-tight font-semibold">
          <Image src={logo} alt="logo" className="pl-10" />
        </Link>
        <div className="space-x-5 flex  items-center flex-wrap ">
          <Link href={"/dashboard"} className="text-sm">
            Dashboard
          </Link>
          <Link href={"/driver"} className="text-sm">
            Driver
          </Link>
          <Link href={"/sales"} className="text-sm">
            Requisition
          </Link>
          <Link href={"/reservation"} className="text-sm">
            Reservation
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className=" cursor-pointer ">
                <AvatarImage src={""} alt="@shadcn" />
                <AvatarFallback className="text-primary hover:bg-primary hover:text-gray-50 transition-all  ">
                  <UserCog className="h-5" />
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mr-6 ">
              <DropdownMenuLabel>
                <div className="pr-20 pl-4">
                  <h1 className="font-semibold text-md ">Signed in as</h1>
                  <h1 className="font-semibold text-md">{data?.user.email}</h1>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div
                onClick={() => {
                  signOut();
                }}
              >
                <DropdownMenuItem className="hover:!bg-red-500 cursor-pointer hover:!text-white">
                  <LogOut className=" h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </>
  );
};

export default DeskNav;

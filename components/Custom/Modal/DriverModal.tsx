"use client";

import * as React from "react";
import { data } from "@/app/data/driverdata";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, CarTaxiFront } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import SearchSelect from "../Select/SearchSelect";
import SearchSelectWithObject from "../Select/SeachSelectWithObject";
import { useRouter } from "next/navigation";

export type DriverActivity = {
  id: string;
  date: string;
  tourist: string;
  driver: string;
  time: string;
  activity: string;
  guestName?: string;
  driverName?: string;
};

export function DriverModal({
  id,
  SingleDriver,
  drivers,
  tourists,
  activityList,
}: {
  id: string;
  SingleDriver: any;
  drivers: any;
  tourists: any;
  activityList: any[];
}) {
  const [open, setOpen] = useState(false);

  const getValues = data?.find((items) => {
    return items.id === id;
  });

  console.log(
    SingleDriver,
    // "singleData",
    // drivers,
    // " tousa ",
    // tourists,
    // " aadajkv ",
    // activityList
  );

  React.useEffect(() => {
    console.log(id)
  }, [])

  const newDate = new Date();
  const [date, setDate] = useState(new Date(SingleDriver?.date));

  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [tourist, setTourist] = useState(SingleDriver?.guest?.id);
  const [driver, setDriver] = useState(SingleDriver?.driver?.id);
  const [pickingspot, setpickingspot] = useState(getValues?.name as any);
  const [activity, setActivity] = useState(SingleDriver?.activity);

  const [openPicking, setOpenPicking] = useState(false);
  const [openActivity, setOpenActivity] = useState(false);

  const picking_spots = activityList;

  const activities = activityList;

  const [driverActivities, setDriverActivities] = React.useState();

  const [currentTime, setCurrentTime] = useState(SingleDriver.timeToPickup);

  const times = [
    "12:00 AM", "12:30 AM", "1:00 AM", "1:30 AM", "2:00 AM", "2:30 AM", "3:00 AM", "3:30 AM", "4:00 AM", "4:30 AM", 
    "5:00 AM", "5:30 AM", "6:00 AM", "6:30 AM", "7:00 AM", "7:30 AM", "8:00 AM", "8:30 AM", "9:00 AM", "9:30 AM", 
    "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", 
    "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM", 
    "7:30 PM", "8:00 PM", "8:30 PM", "9:00 PM", "9:30 PM", "10:00 PM", "10:30 PM", "11:00 PM", "11:30 PM"
];

  // console.log(id)
  const router = useRouter()


  const handleEdit = async () => {


    try {
      let editDriver = await fetch("/api/driver-activity", {
        method: "PUT",
        headers: {
          contentType: "application/json",
        },
        body: JSON.stringify({
          id,
          tourist,
          driverId: driver,
          date,
          timeToPickup: currentTime,
          activity,
        }),
      });
      if (editDriver.ok) {
        editDriver = await editDriver.json();
        console.log(editDriver);
        window.location.reload();
      } else {
        console.log("Error in updating driver");
      }
    } catch (error) {
      console.error("Error creating Driver:", error);
    }
  };

  const touristName = tourists?.map((item: any) => item?.name)
  const touristId = tourists?.map((item: any) => item?.id)
  // console.log(touristName)

  return (
    <DialogContent className="  bg-white sm:max-w-[600px]">
      <DialogHeader className="pb-4">
        <DialogTitle className="mb-4">Assign driver</DialogTitle>
        <div className="flex justify-start items-start flex-col gap-4  ">
          <Label htmlFor="username">Date of pickup</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="bg-white w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate as any}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>



        <SearchSelectWithObject
          label={"Name of Tourists"}
          placeholder={"Select Tourist..."}
          data={tourists.map((tourist: any) => { return { label: tourist.name, value: tourist.id } })}
          value={tourist}
          icon={CarTaxiFront}
          setValue={setTourist}
          open={open2}
          setOpen={setOpen2}
        />

        <SearchSelectWithObject
          label={"Name of Driver"}
          placeholder={"Select Driver..."}
          data={drivers.map((driver: any) => { return { label: driver.name, value: driver.id } })}
          value={driver}
          icon={CarTaxiFront}
          setValue={setDriver}
          open={open3}
          setOpen={setOpen3}
        />

        {/* <SearchSelect
          label={"Picking Spots"}
          placeholder={"Please select picking spot..."}
          data={picking_spots}
          value={pickingspot}
          icon={CarTaxiFront}
          setValue={setpickingspot}
          open={openPicking}
          setOpen={setOpenPicking}
        /> */}

        <SearchSelect
          label={"Name of Activities"}
          placeholder={"Please select Activity..."}
          data={activityList}
          value={activity}
          icon={CarTaxiFront}
          setValue={setActivity}
          open={openActivity}
          setOpen={setOpenActivity}
        />

        <SearchSelect
          label={"Time for pickup"}
          placeholder={"select time... "}
          data={times}
          value={currentTime}
          setValue={setCurrentTime}
          icon={CalendarIcon}
          open={open}
          setOpen={setOpen}
        />

        <DialogDescription className="text-xl ml-2 ">
          Assign driver for <b> {SingleDriver?.guest?.name}</b>
        </DialogDescription>
      </DialogHeader>

      <DialogFooter>
        <Button className="bg-primary" type="submit" onClick={handleEdit}>
          Save changes
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}

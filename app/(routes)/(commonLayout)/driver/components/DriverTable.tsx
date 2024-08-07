"use client";

import { format } from "date-fns";
import axios from "axios";
import * as React from "react";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  Calendar,
  CarTaxiFront,
  ChevronDown,
  MoreHorizontal,
  Palmtree,
  Timer,
  TramFront,
  UserCircle,
  UserPlus2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { data } from "@/app/data/driverdata";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DriverModal } from "@/components/Custom/Modal/DriverModal";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Payment } from "@/components/Custom/Table/SalesTable";
import { SalesGuestModal } from "@/components/Custom/Modal/Sales/SalesGuestModal";
import { DialogPortal } from "@radix-ui/react-dialog";
import { Form } from "react-hook-form";
import InputField from "@/components/Custom/Input/InputField";
import DateSelect from "@/components/Custom/Input/DateSelect";
import { Guest } from "@prisma/client";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SearchSelect from "@/components/Custom/Select/SearchSelect";
import SearchSelectWithObject from "@/components/Custom/Select/SeachSelectWithObject";
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

export function DriverTable() {
  const timeLabel = [
    "12:00 AM", "12:30 AM", "1:00 AM", "1:30 AM", "2:00 AM", "2:30 AM", "3:00 AM", "3:30 AM", "4:00 AM", "4:30 AM",
    "5:00 AM", "5:30 AM", "6:00 AM", "6:30 AM", "7:00 AM", "7:30 AM", "8:00 AM", "8:30 AM", "9:00 AM", "9:30 AM",
    "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM",
    "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM",
    "7:30 PM", "8:00 PM", "8:30 PM", "9:00 PM", "9:30 PM", "10:00 PM", "10:30 PM", "11:00 PM", "11:30 PM"
  ];


  const [timeZone, setTimeZone] = React.useState("");
  const router = useRouter();

  const handleSaveChange = async () => {
    console.log("timeZone " + timeZone);
    console.log("Tourist id " + selectedTourist);
    console.log("activity " + activity);
    console.log("Driver " + driver);
    console.log(bookedDate);

    try {
      // console.log("New post created:");
      let newDriver = await fetch("/api/driver-activity", {
        method: "POST",
        headers: {
          contentType: "application/json",
        },
        body: JSON.stringify({
          tourist: selectedTourist,
          driver: driver,
          date: bookedDate,
          timeToPickup: timeZone,
          activity: activity,
        }),
      });
      console.log(newDriver);

      if (newDriver.ok) {
        newDriver = await newDriver.json();
        console.log(newDriver);
        router.refresh();
      } else {
        console.log("Error in createing driver");
      }
    } catch (error) {
      console.error("Error creating Driver:", error);
    }
  };


  const [activity, setActivity] = React.useState("");
  const [driver, setDriver] = React.useState("");

  const [userData, setUserData] = React.useState<Guest>();
  const [bookedDate, setBookedDate] = React.useState(userData?.bookedDate);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [driverActivities, setDriverActivities] = React.useState<
    DriverActivity[]
  >([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [tourist, setTourist] = React.useState([
    {
      id: String,
      name: String,
    },
  ]);
  const [touristIte, setTouristIte] = React.useState([{}]);
  const [selectedTourist, setSelectedTourist] = React.useState<string>("");
  const [drivers, setDrivers] = React.useState([]);

  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [open2, setOpen2] = React.useState(false);

  const [ids, setids] = React.useState("");

  const [SingleDriver, setSingleDriver] = React.useState(null)

  const handleSingleDriverData = async (row: any) => {
    try {
      // let SingleDriverData = await fetch(`/api/driver-activity/${id}`, {
      //   method: "POST",
      //   headers: {
      //     contentType: "application/json",
      //   },
      //   body: JSON.stringify({id
      //   }),
      // });

      // if (SingleDriverData.ok) {
      //   SingleDriverData = await SingleDriverData.json();
      //   // @ts-ignore
      //   setSingleDriver(SingleDriverData)
      // } else {
      //   console.log("Error in finding driver");
      // }

      setSingleDriver(row.original);
    } catch (error) {
      console.error("Error creating Driver:", error);
    }
  }

  React.useEffect(() => {
    (async () => {
      try {
        const response = await fetch("/api/driver-activity");
        if (response.ok) {
          const data = await response.json();
          setDriverActivities(data?.driverActivities || []);
        }
      } catch (error: any) {
        alert(error.message);
      }
    })();
  }, []);

  React.useEffect(() => {
    (async () => {
      try {
        const response = await fetch("/api/guest/tourist");
        if (response.ok) {
          const data = await response.json();
          // console.log("working")
          console.log(data)
          setTourist(data?.users);
        }
      } catch (error: any) {
        alert(error.message);
      }
    })();
  }, []);

  React.useEffect(() => {
    (async () => {
      try {
        const response = await fetch("/api/guest/tourist/itinerary");
        if (response.ok) {
          const data = await response.json();
          // console.log("working from here")
          // console.log(data)
          setTouristIte(data?.users);
        }
      } catch (error: any) {
        alert(error.message);
      }
    })();
  }, []);

  React.useEffect(() => {
    (async () => {
      try {
        const response = await fetch("/api/guest/tourist/itinerary");
        if (response.ok) {
          const data = await response.json();
          // console.log("working from here")
          // console.log(data)
          setTouristIte(data?.users);
        }
      } catch (error: any) {
        alert(error.message);
      }
    })();
  }, []);

  React.useEffect(() => {
    (async () => {
      try {
        const response = await fetch("/api/guest");
        if (response.ok) {
          const data = await response.json();
          // console.log("working from here")
          // console.log(data)
          setDrivers(data?.users);
        }
      } catch (error: any) {
        alert(error.message);
      }
    })();
  }, []);

  const columns: ColumnDef<DriverActivity>[] = [
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Calendar className="h-4 text-primary" />
          <div>{format(new Date(row.getValue("date")), "PPP")}</div>
        </div>
      ),
    },
    {
      accessorKey: "tourist",
      header: () => <div className="text-left">Tourist Name</div>,
      cell: ({ row }) => {
        return (
          <div className="flex items-center  gap-2">
            <UserCircle className="h-4 text-secondary" />
            <div className="text-center font-medium">
              {row.getValue("tourist")}
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "id",
      header: () => null,
      cell: () => null,
    },
    {
      accessorKey: "activity",
      header: () => <div className="text-left">Activity</div>,
      cell: ({ row }) => {
        return (
          <div className="flex items-center  gap-2">
            <Palmtree
              className={`h-4 ${row.getValue("activity") ? "text-success" : "text-danger"
                }`}
            />
            <div className="text-center font-medium">
              {row.getValue("activity") ? (
                row.getValue("activity")
              ) : (
                <p className="text-danger">Not yet fixed</p>
              )}
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "driverId",
      header: () => <div className="text-left">Driver Name</div>,
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-2 font-medium">
            <CarTaxiFront className="h-4 text-warning" />

            {row.getValue("driverId")}
          </div>
        );
      },
    },
    {
      accessorKey: "timeToPickup",
      header: () => <div className="text-left w-max">Time to pick</div>,
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-1">
            <Timer className="h-4  text-success" />
            {row.getValue("timeToPickup")}
          </div>
        );
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const payment = row.original;
        return (
          <Dialog modal={true}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only ">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() => navigator.clipboard.writeText(payment.id)}
                >
                  Copy user ID
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DialogTrigger
                  className="flex items-center"
                // onClick={() => handleEdit(row?.original)}
                >
                  <DropdownMenuItem className="pr-10 cursor-pointer hover:!bg-warning hover:!text-white" >
                    <CarTaxiFront className="mr-2 h-4 w-4 " />
                    <span>Edit Driver Task</span>
                  </DropdownMenuItem>
                </DialogTrigger>
                <DropdownMenuItem>View payment details</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DriverModal id={row.getValue("id")} SingleDriver={row.original} activityList={touristIte} tourists={tourist} drivers={drivers} />
          </Dialog>
        );
      },
    },
  ];

  const touristNames = tourist.map((ele) => {
    // console.log(ele)
    return ele?.name;
  });
  // console.log(data)
  // console.log(drivers)
  const table = useReactTable({
    data: driverActivities,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const [open, setOpen] = React.useState(false);

  return (
    <>
      <div className="w-full">
        <div className="flex w-full justify-between items-center py-4">
          <Input
            placeholder="Filter by tourist name..."
            value={
              (table.getColumn("tourist")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("tourist")?.setFilterValue(event.target.value)
            }
            autoComplete="off"
            autoCorrect="off"
            className="max-w-sm"
          />
          <Dialog>
            <DialogTrigger asChild>
              <Button
                type="button"
                className="bg-primary hover:bg-primary"
                onClick={() => setOpen(true)}
              >
                <UserPlus2 /> Add new Driver
              </Button>
            </DialogTrigger>

            <DialogContent className=" bg-white sm:max-w-[600px]">
              <DialogHeader className="pb-4">
                <DialogTitle> Driver Assign</DialogTitle>
                <DialogDescription>Add new driver from here.</DialogDescription>
              </DialogHeader>
              <div className="flex w-full justify-start items-start flex-col gap-4">
                <div className="w-full">
                  <div className="flex items-center space-x-2 mb-4">
                    <Label htmlFor="terms">Select Time zone</Label>
                  </div>
                  <div className="flex items-center space-x-2 mb-4">
                    <Select
                      // onValueChange={() => setTimeZone(value)}
                      value={timeZone}
                      onValueChange={setTimeZone}
                    >
                      <SelectTrigger className="w-[280px]">
                        <SelectValue placeholder="Select a Time zone" />
                      </SelectTrigger>
                      <SelectContent
                        style={{ overflowY: "auto", maxHeight: "200px" }}
                      >
                        <SelectGroup onChange={(e) => console.log("wio")}>
                          {timeLabel?.map((item) => {
                            return (
                              <>
                                <SelectItem value={item}>{item}</SelectItem>
                              </>
                            );
                          })}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center space-x-2 mb-4  w-full">
                  <SearchSelectWithObject
                    className="w-full"
                    label={"Name of Tourists"}
                    placeholder={"Select Tourist"}
                    //@ts-ignore
                    data={tourist.map((item) => {
                      return { label: item.name, value: item.id };
                    })}
                    // value={value}
                    icon={CarTaxiFront}
                    // setValue={setValue}
                    open={open2}
                    value={selectedTourist}
                    setValue={setSelectedTourist}
                    setOpen={setOpen2}
                  />
                </div>

                <div className="w-full">
                  <div className="flex items-center space-x-2 mb-4">
                    <Label htmlFor="terms">Select an Acitivity</Label>
                  </div>
                  <div className="flex items-center space-x-2 mb-4">
                    <Select value={activity} onValueChange={setActivity}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select an Activity" />
                      </SelectTrigger>
                      <SelectContent
                        style={{ overflowY: "auto", maxHeight: "200px" }}
                      >
                        <SelectGroup>
                          {touristIte?.map((item) => {
                            return (
                              <>
                                {/* @ts-ignore */}
                                <SelectItem value={item}>
                                  {/* @ts-ignore */}
                                  {item}
                                </SelectItem>
                              </>
                            );
                          })}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="w-full">
                  <div className="flex items-center space-x-2 mb-4">
                    <Label htmlFor="terms">Select a Driver</Label>
                  </div>
                  <div className="flex items-center space-x-2 mb-4">
                    <Select value={driver} onValueChange={setDriver}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a Driver" />
                      </SelectTrigger>
                      <SelectContent
                        style={{ overflowY: "auto", maxHeight: "200px" }}
                      >
                        <SelectGroup>
                          {drivers?.map((item) => {
                            // console.log(item)
                            return (
                              <>
                                {/* @ts-ignore */}

                                <SelectItem value={item?.id}>
                                  {/* @ts-ignore */}

                                  {item?.name}
                                </SelectItem>
                              </>
                            );
                          })}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="w-full">
                  <DateSelect
                    date={bookedDate}
                    setDate={setBookedDate}
                    label={"Enter Booked Date"}
                  />
                </div>
              </div>

              <DialogFooter>
                <Button
                  className="bg-primary"
                  type="submit"
                  onClick={handleSaveChange}
                >
                  Save changes
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow className="bg-slate-100" key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} className="!text-[#333]">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {driverActivities && table?.getRowModel()?.rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        //  onClick={() => handleEdit(cell?.id)}

                        className="!py-3 "
                        key={cell.id}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

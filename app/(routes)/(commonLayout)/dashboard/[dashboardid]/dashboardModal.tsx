import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";

import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FC, useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { Guest } from "@prisma/client";
import { Checkbox } from "@/components/ui/checkbox";
//@ts-ignore
import FileSaver from "file-saver";
import { Workbook } from "exceljs";
export interface InputProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id?: string;
  open: boolean;
}


const items = [
  {
    id: "guestInfo",
    label: "Guest Info",
  },
  {
    id: "itinerary",
    label: "Itinerary",
  },
  {
    id: "roomBooking",
    label: "Room Booking",
  },
  {
    id: "cruise",
    label: "Cruise ",
  },
  {
    id: "discount",
    label: "Discount",
  },
  {
    id: "vehical",
    label: "Vehical",
  },
  {
    id: "flight",
    label: "Flight  ",
  },
  {
    id: "fiberboat",
    label: "Fiber boat",
  }
] as const;



const formSchema = z.object({
  name: z.string().min(1, {
    message: "Guest field is mandatory.",
  }),
  points: z.number().min(1, {
    message: "Point field is mandatory.",
  }),
});

export function CheckboxReactHookFormMultiple() {
  const form = useForm({
    
    defaultValues: {
      items: [],
    },
  });

  async function onSubmit() {
    let formatedData: Record<string, boolean> = {};
    items.map((item: { id: string, label: string }) => {
      ;
    })

    const response = await fetch(`/api/guest/excel-data`, {
      method: 'POST',
      headers: {
        contentType: 'application/json',
      },
      body: JSON.stringify(formatedData)
    })
    const excelData = (await response.json());
    const rows = excelData.rows;
    const columns = excelData.columns;
    const individualCustomerData = excelData.individualCustomerData;
    const workBook = new Workbook();
    let date = new Date();
    workBook.creator = "Best Andaman";
    workBook.modified = date;
    workBook.views = [
      {
        x: 0,
        y: 0,
        width: 10000,
        height: 20000,
        firstSheet: 0,
        activeTab: 0,
        visibility: "visible",
      },
    ];

    const customers = workBook.addWorksheet("Guest List", {
      properties: { tabColor: { argb: "00B050" } },
      views: [{ state: "frozen", ySplit: 1 }],
    });

    customers.columns = columns?.map((col: { displayName: string, id: string }) => {
      return {
        header: col.displayName,
        key: col.id
      }
    })

    rows?.map((row: any, index: number) => {
      customers.addRow(row);
      customers.getCell(`A${index+2}`).value = { text: row.name, hyperlink: `#\'${row.name}_${row.id.substring(0, 6)}\'!A1`} 
      console.log(customers.getCell(`A${index+2}`).value, " adsasds ",customers.getCell(`A${index+2}`));
      
    })
    


    individualCustomerData?.map(async (tabs: any) => {

      const customer = workBook.addWorksheet(tabs.tabName, {
        properties: { tabColor: { argb: "00B050" } },
        views: [{ state: "frozen", ySplit: 1 }],
      });
      let nextRef = 1;
      await tabs?.tables?.map(async (table: any) => {
        if (table.rows?.length <= 0)
          return;
        const tableModel = {
          name: table.name,
          ref: `A${nextRef}`,
          headerRow: true,
          totalsRow: false,
          columns: table.columns.map((column: { displayName: any; id: any; }) => { return { name: column.displayName } }),
          rows: table?.rows.map((row: any) => Object.values(row))
        }
        nextRef += table?.rows?.length + 2;

        customer.addTable(tableModel);
      })


    })

    const workbookBuffer = await workBook.xlsx.writeBuffer();

    const blob = new Blob([workbookBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=UTF-8",
    });

    await FileSaver.saveAs(blob, "BEST_ANDAMAN_RESERVED_GUEST_LIST.xlsx");

  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="items"
          render={() => (
            <FormItem>

              {items.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="items"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item.id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            className="text-white"
                            
                            onCheckedChange={(checked: boolean) => { 
                              return checked
                                ? field.onChange([...field.value, item.id])
                                : field.onChange(
                                  field.value?.filter(
                                    (value) => value !== item.id
                                  )
                                );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">
                          {item.label}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

export const DashboardModal: FC<InputProps> = ({ setOpen, id, open }) => {
  const [userData, setUserData] = useState<Guest>();
  const getUsers = async () => {
    try {
      if (!id) {
        return null;
      }
      const res = await fetch(`/api/guest/${id}`);

      if (!res.ok) {
        return res.status;
      }

      if (res.ok) {
        const data = await res.json();

        setUserData(data);
        return data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
    console.log(userData);
  }, []);

  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: userData && userData?.name,
      points: userData && userData?.points,
    },
  });

  const [filledDate, setFilledDate] = useState(userData?.filledDate);
  const [bookedDate, setBookedDate] = useState(userData?.bookedDate);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await fetch("/api/guest", {
        method: "POST",
        body: JSON.stringify({
          ...values,
          filledDate: filledDate && new Date(filledDate),
          bookedDate: bookedDate && new Date(bookedDate),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.status === 200 || res.status === 402) {
        toast({
          title: res.statusText,
        });
      }

      if (res.ok) {
        setOpen(false);
        router.refresh();
        toast({
          title: "Sales Requisition created successfully",
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <DialogContent className=" bg-white sm:max-w-[600px]">
      <DialogHeader className="pb-4">
        <DialogTitle>{id ? "Edit" : "Create"} Generate Report</DialogTitle>
        <DialogDescription>
          Make Generate Report form for new guest
        </DialogDescription>
      </DialogHeader>


      {/* Include the CheckboxReactHookFormMultiple component */}
      <CheckboxReactHookFormMultiple />



    </DialogContent>
  );
};

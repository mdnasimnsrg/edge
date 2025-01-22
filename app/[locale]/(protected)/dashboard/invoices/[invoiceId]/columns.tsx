"use client";
import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "Invoice",
    cell: ({ row }) => {
      return (
        <Link href={`/dashboard/invoices/${row.original.Account}/${row.original.Invoice}`}>{row.original.Invoice}</Link>
      );
    },
  },
  {
    accessorKey: "Download",
    header: () => <div className="text-end">Status</div>,
    cell: () => {
      return (
        <div className="text-end">
          <Badge
            className="font-normal text-sm rounded-md bg-[#e7f8f2] text-[#139c71] border-[#bcebdc] "
            variant="secondary"
          >
            Download
          </Badge>
        </div>
      );
    },
  },
];

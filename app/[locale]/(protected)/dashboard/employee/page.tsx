"use client";
import AddEmployeeDialog from "@/components/dialogs/AddEmployeeDialog";
import { DataTable } from "@/components/table";
import PageWrapper from "@/components/wrappers/page-wrapper";
import { ColumnDef } from "@tanstack/react-table";

type Employee = { id: number; name: string; email: string; slackUserId: string };
export default function Employee() {
  const employeeData: Employee[] = [
    {
      id: 1,
      name: "John Doe",
      email: "jdoe@me.com",
      slackUserId: "U06K6P39W7Q",
    },
    { id: 2, name: "Jane Doe", email: "jdoe@me.com", slackUserId: "U06K6P39W7Q" },
    { id: 3, name: "John Doe", email: "jdoe@me.com", slackUserId: "U06K6P39W7Q" },
    { id: 4, name: "John Doe", email: "jdoe@me.com", slackUserId: "U06K6P39W7Q" },
    { id: 5, name: "John Doe", email: "jdoe@me.com", slackUserId: "U06K6P39W7Q" },
  ];
  const columns: ColumnDef<Employee>[] = [
    { accessorKey: "name" },
    { accessorKey: "email" },
    { accessorKey: "slackUserId", header: "Slack Id" },
  ];

  return (
    <PageWrapper title="Employees">
      <div className="w-full">
        <div className="flex justify-end pb-4">
          <AddEmployeeDialog />
        </div>
        <DataTable columns={columns} data={employeeData} />
      </div>
    </PageWrapper>
  );
}

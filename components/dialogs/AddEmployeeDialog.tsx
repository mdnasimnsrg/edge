"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { useForm } from "react-hook-form";
import ControlledInput from "../controlled/ControlledInput";

export default function AddEmployeeDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <Button>Add New</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Add New Employee</DialogTitle>
        <Form setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}

function Form({ setOpen }: { setOpen: (open: boolean) => void }) {
  const {
    control,
    formState: { isSubmitting },
    handleSubmit,
  } = useForm();

  const onSubmit = () => {
    return new Promise(() =>
      setTimeout(() => {
        setOpen(false);
      }, 1000)
    );
  };

  return (
    <>
      <div>
        <ControlledInput control={control} name="name" label="Name" />
        <ControlledInput control={control} name="email" label="Email" />
        <ControlledInput control={control} name="slackUserId" label="Slack Id" />
      </div>
      <DialogFooter>
        <Button onClick={handleSubmit(onSubmit)} disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </DialogFooter>
    </>
  );
}

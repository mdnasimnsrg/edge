import { Checkbox } from "@/components/ui/checkbox";
import { Controller } from "react-hook-form";

export default function ControlledCheckBox({ name, control, label }: { name: string; control: any; label: string }) {
  return (
    <Controller
      rules={{ required: { value: true, message: `${label} is required` } }}
      name={name}
      control={control}
      render={({ field }) => {
        return (
          <div className="flex items-center gap-2">
            <Checkbox id={name} onCheckedChange={field.onChange} checked={field.value} />
            <label
              htmlFor={name}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Accept terms and conditions
            </label>
          </div>
        );
      }}
    />
  );
}

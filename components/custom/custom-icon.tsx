import { Typography } from "@/components/custom/typography";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react";
import { cva, type VariantProps } from "class-variance-authority";

const customIconVariants = cva("rounded-sm", {
  variants: {
    variant: {
      high: "bg-[#FFE6F9]",
      medium: "bg-[#EAF7FD]",
      low: "bg-[#FEF4E6]",
    },
    size: {
      small: "h-6 w-6 rounded-sm",
      medium: "h-8 w-8 rounded-md",
      large: "h-10 w-10 rounded-md",
    },
  },
  defaultVariants: {
    size: "medium",
  },
});
interface CardWrapperProps {
  icon: string;
  title?: string;
  description?: any;
  iconColor?: string;
  noBackground?: boolean;
  reverseColors?: boolean;
}

export interface Props extends CardWrapperProps, VariantProps<typeof customIconVariants> {}

export function CustomIcon({ icon, title, description, iconColor, variant, size, noBackground, reverseColors }: Props) {
  let color = iconColor && `hsl(${iconColor})`;
  let backgroundColor = noBackground ? "" : iconColor && `hsla(${iconColor},0.10)`;

  if (reverseColors) {
    color = iconColor && `#fff`;
    backgroundColor = iconColor && `hsl(${iconColor})`;
  }

  const fontSizes = {
    small: 16,
    medium: 22,
    large: 26,
  };

  return (
    <div className="flex gap-2 items-center ">
      <div
        className={cn("h-8 w-8 flex justify-center items-center ", customIconVariants({ variant, size }))}
        style={{ backgroundColor }}
      >
        <Icon icon={icon} color={color} fontSize={size ? fontSizes[size] : 22} />
      </div>
      {title && (
        <div>
          <Typography variant="subtle-medium">{title}</Typography>
          {typeof description != undefined && <Typography variant="light">{description}</Typography>}
        </div>
      )}
    </div>
  );
}

export function CustomIconSkeleton() {
  return (
    <div className="flex gap-2 items-center">
      <Skeleton className="h-8 w-8" />
      <div className="flex flex-col gap-1 ">
        <Skeleton className="h-3 w-[100px] rounded-sm" />
        <Skeleton className="h-2 w-[50px] rounded-sm" />
      </div>
    </div>
  );
}

export function TwoLinesSkeleton() {
  return (
    <div>
      <Skeleton className="h-[24px] w-[100px] rounded-sm my-1" />
      <Skeleton className="h-[20px] w-[50px] rounded-sm " />
    </div>
  );
}

import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";

const typographyVariants = cva("", {
  variants: {
    variant: {
      h2: "text-3xl font-semibold text-[#354764",
      large: "text-lg font-semibold text-[#42526D]",
      subtle: "text-sm font-normal text-[#42526D]",
      "subtle-semibold": "text-sm font-semibold text-[#42526D]",
      "subtle-medium": "text-sm font-medium text-[#505F79]",
      link: "text-base font-medium text-[#2E89EA] underline cursor-pointer",
      detail: "text-xs font-medium text-[#4B465C]",
      light: "text-[13px] font-normal text-[#7A8699]",
      "table-item": "text-[16px] font-[500] text-[#243757]",
      body: "text-sm font-normal text-[#42526D]",
      "body-medium": "text-[#5D6B82] font-medium text-sm",
      caption: "text-xs font-medium text-[#42526D]",
      "p-ui": "text-base font-normal text-[#42526D]",
      "big-text": "font-semibold text-xl text-[#243757]",
      "card-title": "text-base font-medium",
      "card-header": "text-lg font-semibold text-[#243757]",
      "card-main-details": "text-base font-medium text-[#354764]",
      "card-caption": "text-sm font-medium text-[#7A8699]",
      label: "font-normal text-sm leading-[16px] mb-1 text-[#42526D]",
      "sub-text": "text-sm font-normal text-[#A6AEBB]",
      "card-text": "font-medium text-sm text-[#354764]",
      "error-caption": "text-xs mt-1 ms-1 font-normal text-destructive",
      "page-header": "font-semibold text-2xl text-[#15294B]",
      "text-medium": "text-sm text-[#505F79] font-medium",
      "card-subtext": "text-base font-normal text-[#42526D]",
    },
  },
  defaultVariants: {
    variant: "large",
  },
});

type TypographyProps = {
  children: React.ReactNode;
  className?: string;
} & VariantProps<typeof typographyVariants>;

export function Typography({ variant, children, className }: TypographyProps) {
  return <p className={cn(typographyVariants({ variant }), className)}>{children}</p>;
}

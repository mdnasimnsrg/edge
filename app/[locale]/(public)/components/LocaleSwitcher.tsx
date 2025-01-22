"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function LocaleSwitcher() {
  const pathName = usePathname();

  return (
    <div className="z-10 relative top-10">
      <Link href={pathName.includes("en") ? pathName.replace("en", "ar") : pathName.replace("ar", "en")}>
        <Button>{pathName.includes("en") ? "عربي" : "English"}</Button>
      </Link>
    </div>
  );
}

"use client";
import { Icon } from "@iconify/react";
import Link from "next/link";

export type TBreadCrumbs = { name?: string; link: string; icon?: string };
export default function BreadCrumbs({ breadCrumbs }: { breadCrumbs: TBreadCrumbs[] }) {
  return (
    <>
      <div className="flex w-full pb-4">
        {breadCrumbs.map(({ name, icon, link }, index) => (
          <div className="flex items-center gap-2" key={index}>
            <Icon icon={icon || ""} />
            <Link href={link} className="no-underline">
              <p className={`${index + 1 == breadCrumbs.length && "text-[#15294B]"}`}>{name}</p>
            </Link>
            {index + 1 != breadCrumbs.length && <Icon icon={"tabler:chevron-right"} />}
          </div>
        ))}
      </div>
    </>
  );
}

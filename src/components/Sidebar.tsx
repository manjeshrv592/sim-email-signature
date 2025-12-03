import Link from "next/link";
import { LayoutDashboard } from "lucide-react";

export default function Sidebar() {
  return (
    <div className=" basis-[210px] border border-r border-neutral-200">
      <ul>
        <li className="p-2 pl-4 flex gap-2 items-center">
            <LayoutDashboard size={16} />
            <Link href="/">Dashboard</Link>
        </li>
      </ul>
    </div>
  );
}
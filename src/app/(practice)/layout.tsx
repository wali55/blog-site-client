import Link from "next/link";
import { ReactNode } from "react";

const PracticeLayout = ({
  children,
  marketingSlot,
  salesSlot,
}: {
  children: ReactNode;
  marketingSlot: ReactNode;
  salesSlot: ReactNode;
}) => {
  return (
    <div>
      <div className="flex gap-8 m-10">
        <Link href="/development" className="hover:underline">
          Development
        </Link>
        <Link href="/marketing" className="hover:underline">
          Marketing
        </Link>
        <Link href="/sales" className="hover:underline">
          Sales
        </Link>
        <Link href="/testing" className="hover:underline">
          Testing
        </Link>
        <Link href="/marketing/settings" className="hover:underline">
          Settings
        </Link>
      </div>
      <div className="flex">
        {marketingSlot}
        {salesSlot}
      </div>
      <div>{children}</div>
    </div>
  );
};

export default PracticeLayout;

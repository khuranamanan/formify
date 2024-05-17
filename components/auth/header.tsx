import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";
import { PencilIcon } from "@/assets/icons";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

interface HeaderProps {
  label: string;
}

function Header({ label }: HeaderProps) {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
      <div className="flex justify-center items-center gap-2">
        <PencilIcon className="h-10 w-10" />
        <h1 className={cn("text-3xl font-semibold", font.className)}>
          Formify
        </h1>
      </div>
      <p className="text-muted-foreground text-sm">{label}</p>
    </div>
  );
}

export default Header;

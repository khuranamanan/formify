import { Poppins } from "next/font/google";
import { PencilIcon } from "@/assets/icons";
import { cn } from "@/lib/utils";
import React from "react";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

function AppLogo() {
  return (
    <div className="flex justify-center items-center gap-2">
      <PencilIcon className="h-8 w-8" />
      <h1 className={cn("text-2xl font-semibold", font.className)}>Formify</h1>
    </div>
  );
}

export default AppLogo;

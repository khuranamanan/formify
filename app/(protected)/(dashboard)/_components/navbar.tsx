"use client";

import AppLogo from "@/components/app-logo";
import UserButton from "@/components/auth/user-button";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky z-50 top-0 w-full border-b shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center p-4">
        <AppLogo />

        <div className="ml-auto flex items-center gap-x-2">
          <ModeToggle />
          <UserButton />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

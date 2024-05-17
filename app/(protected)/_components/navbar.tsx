"use client";

import UserButton from "@/components/auth/user-button";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function Navbar() {
  const pathname = usePathname();

  return (
    <div className="bg-secondary flex justify-between items-center flex-wrap gap-4 p-4 rounded-xl max-w-2xl w-full shadow-sm">
      <div className="flex flex-wrap gap-2">
        <Button
          asChild
          variant={pathname === "/server" ? "default" : "outline"}
        >
          <Link href="/server">Server</Link>
        </Button>
        <Button
          asChild
          variant={pathname === "/client" ? "default" : "outline"}
        >
          <Link href="/client">Client</Link>
        </Button>
        <Button asChild variant={pathname === "/admin" ? "default" : "outline"}>
          <Link href="/admin">Admin</Link>
        </Button>
        <Button
          asChild
          variant={pathname === "/settings" ? "default" : "outline"}
        >
          <Link href="/settings">Settings</Link>
        </Button>
      </div>

      <div className="flex gap-2 items-center">
        <ModeToggle />
        <UserButton />
      </div>
    </div>
  );
}

export default Navbar;

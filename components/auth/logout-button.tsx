"use client";

import { logout } from "@/actions/auth/logout";

interface LogoutButtonProps {
  children?: React.ReactNode;
}

function LogoutButton({ children }: LogoutButtonProps) {
  const onClick = () => {
    logout();
  };

  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
}

export default LogoutButton;

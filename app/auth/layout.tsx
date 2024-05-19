import { ModeToggle } from "@/components/mode-toggle";

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative h-full flex items-center justify-center">
      {children}
      <div className="absolute top-4 right-4">
        <ModeToggle />
      </div>
    </div>
  );
}

export default AuthLayout;

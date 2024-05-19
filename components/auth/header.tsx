import AppLogo from "../app-logo";

interface HeaderProps {
  label: string;
}

function Header({ label }: HeaderProps) {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
      <AppLogo />
      <p className="text-muted-foreground text-sm">{label}</p>
    </div>
  );
}

export default Header;

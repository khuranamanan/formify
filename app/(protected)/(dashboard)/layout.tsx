import Navbar from "./_components/navbar";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full space-y-4">
      <Navbar />

      <div className="max-w-7xl mx-auto">{children}</div>
    </div>
  );
}

export default DashboardLayout;

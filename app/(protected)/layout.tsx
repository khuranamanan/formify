import Navbar from "./_components/navbar";

function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full flex flex-col gap-y-10 justify-center items-center p-4">
      <Navbar />
      {children}
    </div>
  );
}

export default ProtectedLayout;

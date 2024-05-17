function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative h-full flex items-center justify-center">
      {children}
    </div>
  );
}

export default AuthLayout;

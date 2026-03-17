export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-primary-600">SportConnect</h1>
          <p className="mt-1 text-sm text-gray-500">Find your training partner</p>
        </div>
        {children}
      </div>
    </div>
  );
}

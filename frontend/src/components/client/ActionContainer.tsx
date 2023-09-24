export function ActionContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-8 justify-center bg-white border rounded-md border-gray-200 shadow-sm w-[356px] p-4 z-50 cursor-pointer transform hover:translate-y-[-2px] transition-transform">
      {children}
    </div>
  )
}

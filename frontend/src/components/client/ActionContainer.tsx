export function ActionContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex flex-col gap-8 justify-center bg-white border rounded-md border-gray-200 shadow-sm min-w-[356px] p-4'>
      {children}
    </div>
  );
}

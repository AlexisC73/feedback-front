export function FormGroup ({children}: {children: React.ReactNode}) {
  return (
    <div className="flex flex-col gap-y-4">
      {children}
    </div>
  )
}
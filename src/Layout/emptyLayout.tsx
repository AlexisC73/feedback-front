export function emptyLayout ({children}: {children?: React.ReactNode}) {
  return (
    <div className="bg-#F7F8FD min-h-screen flex flex-col">
      {children}
    </div>
  )
}
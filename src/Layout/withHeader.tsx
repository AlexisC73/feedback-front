import { Header } from "@/components/Header/Header";

export function withHeader ({children}: {children?: React.ReactNode}) {
  return (
    <div className="flex min-h-screen w-full bg-#F7F8FD">
      <div className="flex flex-1 flex-col lg:flex-row mx-auto gap-x-7.5 md:py-14 lg:pt-23.5 lg:max-w-277.5">
        <div className="md:px-10 lg:px-0 lg:py-0 md:pb-10 lg:pb-0">
          <Header />
        </div>
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  )
}
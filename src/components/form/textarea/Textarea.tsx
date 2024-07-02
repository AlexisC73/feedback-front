export function Textarea ({error}: {error?: string}) {
  return (
    <div className="relative flex flex-col">
      <textarea rows={5} className={`bg-#F7F8FD w-full rounded-1.25 outline-none p-6 pr-6 text-4 md:text-3.75 focus:border focus:border-1 focus:border-#4661E6 ${!error ? "" : "border border-1 border-#D73737"}`} />
      <span id="error" className="text-3.5 text-#D73737 absolute top-43">{error}</span>
    </div>
  )
}
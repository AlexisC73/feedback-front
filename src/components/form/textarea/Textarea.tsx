export function Textarea ({error, rows = 5, placeholder}: {error?: string, rows?: number, placeholder?: string}) {
  return (
    <div className="relative flex flex-col">
      <textarea placeholder={placeholder} rows={rows} className={`bg-#F7F8FD w-full rounded-1.25 outline-none p-4 pr-6 text-4 md:text-3.75 border border-1 focus:border focus:border-1 border-#F7F8FD focus:border-#4661E6 ${!error ? "" : " border-#D73737"}`} />
      <span id="error" className="text-3.5 text-#D73737 absolute top-43">{error}</span>
    </div>
  )
}
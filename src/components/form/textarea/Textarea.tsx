export function Textarea ({errors, value, rows = 5, placeholder, name, defaultValue, onChange}: {value?: string, errors?: string[], onChange?: (value: string) => void ,rows?: number, placeholder?: string, name: string, defaultValue?: string}) {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if(!onChange) return
    onChange(e.target.value)
  }
  
  return (
    <div className="flex flex-col">
      <textarea onChange={handleChange} value={value} defaultValue={defaultValue} id={name} name={name} placeholder={placeholder} rows={rows} className={`bg-#F7F8FD w-full rounded-1.25 outline-none p-4 pr-6 text-4 md:text-3.75 border border-1 focus:border focus:border-1 border-#F7F8FD focus:border-#4661E6 ${!errors || errors.length <= 0 ? "" : "border-#D73737"}`} />
      <ul>
        {errors?.map((error) => <li className="text-3.5 text-#D73737 mt-0.25">{error}</li>)}
      </ul>
    </div>
  )
}
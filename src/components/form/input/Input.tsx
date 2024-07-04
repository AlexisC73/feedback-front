export function Input ({errors, name}: {errors?: string[], name: string}) {

  return (
    <div className="flex flex-col gap-y-1 relative">
      <input name={name} id={name} className={`bg-#F7F8FD rounded-1.25 h-12 outline-none px-6 text-4 md:text-3.75 focus:border focus:border-1 focus:border-#4661E6 ${!errors || errors.length <= 0 ? "" : "border border-1 border-#D73737"}`} />
      <ul className="min-h-5.5">
        {errors?.map((error) => <li className="text-3.5 text-#D73737 mt-0.25">{error}</li>)}
      </ul>
    </div>
  )
}

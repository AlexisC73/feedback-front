export function InputHeader ({htmlFor, label, description}: {htmlFor: string, label: string, description?: string}) {
  return (
    <div id="input-header" className="flex flex-col gap-y-0.5">
      <label htmlFor={htmlFor} className="text-#3A4374 text-3.25 line-height-4.75 font-bold -tracking-0.18px">{label}</label>
      { description && <p className="text-3.25 line-height-4.75 text-#647196">{description}</p>}
    </div>
  )
}
export function Tag ({title, active}: {title: "all" | "ui" | "ux" | "enhancement" | "bug" | "feature", active: boolean}) {
  const filtersStyle = {
    all: "px-4",
    ui: "pl-4 pr-4.75",
    ux: "pl-4 pr-3.5",
    enhancement: "px-4",
    bug: "px-4",
    feature: "pl-4 pr-4.25",
  }

  const activeStyle = "bg-#4661E6 text-white"
  const unactiveStyle = "bg-#F2F4FF text-#4661E6"

  return (
    <p className={`h-7.5 flex items-center rounded-2.5 font-semibold text-3.25 line-height-4.75 ${filtersStyle[title]} ${active ? activeStyle : unactiveStyle}`}>{title.charAt(0).toUpperCase() + title.slice(1)}</p>
  )
}
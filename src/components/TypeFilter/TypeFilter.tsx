export function TypeFilter ({activeFilter}: {activeFilter: string[]}) {
  const activeStyle = "bg-#4661E6 text-white"
  const unactiveStyle = "bg-#F2F4FF text-#4661E6"

  return (
    <ul id="filter" className="flex flex-wrap pt-6 pl-6 pr-4.5 pb-9 bg-white rounded-2.5 md:w-55.75 h-44.5 lg:w-63.75 lg:h-41.5">
      <li className={`h-7.5 flex items-center rounded-2.5 font-semibold text-3.25 line-height-4.75 px-4 mr-2 ${activeFilter.includes("all") ? activeStyle : unactiveStyle}`}>All</li>
      <li className={`h-7.5 flex items-center rounded-2.5 font-semibold text-3.25 line-height-4.75 pl-4 pr-4.75 mr-2 ${activeFilter.includes("ui") ? activeStyle : unactiveStyle}`}>UI</li>
      <li className={`h-7.5 flex items-center rounded-2.5 font-semibold text-3.25 line-height-4.75 pl-4 pr-3.5 ${activeFilter.includes("ux") ? activeStyle : unactiveStyle}`}>UX</li>
      <li className={`h-7.5 flex items-center rounded-2.5 font-semibold text-3.25 line-height-4.75 px-4 mr-3.5 mt-3.5 ${activeFilter.includes("enhancement") ? activeStyle : unactiveStyle}`}>Enhancement</li>
      <li className={`h-7.5 flex items-center rounded-2.5 font-semibold text-3.25 line-height-4.75 px-4 mt-3.5 ${activeFilter.includes("bug") ? activeStyle : unactiveStyle}`}>Bug</li>
      <li className={`h-7.5 flex items-center rounded-2.5 font-semibold text-3.25 line-height-4.75 pl-4 pr-4.25 mt-3.5 ${activeFilter.includes("feature") ? activeStyle : unactiveStyle}`}>Feature</li>
    </ul>
  )
}
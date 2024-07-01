export function RoadmapStatusCircle ({status}: {status: "planned" | "inProgress" | "live"}) {
  const color = {
    planned: "bg-#F49F85",
    inProgress: "bg-#AD1FEA",
    live: "bg-#62BCFA"
  }
  return <div className={"h-2 w-2 rounded-full " + color[status]}></div>
}

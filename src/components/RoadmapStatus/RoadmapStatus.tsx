import { RoadmapStatusCircle } from "../RoadmapStatusCircle/RoadmapStatusCircle"

export function RoadmapStatusItem({status}: {status: "planned" | "inProgress" | "live"}) {

  const statusLabel = {
    planned: "Planned",
    inProgress: "In-Progress",
    live: "Live"
  }

  const amountByStatus = {
    planned: 2,
    inProgress: 3,
    live: 1
  }

  return <li className="flex items-center w-full gap-x-4 text-#647196">
    <RoadmapStatusCircle status={status} />
    <p className="flex-1 line-height-5.75">{statusLabel[status]}</p>
    <span className="font-bold">{amountByStatus[status]}</span>
  </li>
}
import { Link } from "react-router-dom";
import { RoadmapStatusItem } from "@/components/RoadmapStatus/RoadmapStatus";

export function RoadmapStatusList () {
  return (
    <div className="p-6 bg-white rounded-2.5 flex flex-col gap-y-6 md:w-55.75 h-44.5 lg:w-63.75">
      <div className="flex justify-between items-center">
        <p className="line-height-6.5 text-4.5 text-#3A4374 font-bold -tracking-0.25px">Roadmap</p>
        <Link to="/roadmap" className="text-3.25 text-#4661E6 underline font-semibold">View</Link>
      </div>
      <ul>
        <RoadmapStatusItem status="planned" />
        <RoadmapStatusItem status="inProgress" />
        <RoadmapStatusItem status="live" />
      </ul>
    </div>
  )
}
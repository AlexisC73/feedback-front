import { RoadmapStatusList } from "@/components/RoadmapStatusList/RoadmapStatusList";
import { TypeFilter } from "@/components/TypeFilter/TypeFilter";

export function MobileSideMenu () {
  return (
    <div className="bg-black absolute top-18 bottom-0 right-0 left-0 bg-op-20 flex justify-end md:hidden">
      <div className="bg-#F7F8FD w-67.75 flex flex-col p-6 gap-y-6">
        <TypeFilter activeFilter={["all"]} />
        <RoadmapStatusList />
      </div>
    </div>
  )
}
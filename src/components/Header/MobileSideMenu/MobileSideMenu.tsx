import { RoadmapStatusList } from "@/components/Roadmap/RoadmapStatusList/RoadmapStatusList";
import { TagFilterComponent } from "@/Context/TagFilter/TagFilterCtx";

export function MobileSideMenu () {
  return (
    <div className="bg-black absolute top-18 bottom-0 right-0 left-0 bg-op-20 flex justify-end md:hidden">
      <div className="bg-#F7F8FD w-67.75 flex flex-col p-6 gap-y-6">
        <TagFilterComponent  />
        <RoadmapStatusList />
      </div>
    </div>
  )
}
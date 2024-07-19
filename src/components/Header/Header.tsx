import { useState } from "react"
import { BurgerMenuIcon, CloseMenuIcon } from "@/assets/icons"
import { MobileSideMenu } from "./MobileSideMenu/MobileSideMenu"
import { TagFilterComponent } from "@/Context/TagFilter/TagFilterCtx"
import { RoadmapState } from "@/store/feedbacks/app/RoadmapState/RoadmapState"
import { Profile } from "../Profile/Profile"

export function Header () {
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => {
    setMenuOpen(prev => !prev)
  }

  return (
    <>
      <header className="flex justify-between xl:flex-col xl:gap-y-6">
        <HeaderMenu menuOpen={menuOpen} toggleMenu={toggleMenu} />
        <div className="hidden md:flex"><TagFilterComponent /></div>
        <div className="hidden md:flex"><RoadmapState /></div>
        <div className="hidden xl:flex"><Profile /></div>
      </header>
      {menuOpen && <MobileSideMenu />}
    </>
  )
}

export function HeaderMenu ({menuOpen, toggleMenu}: {menuOpen?: boolean, toggleMenu?: () => void}) {
   return <div className="h-18 w-full bg-custom-radial flex items-center justify-between px-6 md:w-55.75 md:h-44.5 md:p-6 md:items-end md:rounded-2.5 xl:h-137px xl:w-63.75">
    <div>
      <h1 className="text-2xl font-bold text-white text-3.75 line-height-5.5 font-bold -tracking-0.19px">Frontend Mentor</h1>
      <p className="text-2xl font-bold text-white text-3.25 line-height-4.75 font-medium text-opacity-75">Feedback Board</p>
    </div>
    <div onClick={toggleMenu} className="w-9 h-9 p-1 flex items-center justify-center md:hidden cursor-pointer">
      {menuOpen ? <CloseMenuIcon className="w-full h-full text-white" /> : <BurgerMenuIcon className="w-full h-full text-white" />}
    </div>
  </div>
}
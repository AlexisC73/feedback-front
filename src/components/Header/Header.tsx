import { useState } from "react"
import { ArrowIcon, BurgerMenuIcon, CloseMenuIcon } from "@/assets/icons"
import { MobileSideMenu } from "./MobileSideMenu/MobileSideMenu"
import { TagFilterComponent } from "@/Context/TagFilter/TagFilterCtx"
import { RoadmapState } from "@/store/feedbacks/app/RoadmapState/RoadmapState"
import { Profile } from "../Profile/Profile"
import { useAppSelector } from "@/store/store-hooks"
import { selectAuth } from "@/store/auth/auth-reducer"
import { useOutsideClick } from "@/hooks/useOutsideClick"

export function Header () {
  const {account} = useAppSelector(selectAuth)
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => {
    setMenuOpen(prev => !prev)
  }

  if(!account) return null

  return (
    <>
      <header className="w-full h-full justify-between md:grid md:grid-cols-3 md:gap-y-6 xl:flex xl:flex-col">
        <HeaderMenu menuOpen={menuOpen} toggleMenu={toggleMenu} />
        <div className="hidden w-full md:flex justify-center"><TagFilterComponent /></div>
        <div className="hidden w-full md:flex justify-end"><RoadmapState /></div>
        <ProfileHeader />
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

export function ProfileHeader () {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useOutsideClick(() => setIsOpen(false))

  const toggleOpen = () => setIsOpen(prev => !prev)

  return (
    <div ref={ref} className={`md:absolute xl:static hidden md:flex top-0 shadow-xl xl:shadow-none ${isOpen ? "top-0" : "-top-72"} `}>
      <div className="relative">
        <button onClick={toggleOpen} className="w-8 h-8 xl:hidden bg-white flex items-center justify-center absolute -bottom-8 left-40 rounded-b-1.25"><ArrowIcon className={`text-2.2 text-#AD1FEA ${isOpen ? "rotate-0" : "rotate-180"}`} /></button>
        <Profile />
      </div>
    </div>
  )
}
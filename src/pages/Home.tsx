import { useState } from "react";
import { BurgerMenuIcon, CloseMenuIcon } from "../assets/icons";

export function HomePage () {
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => {
    setMenuOpen(prev => !prev)
  }

  return <header className="h-18 w-full bg-custom-radial flex items-center justify-between px-6">
    <div>
      <h1 className="text-2xl font-bold text-white text-3.75 line-height-5.5 font-bold">Frontend Mentor</h1>
      <p className="text-2xl font-bold text-white text-3.25 line-height-4.75 font-medium text-opacity-75">Feedback Board</p>
    </div>
    <div onClick={toggleMenu} className="w-9 h-9 p-1 flex items-center justify-center">
      {menuOpen ? <CloseMenuIcon className="w-full h-full text-white" /> : <BurgerMenuIcon className="w-full h-full text-white" />}
    </div>
  </header>
}
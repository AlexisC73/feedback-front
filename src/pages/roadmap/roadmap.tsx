import { Link } from "react-router-dom";

export function RoadmapPage () {
  return (
    <div className="flex flex-col w-full h-screen items-center justify-center gap-y-5">
      <h1 className="text-red-6 text-6">Coucou Camille !</h1>
      <p className="text-4.5">Tu devais pas cliquer ici mais je savais que tu le ferais!</p>
      <p>Tu peux pas t'en empecher .... <Link className="text-blue-6 underline" to={"/"}>Bref clic ici pour revenir en arrière</Link></p>
    </div>
  )
}
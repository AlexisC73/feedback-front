 export function Comment () {
  return <div className="flex flex-col items-start gap-x-8">
    <div className="flex w-full gap-x-8">
      <img src="https://placehold.co/40x40" className="rounded-full h-10 w-10" />
      <div className="flex items-center w-full">
        <div className="flex-1">
          <h3 className="text-#3A4374 text-3.5 line-height-5 -tracking-0.19px font-bold">Elijah Moss</h3>
          <p className="text-#647196 text-3.5 line-height-5">@hexagon.bestagon</p>
        </div>
        <p className="text-3.25 font-semibold text-#4661E6">Reply</p>
      </div>
    </div>
    <p className="mt-4.25 md:ml-18">Also, please allow styles to be applied based on system preferences. I would love to be able to browse Frontend Mentor in the evening after my device’s dark mode turns on without the bright background it currently has.</p>
  </div>
 }
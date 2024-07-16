export function RoadmapColumnTitle ({title, amount, description}: {title: string, amount: number, description: string}) {
  return (
    <div>
      <h2 className="text-#3A4374 text-4.5 -tracking-0.25px font-bold">{title} ({amount})</h2>
      <p className="text-3.25 text-#647196">{description}</p>
    </div>
  )
}

export function Avatar ({ imageUrl, username, size = "sm" }: {imageUrl: string | null, username: string, size?: "md" | "sm"}) {
  const sizeClass = size === "md" ? "h-12 w-12 min-h-12 min-w-12" : "h-10 w-10 min-h-10 min-w-10"

  if(imageUrl) {
    return (
      <img src={imageUrl} alt={"profile-picture"} className={`rounded-full ${sizeClass}`} />
    )
  }
  return (
    <div className={`rounded-full flex items-center justify-center text-white font-bold text-6 bg-blue-6 bg-opacity-80 ${sizeClass}`}>{username.charAt(0).toLocaleUpperCase()}</div>
  )
}
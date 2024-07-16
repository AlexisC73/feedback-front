
export function Avatar ({ imageUrl, username }: {imageUrl: string | null, username: string}) {
  if(imageUrl) {
    return (
      <img src={imageUrl} alt={"profile-picture"} className="rounded-full min-h-10 min-w-10 h-10 w-10" />
    )
  }
  return (
    <div className="rounded-full flex items-center justify-center min-h-10 min-w-10 h-10 w-10 text-white font-bold text-6 bg-blue-6 bg-opacity-60">{username.charAt(0).toLocaleUpperCase()}</div>
  )
}
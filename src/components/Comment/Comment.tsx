 export interface CommentProps {
  imageUrl: string
  fullName: string
  username: string
  comment: string
 }
 
 export function Comment ({fullName, username, comment, imageUrl}: CommentProps) {
  return <div className="flex flex-col items-start gap-x-8">
    <div className="flex w-full gap-x-8">
      <img src={imageUrl} className="rounded-full h-10 w-10" />
      <div className="flex items-center w-full">
        <div className="flex-1">
          <h3 className="text-#3A4374 text-3.5 line-height-5 -tracking-0.19px font-bold">{fullName}</h3>
          <p className="text-#647196 text-3.5 line-height-5">{username}</p>
        </div>
        <p className="text-3.25 font-semibold text-#4661E6">Reply</p>
      </div>
    </div>
    <p className="mt-4.25 md:ml-18 text-3.75 text-#647196">{comment}</p>
  </div>
 }
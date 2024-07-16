import { Avatar } from "@/components/avatar/Avatar"
import { useTranslation } from "react-i18next"

 export interface CommentItemProps {
  imageUrl: string | null
  fullName: string
  username: string
  comment: string
 }
 
 export function CommentItem ({fullName, username, comment, imageUrl}: CommentItemProps) {
  const {t} = useTranslation()
  return <div className="flex flex-col items-start gap-x-8">
    <div className="flex w-full gap-x-8">
      <Avatar imageUrl={imageUrl} username={username} />
      <div className="flex items-center w-full">
        <div className="flex-1">
          <h3 className="text-#3A4374 text-3.5 line-height-5 -tracking-0.19px font-bold">{fullName}</h3>
          <p className="text-#647196 text-3.5 line-height-5">{username}</p>
        </div>
        <p className="text-3.25 text-opacity-40 font-semibold text-#4661E6">{t("comment.reply")} ({t("coming_soon")})</p>
      </div>
    </div>
    <p className="mt-4.25 md:ml-18 text-3.75 text-#647196 break-all">{comment}</p>
  </div>
 }
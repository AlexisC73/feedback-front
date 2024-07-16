import { Button } from "@/components/ui/Button/button";
import { Textarea } from "@/components/form/textarea/Textarea";
import { PostCommentPayload } from "@/store/comments/usecases/payload/post-usecase.payload";
import { COMMENT_MESSAGE_MAX_LENGTH } from "@/store/value-objects/comment-message";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface PostCommentFormProps {
  onSubmit: (params: PostCommentPayload["data"]) => Promise<void>
  feedbackId: string
  errors?: { [key: string]: string[] }
}

export function PostCommentForm ({ onSubmit, feedbackId, errors }: PostCommentFormProps) {
  const {t} = useTranslation()
  const [content, setContent] = useState<string>("")
  const [isProcessing, setIsProcessing] = useState<boolean>(false)

  const handleChange = (value: string) => {
    setContent(value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsProcessing(true)
    const form = e.currentTarget as HTMLFormElement
    const formData = new FormData(form)
    const content = formData.get("content") as string
    onSubmit({ feedbackId, content, id: new Date().getTime().toString()}).then(() => {
      setContent("")
    }).finally(() => setIsProcessing(false))
  }
  return (
    <form onSubmit={handleSubmit} className="bg-white px-8.5 py-6 rounded-2.5 flex flex-col gap-y-4">
      <p className="mb-2 text-#3A4374 text-4.5 -tracking-0.25px font-bold">{t("add_comment_form.title")}</p>
      <Textarea value={content} onChange={handleChange} errors={errors?.content} name="content" rows={2} placeholder={t("add_comment_form.content_placeholder")} />
      <div className="flex justify-between items-center">
        <p className="text-#647196 text-3.75">{COMMENT_MESSAGE_MAX_LENGTH - content.length} {t("add_comment_form.caracters_left")}</p>
        <button disabled={isProcessing} type="submit" className="w35.5">
          <Button isLoading={isProcessing} fullWidth>{t("add_comment_form.post_button")}</Button>
        </button>
      </div>
    </form>
  )
}
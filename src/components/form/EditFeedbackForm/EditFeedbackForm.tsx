import { Button } from "@/components/ui/Button/button";
import { FormGroup } from "../form-group/FormGroup";
import { InputHeader } from "../input-header/InputHeader";
import { Input } from "../input/Input";
import { Textarea } from "../textarea/Textarea";
import { Feedback, FeedbackCategory, FeedbackStatus } from "@/store/feedbacks/models/feedback";
import { useState } from "react";
import { EditFeedbackUsecaseParams } from "@/store/feedbacks/usecases/edit-feedback.usecase";
import { PenIcon } from "@/assets/icons";
import { DeleteFeedbackButtonState } from "@/store/feedbacks/app/DeleteFeedbackButton/DeleteFeedbackButton";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { CategoriesSelect } from "../CategoriesSelect/CategoriesSelect";
import { StatusSelect } from "../StatusSelect/StatusSelect";

export interface EditFeedbackFormProps {
  feedback: Feedback,
  onEditFeedback: (feedback: EditFeedbackUsecaseParams) => Promise<void>
  errors: { [key: string]: string[] }
}

export function EditFeedbackForm ({ feedback, onEditFeedback, errors }: EditFeedbackFormProps) {
  const {t} = useTranslation()
  const categories = Object.values(FeedbackCategory)
  const status = Object.values(FeedbackStatus)
  const [isProcessing, setIsProcessing] = useState<boolean>(false)

  const [currentCategory, setCurrentCategory] = useState<FeedbackCategory>(feedback.category)
  const [currentStatus, setCurrentStatus] = useState<FeedbackStatus>(feedback.status)

  const handleSelectCategory = (selected: string) => {
    if(!categories.includes(selected as FeedbackCategory)) {
      return
    }
    setCurrentCategory(selected as FeedbackCategory)
  }

  const handleUpdateStatus = (selected: string) => {
    if(!status.includes(selected as FeedbackStatus)) {
      return
    }
    setCurrentStatus(selected as FeedbackStatus)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsProcessing(true)
    const form = e.currentTarget
    const formData = new FormData(form)
    const title = formData.get('title') as string
    const category = currentCategory
    const status = currentStatus
    const description = formData.get('description') as string
    onEditFeedback({id: feedback.id, title, category, status, description}).finally(() => setIsProcessing(false))
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 pt-11 w-full rounded-2.5 flex flex-col gap-y-6 relative">
          <div className="bg-custom-radial h-10 w-10 md:h-14 md:w-14 rounded-full flex items-center justify-center text-white absolute -top-7 md:-top-7 text-5 md:text-6 font-bold"><PenIcon /></div>
          <p className="text-4.5 font-bold text-#3A4374 line-height-6.5 mb-6 break-all">{t("edit_feedback_form.title")} ‘{feedback.title}’</p>
          <FormGroup>
            <InputHeader htmlFor="title" label={t("edit_feedback_form.title_label")} description={t("edit_feedback_form.title_description")} />
            <Input defaultValue={feedback.title} name="title" errors={errors.title} />
          </FormGroup>
          <FormGroup>
            <InputHeader htmlFor="category" label={t("edit_feedback_form.category_label")} description={t("edit_feedback_form.category_description")} />
            <CategoriesSelect current={currentCategory} onSelect={handleSelectCategory} />
          </FormGroup>
          <FormGroup>
            <InputHeader htmlFor="status" label={t("edit_feedback_form.status_label")} description={t("edit_feedback_form.status_description")} />
            <StatusSelect current={currentStatus} onSelect={handleUpdateStatus} />
          </FormGroup>
          <FormGroup>
            <InputHeader htmlFor="description" label={t("edit_feedback_form.detail_label")} description={t("edit_feedback_form.detail_description")} />
            <Textarea defaultValue={feedback.description} name="description" errors={errors.description} />
          </FormGroup>
          <div className="mt-10 flex flex-col gap-y-4 md:flex-row md:justify-between">
            <DeleteFeedbackButtonState feedbackId={feedback.id} />
            <div className="order-first flex flex-col gap-y-4 md:order-last md:flex-row md:gap-x-4">
              <button disabled={isProcessing} type="submit" className="md:w-36 md:order-last"><Button isLoading={isProcessing} fullWidth>{t("edit_feedback_form.update_button")}</Button></button>
              <Link to={`/feedbacks/${feedback.id}`} className="md:w-23.25"><Button fullWidth type="tertiary">{t("edit_feedback_form.cancel_button")}</Button></Link>
            </div>
          </div>
        </form>
  )
}
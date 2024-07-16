import { FeedbackCategory } from "@/store/feedbacks/models/feedback";
import { Button } from "../../ui/Button/button";
import { FormGroup } from "../form-group/FormGroup";
import { InputHeader } from "../input-header/InputHeader";
import { Input } from "../input/Input";
import { Textarea } from "../textarea/Textarea";
import { useState } from "react";
import { AddFeedbackUsecaseParams } from "@/store/feedbacks/usecases/add-feedback.usecase";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { CategoriesSelect } from "../CategoriesSelect/CategoriesSelect";

export interface AddFeedbackFormProps {
  onPostFeedback: (params: AddFeedbackUsecaseParams) => Promise<void>
  fieldErrors: {[key: string]: string[]}
}

export function AddFeedbackForm ({onPostFeedback, fieldErrors}: AddFeedbackFormProps) {
  const {t} = useTranslation()
  const categoryOptions = Object.values(FeedbackCategory)
  const [currentOption, setCurrentOption] = useState<FeedbackCategory>(categoryOptions[0])
  const [isProcessing, setIsProcessing] = useState<boolean>(false)

  const handleSelectOption = (selected: string) => {
    if(!categoryOptions.includes(selected as FeedbackCategory)) {
      return
    }
    setCurrentOption(selected as FeedbackCategory)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsProcessing(true)
    const form = e.currentTarget
    const formData = new FormData(form)
    const title = formData.get('title') as string
    const category = currentOption
    const description = formData.get('description') as string
    onPostFeedback({title, category, description}).finally(() => setIsProcessing(false))
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 pt-11 w-full rounded-2.5 flex flex-col gap-y-6 relative">
      <div className="bg-custom-radial h-10 w-10 md:w-14 md:h-14 rounded-full flex items-center justify-center text-white absolute -top-5 md:-top-7 text-5 md:text-6 font-bold">+</div>
      <p className="text-4.5 font-bold text-#3A4374 line-height-6.5 mb-6">{t("add_suggestion_form.title")}</p>
      <FormGroup>
        <InputHeader htmlFor="title" label={t("add_suggestion_form.title_label")} description={t("add_suggestion_form.title_description")} />
        <Input name="title" errors={fieldErrors?.title} />
      </FormGroup>
      <FormGroup>
        <InputHeader htmlFor="category" label={t("add_suggestion_form.category_label")} description={t("add_suggestion_form.category_description")} />
        <CategoriesSelect current={currentOption} onSelect={handleSelectOption} />
      </FormGroup>
      <FormGroup>
        <InputHeader htmlFor="description" label={t("add_suggestion_form.detail_label")} description={t("add_suggestion_form.detail_description")} />
        <Textarea errors={fieldErrors?.description} name="description" />
      </FormGroup>
      <div className="mt-10 flex flex-col gap-y-4 md:flex-row md:justify-end md:gap-x-4">
        <button disabled={isProcessing} type="submit" className="w-full md:w-36 md:order-last">
          <Button isLoading={isProcessing} fullWidth>{t("add_suggestion_form.add_button")}</Button>
        </button>
        <Link to={"/feedbacks"} className="w-full md:w-23.25">
          <Button fullWidth type="tertiary">{t("add_suggestion_form.cancel_button")}</Button>
        </Link>
      </div>
    </form>
  )
}
import { FeedbackCategory } from "@/store/feedbacks/models/feedback";
import { Button } from "../Button/button";
import { Dropdown } from "./dropdown/Dropdown";
import { FormGroup } from "./form-group/FormGroup";
import { InputHeader } from "./input-header/InputHeader";
import { Input } from "./input/Input";
import { Textarea } from "./textarea/Textarea";
import { useState } from "react";

export interface AddFeedbackFormProps {
  onPostFeedback: (params: { 
    title: string
    category: FeedbackCategory
    description: string
  }) => Promise<void>
  fieldErrors: {[key: string]: string[]}

}

export function AddFeedbackForm ({onPostFeedback, fieldErrors}: AddFeedbackFormProps) {
  const categoryOptions = Object.values(FeedbackCategory)
  const [currentOption, setCurrentOption] = useState<FeedbackCategory>(categoryOptions[0])

  const handleSelectOption = (selected: string) => {
    if(!categoryOptions.includes(selected as FeedbackCategory)) {
      return
    }
    setCurrentOption(selected as FeedbackCategory)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    const title = formData.get('title') as string
    const category = currentOption
    const description = formData.get('description') as string
    onPostFeedback({title, category, description})
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 pt-11 w-full rounded-2.5 flex flex-col gap-y-6 relative">
      <div className="bg-custom-radial h-10 w-10 md:w-14 md:h-14 rounded-full flex items-center justify-center text-white absolute -top-5 md:-top-7 text-5 md:text-6 font-bold">+</div>
      <p className="text-4.5 font-bold text-#3A4374 line-height-6.5 mb-6">Create New Feedback</p>
      <FormGroup>
        <InputHeader htmlFor="title" label="Feedback Title" description="Add a short, descriptive headline" />
        <Input name="title" errors={fieldErrors?.title} />
      </FormGroup>
      <FormGroup>
        <InputHeader htmlFor="category" label="Category" description="Choose a category for your feedback" />
        <Dropdown onSelect={handleSelectOption} current={currentOption} options={categoryOptions} />
      </FormGroup>
      <FormGroup>
        <InputHeader htmlFor="description" label="Feedback Detail" description="Include any specific comments on what should be improved, added, etc." />
        <Textarea errors={fieldErrors?.description} name="description" />
      </FormGroup>
      <div className="mt-10 flex flex-col gap-y-4 md:flex-row md:justify-end md:gap-x-4">
        <button type="submit" className="w-full md:w-36 md:order-last">
          <Button fullWidth>Add Feedback</Button>
        </button>
        <div className="w-full md:w-23.25">
          <Button fullWidth type="tertiary">Cancel</Button>
        </div>
      </div>
    </form>
  )
}
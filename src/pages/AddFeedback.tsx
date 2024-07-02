import { Link } from "react-router-dom";
import { GoBackButton } from "../components/BoBackButton/GoBackButton";
import Layout from "../Layout";
import { InputHeader } from "../components/form/input-header/InputHeader";
import { Input } from "../components/form/input/Input";
import { FormGroup } from "../components/form/form-group/FormGroup";
import { Dropdown } from "../components/form/dropdown/Dropdown";
import { useState } from "react";
import { Textarea } from "../components/form/textarea/Textarea";
import { Button } from "../components/Button/button";

export function AddFeedbackPage () {
  const options = ["Feature", "UI", "UX", "Enhancement", "Bug"]

  const [currentOption, setCurrentOption] = useState<string>(options[0])

  const handleSelectOption = (selected: string) => {
    setCurrentOption(selected)
  }

  return (
    <Layout.emptyLayout>
      <div className="px-6 py-8.5 flex flex-col gap-y-13.75 items-start">
        <div>
          <Link to="/" ><GoBackButton /></Link>
        </div>
        <div className="bg-white p-6 pt-11 w-full rounded-2.5 flex flex-col gap-y-6 relative">
          <div className="bg-custom-radial h-10 w-10 rounded-full flex items-center justify-center text-white absolute -top-5 text-5 font-bold">+</div>
          <p className="text-4.5 font-bold text-#3A4374 line-height-6.5 mb-6">Create New Feedback</p>
          <FormGroup>
            <InputHeader htmlFor="title" label="Feedback Title" description="Add a short, descriptive headline" />
            <Input error="Can't be empty" />
          </FormGroup>
          <FormGroup>
            <InputHeader htmlFor="category" label="Category" description="Choose a category for your feedback" />
            <Dropdown onSelect={handleSelectOption} current={currentOption} options={options} />
          </FormGroup>
          <FormGroup>
            <InputHeader htmlFor="description" label="Feedback Detail" description="Include any specific comments on what should be improved, added, etc." />
            <Textarea error="Can't be empty" />
          </FormGroup>
          <div className="mt-10 flex flex-col gap-y-4">
            <Button fullWidth>Add Feedback</Button>
            <Button fullWidth type="tertiary">Cancel</Button>
          </div>
        </div>
      </div>
    </Layout.emptyLayout>
  )
}

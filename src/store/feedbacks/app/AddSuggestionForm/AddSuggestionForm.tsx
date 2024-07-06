import { AddFeedbackForm } from "@/components/form/AddFeedbackForm/AddFeedbackForm";
import { FeedbackCategory } from "../../models/feedback";
import { useAppDispatch } from "@/store/store-hooks";
import { addFeedbackThunk } from "../../usecases/add-feedback.usecase";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { UsecaseResultType } from "@/store/@shared/models/resultType";

export function AddSuggestionForm () {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [errors, setErrors] = useState<{[key: string]: string[]}>({})

  const handlePostFeedback = async (params: {title: string, category: FeedbackCategory, description: string}) => {
    await dispatch(addFeedbackThunk(params)).then((res) => {
      if(res.meta.requestStatus === "fulfilled") {
        navigate("/feedbacks")
      }
      if(res.payload?.type === UsecaseResultType.FIELD_ERROR) {
        const payloadErrors: {[key: string]: string[]} = {}
        if(Array.isArray(res.payload.data)) {
          res.payload.data.forEach((error) => {
            payloadErrors[error.field] = error.errors
          })
        }
        setErrors(payloadErrors)
      }
    })
  }
  return (
    <AddFeedbackForm fieldErrors={errors} onPostFeedback={handlePostFeedback} />
  )
}
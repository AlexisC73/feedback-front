import { EditFeedbackForm } from "@/components/form/EditFeedbackForm/EditFeedbackForm";
import { useAppDispatch, useAppSelector } from "@/store/store-hooks";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { selectFeedback } from "../../feedback.reducer";
import { editFeedbackThunk, EditFeedbackThunkResultType, EditFeedbackUsecaseParams } from "../../usecases/edit-feedback.usecase";
import { useState } from "react";

export function EditFeedbackFormComponent() {
  const params = useParams<{id: string}>()
  const [errors, setErrors] = useState<{[key: string]: string[]}>({})
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const feedback = useAppSelector(selectFeedback(params.id!))
  

  const handleEditFeedback = (feedback: EditFeedbackUsecaseParams) => {
    dispatch(editFeedbackThunk(feedback)).then(res => {
      if(res.payload?.type === EditFeedbackThunkResultType.SUCCESS) {
        navigate(`/feedbacks/${params.id}`)
      }
      if(res.payload?.type === EditFeedbackThunkResultType.FIELDS_ERROR) {
        const errors: {[key: string]: string[]} = {}
        res.payload.errors.forEach(errorField => {
          errors[errorField.field]= errorField.errors
        })
        setErrors(errors)
      }
    })
  }

  if(!feedback) {
    return <Navigate to="/feedbacks" />
  }
  
  return (
    <EditFeedbackForm feedback={feedback} errors={errors} onEditFeedback={handleEditFeedback} />
  )
}
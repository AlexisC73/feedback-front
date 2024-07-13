import { EditFeedbackForm } from "@/components/form/EditFeedbackForm/EditFeedbackForm";
import { useAppDispatch, useAppSelector } from "@/store/store-hooks";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { selectFeedback } from "../../feedback.reducer";
import { editFeedbackThunk, EditFeedbackUsecaseParams } from "../../usecases/edit-feedback.usecase";
import { useState } from "react";
import { UsecaseResultType } from "@/store/@shared/models/resultType";

export function EditFeedbackFormComponent() {
  const params = useParams<{id: string}>()
  const [errors, setErrors] = useState<{[key: string]: string[]}>({})
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const feedback = useAppSelector(selectFeedback(params.id!))
  

  const handleEditFeedback = async (feedback: EditFeedbackUsecaseParams) => {
    await dispatch(editFeedbackThunk(feedback)).then(res => {
      const {payload, type} = res
      if(!payload || !type) {
        return
      }
      if(payload.type === UsecaseResultType.SUCCESS) {
        return navigate(`/feedbacks/${params.id}`)
      }
      if(type === editFeedbackThunk.rejected.type) {
        if(payload.type === UsecaseResultType.FIELD_ERROR) {
          const errors: {[key: string]: string[]} = {}
          if(Array.isArray(payload.data)) {
            payload.data.forEach(errorField => {
              errors[errorField.field]= errorField.errors
            })
          }
          setErrors(errors)
        }
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
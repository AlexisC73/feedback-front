import { EditFeedbackForm } from "@/components/form/EditFeedbackForm/EditFeedbackForm";
import { useAppDispatch, useAppSelector } from "@/store/store-hooks";
import { Navigate, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { selectFeedback } from "../../feedback.reducer";
import { editFeedbackThunk, EditFeedbackUsecaseParams } from "../../usecases/edit-feedback.usecase";
import { useContext, useState } from "react";
import { UsecaseResultType } from "@/store/@shared/models/resultType";
import { notifyUsecaseError } from "@/helpers/handleUsecaseError";
import { ToastCtx } from "@/Context/ToastCtx/ToastCtx";

export function EditFeedbackFormComponent() {
  const params = useParams<{id: string}>()
  const [errors, setErrors] = useState<{[key: string]: string[]}>({})
  const {addToast} = useContext(ToastCtx)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const feedback = useAppSelector(selectFeedback(params.id!))
  const searchParams = useSearchParams()[0]
  const backRoute = searchParams.get('back') ?? "feedbacks"
  

  const handleEditFeedback = async (feedback: EditFeedbackUsecaseParams) => {
    await dispatch(editFeedbackThunk(feedback)).then(res => {
      const {payload, type} = res
      if(!payload || !type) {
        return
      }
      if(payload.type === UsecaseResultType.SUCCESS) {
        return navigate(`/feedbacks/${params.id}?back=${backRoute}`)
      } else if(payload.type === UsecaseResultType.FIELD_ERROR) {
        const errors: {[key: string]: string[]} = {}
          if(Array.isArray(payload.data)) {
            payload.data.forEach(errorField => {
              errors[errorField.field]= errorField.errors
            })
          }
          setErrors(errors)
      } else if(payload.type === UsecaseResultType.NOT_FOUND) {
        addToast({message: "Feedback not found", type: "error"})
      } else {  
        notifyUsecaseError(addToast, payload)
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
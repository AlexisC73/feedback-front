import { Button } from "@/components/ui/Button/button";
import { useAppDispatch } from "@/store/store-hooks";
import { deleteFeedbackThunk } from "../../usecases/delete-feedback.usecase";
import { UsecaseResultType } from "@/store/@shared/models/resultType";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { handleUsecaseError } from "@/helpers/handleUsecaseError";
import { ToastCtx } from "@/Context/ToastCtx/ToastCtx";

export function DeleteFeedbackButtonState ({feedbackId}: {feedbackId: string}) {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const {addToast} = useContext(ToastCtx)
  const [isProcessing, setIsProcessing] = useState<boolean>(false)

  const handleDeleteFeedback = async () => {
    setIsProcessing(true)
    await dispatch(deleteFeedbackThunk({feedbackId})).then((res) => {
      if(res.payload?.type === UsecaseResultType.SUCCESS) {
        return navigate("/feedbacks")
      } else {
        handleUsecaseError(addToast, res.payload)
      }
    }).finally(() => setIsProcessing(false))
  }

  return (
    <button disabled={isProcessing} onClick={handleDeleteFeedback} type="button" className="md:w-23.25">
      <Button isLoading={isProcessing} fullWidth type="danger">Delete</Button>
    </button>
  )
}
import { Button } from "@/components/ui/Button/button";
import { useAppDispatch } from "@/store/store-hooks";
import { deleteFeedbackThunk } from "../../usecases/delete-feedback.usecase";
import { UsecaseResultType } from "@/store/@shared/models/resultType";
import { useNavigate } from "react-router-dom";

export function DeleteFeedbackButtonState ({feedbackId}: {feedbackId: string}) {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleDeleteFeedback = async () => {
    await dispatch(deleteFeedbackThunk({feedbackId})).then((res) => {
      if(res.payload?.type === UsecaseResultType.SUCCESS) {
        navigate("/feedbacks")
      }
    })
  }

  return (
    <button onClick={handleDeleteFeedback} type="button" className="md:w-23.25">
      <Button fullWidth type="danger">Delete</Button>
    </button>
  )
}
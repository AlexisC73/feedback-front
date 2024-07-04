import Layout from "@/Layout";
import { FeedbackList } from "@/components/FeedbackList/FeedbackList";
import { Suggestions } from "@/components/Suggestions/Suggestions";
import { registerThunk, RegisterThunkResultType } from "@/store/auth/usecases/register.usecase";
import { useAppDispatch } from "@/store/store-hooks";

export function HomePage () {
  const dispatch = useAppDispatch()
  const handleRegister = () => {
    dispatch(registerThunk({
      email: "alexis.73400@icloud.com",
      password: "tetetete"
    } as never)).then(err => {
      if(err.meta.requestStatus === "rejected") {
        if(err.payload?.type === RegisterThunkResultType.FIELD_ERROR) {
          console.log(err.payload.errors)
        }
      }
    })
  }

  return (
    <Layout.withHeader>
      <div className="md:px-10 lg:px-0">
        <Suggestions />
      </div>
      <div className="px-6 py-8 md:px-10 md:py-6 lg:px-0">
        <FeedbackList />
      </div>
      <button onClick={handleRegister}>Click</button>
    </Layout.withHeader>
  )
}

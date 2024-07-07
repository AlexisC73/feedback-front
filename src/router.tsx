import { createBrowserRouter } from "react-router-dom"
import { HomePage } from "@/pages/Home"
import { FeedbackDetailsPage } from "@/pages/Feedbacks/FeedbackDetails"
import { AddFeedbackPage } from "@/pages/Feedbacks/AddFeedback"
import { UpdateFeedbackPage } from "@/pages/Feedbacks/UpdateFeedback"
import { RegisterPage } from "./pages/auth/register"
import { LoginPage } from "./pages/auth/login"
import { RequireAuth } from "./components/middlewares/ProtectedPage/ProtectedPage"
import { createFeedbackLoader } from "./pages/Feedbacks/feedback-loader"
import { AppStore } from "./store/store"
import { FeedbackPage } from "./pages/Feedbacks/FeedbackPage"

export const createRouter = ({store}: {store: AppStore}) => createBrowserRouter([
    {
      path: "/",
      index: true,
      element: <RequireAuth page={<HomePage />} />
    },
    {
      path: "/feedbacks",
      loader: createFeedbackLoader({store}),
      children: [
        {
          path: "/feedbacks",
          element: <RequireAuth page={<FeedbackPage />} />
        },
        {
          path: "/feedbacks/new",
          element: <RequireAuth page={<AddFeedbackPage />} />
        },
        {
          path: "/feedbacks/edit/:id",
          element: <RequireAuth page={<UpdateFeedbackPage />} />
        },
        {
          path: "/feedbacks/:id",
          element: <RequireAuth page={<FeedbackDetailsPage />} />
        },
      ]
    }, {
      path: "/auth",
      children: [
        {
          path: "/auth/register",
          element: <RegisterPage />
        },
        {
          path: "/auth/login",
          element: <LoginPage />
        }
      ]
    }
  ])
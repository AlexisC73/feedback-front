import { createBrowserRouter } from "react-router-dom"
import { HomePage } from "@/pages/Home"
import { FeedbackDetailsPage } from "@/pages/FeedbackDetails"
import { AddFeedbackPage } from "@/pages/AddFeedback"
import { UpdateFeedbackPage } from "@/pages/UpdateFeedback"
import { RegisterPage } from "./pages/auth/register"
import { LoginPage } from "./pages/auth/login"
import { RequireAuth } from "./components/ProtectedPage/ProtectedPage"

export const createRouter = () => createBrowserRouter([
    {
      path: "/",
      index: true,
      element: <RequireAuth page={<HomePage />} />
    },
    {
      path: "/feedbacks",
      children: [
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
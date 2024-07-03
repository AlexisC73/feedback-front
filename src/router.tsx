import { createBrowserRouter } from "react-router-dom"
import { HomePage } from "@/pages/Home"
import { FeedbackDetailsPage } from "@/pages/FeedbackDetails"
import { AddFeedbackPage } from "@/pages/AddFeedback"
import { UpdateFeedbackPage } from "@/pages/UpdateFeedback"
import { RegisterPage } from "./pages/auth/register"
import { LoginPage } from "./pages/auth/login"

export const createRouter = () => createBrowserRouter([
    {
      path: "/",
      index: true,
      element: <HomePage />
    },
    {
      path: "/feedbacks",
      children: [
        {
          path: "/feedbacks/new",
          element: <AddFeedbackPage />
        },
        {
          path: "/feedbacks/edit/:id",
          element: <UpdateFeedbackPage />
        },
        {
          path: "/feedbacks/:id",
          element: <FeedbackDetailsPage />
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
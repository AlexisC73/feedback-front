import { createBrowserRouter } from "react-router-dom"
import { HomePage } from "./pages/Home"
import { FeedbackDetailsPage } from "./pages/FeedbackDetails"
import { AddFeedbackPage } from "./pages/AddFeedback"

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
          path: "/feedbacks/:id",
          element: <FeedbackDetailsPage />
        },
      ]
    }
  ])
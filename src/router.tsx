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
      path: "/feedback",
      children: [
        {
          path: "/feedback/new",
          element: <AddFeedbackPage />
        },
        {
          path: "/feedback/:id",
          element: <FeedbackDetailsPage />
        },
      ]
    }
  ])
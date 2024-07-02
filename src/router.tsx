import { createBrowserRouter } from "react-router-dom"
import { HomePage } from "./pages/Home"
import { FeedbackDetailsPage } from "./pages/FeedbackDetails"

export const createRouter = () => createBrowserRouter([
    {
      path: "/",
      index: true,
      element: <HomePage />
    },
    {
      path: "/feedback/:id",
      element: <FeedbackDetailsPage />
    }
  ])
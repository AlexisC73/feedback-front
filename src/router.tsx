import { createBrowserRouter } from "react-router-dom"
import { HomePage } from "./pages/Home"

export const createRouter = () => createBrowserRouter([
    {
      path: "/",
      index: true,
      element: <HomePage />
    }
  ])
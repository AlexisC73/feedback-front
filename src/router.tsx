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
import { createFeedbackDetailLoader } from "./pages/Feedbacks/feedback-detail-loader"
import { createAuthLoader } from "./pages/auth/authLoader"
import { RoadmapPage } from "./pages/roadmap/roadmap"
import { createRoadmapLoader } from "./pages/roadmap/roadmap-loader.function"

export const createRouter = ({store}: {store: AppStore}) => createBrowserRouter([
    {
      path: "/",
      index: true,
      element: <HomePage />
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
          loader: createFeedbackDetailLoader({store}),
          element: <RequireAuth page={<FeedbackDetailsPage />} />
        },
      ]
    }, {
      path: "/auth",
      loader: createAuthLoader({store}),
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
    },
    {
      path: "/roadmap",
      loader: createRoadmapLoader({store}),
      children: [
        {
          path: "/roadmap",
          element: <RoadmapPage />
        }
      ]
    }
  ])
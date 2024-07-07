import { combineReducers } from "@reduxjs/toolkit";
import { authReducer } from "./auth/auth-reducer";
import { feedbackReducer } from "./feedbacks/feedback.reducer";
import { commentsReducer } from "./comments/comment-reducer";

export const rootReducer = combineReducers({
  auth: authReducer,
  feedback: feedbackReducer,
  comments: commentsReducer
})
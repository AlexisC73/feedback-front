import { combineReducers } from "@reduxjs/toolkit";
import { authReducer } from "./auth/auth-reducer";
import { feedbackReducer } from "./feedbacks/feedback.reducer";

export const rootReducer = combineReducers({
  auth: authReducer,
  feedback: feedbackReducer
})
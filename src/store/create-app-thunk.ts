import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "./store";
import { Dependencies } from "@/injection/container";

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState,
  dispatch: AppDispatch,
  extra: Dependencies
}>()
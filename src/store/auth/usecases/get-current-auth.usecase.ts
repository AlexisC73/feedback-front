import { createAppAsyncThunk } from "@/store/create-app-thunk";

export const getCurrentAuthThunk = createAppAsyncThunk("auth/getCurrentAuth", async (_, {extra: { accountRepository }}) => {
  try {
    return await accountRepository.getMe()
  } catch (e) {
    return null
  }
})
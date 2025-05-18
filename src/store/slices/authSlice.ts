import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
  isLoading: boolean;
  error: string;
};
const initialState: AuthState = {
  isLoading: false,
  error: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    clearError(state) {
      state.error = "";
    },
  },
});

export default authSlice.reducer;
export const authActions = authSlice.actions;

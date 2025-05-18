import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  isDarkMode: false,
  isUserMenuOpen: false,
};

const rightNavSlice = createSlice({
  name: "rightNav",
  initialState,
  reducers: {
    setIsDarkMode: (state, action: PayloadAction<boolean>) => {
      state.isDarkMode = action.payload;
    },
    setIsUserMenuOpen: (state, action: PayloadAction<boolean>) => {
      state.isUserMenuOpen = action.payload;
    },
  },
});

export default rightNavSlice.reducer;

export const rightNavActions = rightNavSlice.actions;

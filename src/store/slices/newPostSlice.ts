import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: {
  imagePreview: string | null;
  isImageUrl: boolean;
  imageUrl: string;
  error: string | null;
} = {
  imagePreview: null,
  isImageUrl: false,
  imageUrl: "",
  error: null,
};

const newPostSlice = createSlice({
  name: "newPost",
  initialState,
  reducers: {
    setImagePreview(state, action: PayloadAction<string | null>) {
      state.imagePreview = action.payload;
    },
    setIsImageUrl(state, action: PayloadAction<boolean>) {
      state.isImageUrl = action.payload;
    },
    setImageUrl(state, action: PayloadAction<string>) {
      state.imageUrl = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export default newPostSlice.reducer;
export const newPostActions = newPostSlice.actions;

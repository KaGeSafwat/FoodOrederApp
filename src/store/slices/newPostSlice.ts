import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  imagePreview: null,
  isImageUrl: false,
  imageUrl: "",
  error: null,
};

const newPostSlice = createSlice({
  name: "newPost",
  initialState,
  reducers: {
    setImagePreview(state, action) {
      state.imagePreview = action.payload;
    },
    setIsImageUrl(state, action) {
      state.isImageUrl = action.payload;
    },
    setImageUrl(state, action) {
      state.imageUrl = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export default newPostSlice.reducer;
export const newPostActions = newPostSlice.actions;

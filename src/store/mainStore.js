import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import rightNavReducer from "./slices/rightNavSlice";
import newPostReducer from "./slices/newPostSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    rightNav: rightNavReducer,
    newPost: newPostReducer,
  },
});

export default store;

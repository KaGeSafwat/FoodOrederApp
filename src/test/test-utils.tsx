import React, { type ReactElement } from "react";
import {
  render as rtlRender,
  type RenderOptions,
} from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter } from "react-router-dom";
import { queryClient } from "../utils/fetch";

// Import your reducers
import authReducer from "../store/slices/authSlice";
import rightNavReducer from "../store/slices/rightNavSlice";
import newPostReducer from "../store/slices/newPostSlice";

// Create a custom render function that includes providers
const customRender = (
  ui: ReactElement,
  {
    preloadedState = {},
    store = configureStore({
      reducer: {
        auth: authReducer,
        rightNav: rightNavReducer,
        newPost: newPostReducer,
      },
      preloadedState,
    }),
    route = "/",
    ...renderOptions
  } = {}
) => {
  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    return (
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
        </Provider>
      </QueryClientProvider>
    );
  };

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions } as RenderOptions);
};

// Re-export everything from testing-library
export * from "@testing-library/react";

// Override the render method
export { customRender as render };

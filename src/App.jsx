import router from "./utils/router.jsx";
import "./App.css";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import store from "./store/mainStore.js";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./utils/fetch.js";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </QueryClientProvider>
  );
}

export default App;

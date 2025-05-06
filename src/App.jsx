import router from "./utils/router.jsx";
import "./App.css";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import store from "./store/mainStore.js";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./utils/fetch.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <RouterProvider router={router} />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={true}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </Provider>
    </QueryClientProvider>
  );
}

export default App;

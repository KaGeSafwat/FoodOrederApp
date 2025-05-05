import { createBrowserRouter } from "react-router-dom";
import Auth from "../pages/Auth";
import Welcome from "../pages/Welcome";
import DashBoardLayout from "../layouts/DashBoardLayout";
import Dashboard from "../pages/Dashboard";
import NewPost from "../pages/NewPost";
import Posts from "../pages/Posts";
import EditPost from "../pages/EditPost";
import { isAuthenticated, logout } from "./auth";
import { Navigate } from "react-router-dom";

const user = localStorage.getItem("user");
const router = createBrowserRouter([
  {
    path: "/",
    element: user ? <Navigate to="/dashboard" /> : <Navigate to="/home" />,
  },
  {
    path: "/home",
    element: <Welcome />,
  },
  {
    path: "auth",
    element: <Auth />,
  },
  {
    path: "logout",
    loader: () => logout(),
  },
  {
    path: "dashboard",
    element: <DashBoardLayout />,
    loader: isAuthenticated,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "posts",
        element: <Posts />,
      },
      {
        path: "new-post",
        element: <NewPost />,
      },
      {
        path: "posts/:postId/edit",
        element: <EditPost />,
      },
    ],
  },
]);

export default router;

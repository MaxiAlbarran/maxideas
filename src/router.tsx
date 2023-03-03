import { createBrowserRouter } from "react-router-dom";
import Catch from "./pages/Catch";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PublicLayout from "./pages/PublicLayout";
import Registration from "./pages/Registration";

export const getRouter = () =>
  createBrowserRouter([
    {
      path: "/",
      element: <PublicLayout />,
      errorElement: <Catch/>,
      children: [
        {
          index: true,
          element: <Login />,
        },
        {
          path: "auth",
          element: <Registration />,
        },
        {
          path: "home",
          element: <Home />,
        },
      ],
    },
  ]);

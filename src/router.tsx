import { createBrowserRouter } from "react-router-dom";
import Catch from "./pages/Catch";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
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
          element: <Home />,
        },
        {
          path: "user/:id",
          element: <Profile />,
        },
      ],
    },
    {
      path:"/login",
      element: <Login />,
      errorElement: <Catch />
    },
    {
      path:"/auth",
      element: <Registration />,
      errorElement: <Catch />
    },
  ]);

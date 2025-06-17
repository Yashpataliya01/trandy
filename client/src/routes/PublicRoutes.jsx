import { lazy } from "react";
import Public from "../layout/Layout.jsx";

const Home = lazy(() => import("../pages/home/Home.jsx"));

export const publicRoutes = [
  {
    path: "/",
    element: <Public />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
];

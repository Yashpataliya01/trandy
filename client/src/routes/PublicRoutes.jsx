import { lazy } from "react";
import Public from "../layout/Layout.jsx";
import Product from "../pages/products/Product.jsx";

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
      {
        path: "/products",
        element: <Product />,
      },
    ],
  },
];

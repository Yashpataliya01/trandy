import { Suspense, useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import "./App.css";

import { routes } from "./routes/Route.jsx";

function App() {
  return (
    <Suspense>
      <RouterProvider router={routes} />
    </Suspense>
  );
}

export default App;

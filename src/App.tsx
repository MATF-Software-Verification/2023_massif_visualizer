import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";

import { Toaster } from "./components/ui/Toaster";
import { router } from "./SiteRoutes";

const App = () => {
  return (
    <Suspense>
      <RouterProvider router={router} />
      <Toaster />
    </Suspense>
  );
};

export default App;

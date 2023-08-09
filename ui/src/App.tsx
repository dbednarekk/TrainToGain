import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/signup", element: <SignUp /> },
    { path: "/signin", element: <SignIn /> },
  ]);
  return <RouterProvider router={router} />;
}

export default App;

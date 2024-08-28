import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import UserPage from "./pages/UserPage";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/signup", element: <SignUp /> },
    { path: "/signin", element: <SignIn /> },
    {
      path: "/user",
      element: <ProtectedRoute />,
      children: [{ path: "userPage", element: <UserPage /> }],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;

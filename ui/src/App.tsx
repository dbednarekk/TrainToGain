import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import PasswordReset from "./pages/PasswordReset";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import UserProfilePage from "./pages/UserProfilePage";
import WorkoutListPage from "./pages/UserWorkoutsPage";
import WorkoutDetailsPage from "./pages/WorkoutDetailsPage";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/signup", element: <SignUp /> },
    { path: "/signin", element: <SignIn /> },
    { path: "/password-reset", element: <PasswordReset /> },
    {
      path: "/user",
      element: <ProtectedRoute />,
      children: [
        {
          path: "workouts",
          element: <WorkoutListPage />,
        },
        {
          path: "workout/:id",
          element: <WorkoutDetailsPage />,
        },
        {
          path: "profile",
          element: <UserProfilePage />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;

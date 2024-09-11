import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import WorkoutListPage from "./pages/UserWorkoutsPage";
import WorkoutDetailsPage from "./pages/WorkoutDetailsPage";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/signup", element: <SignUp /> },
    { path: "/signin", element: <SignIn /> },
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
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;

import { useEffect } from "react";
import { isExpired } from "react-jwt";
import { Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function ProtectedRoute() {
  const token = sessionStorage.getItem("token");
  const expired = isExpired(token ? token : "");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/");
      toast.error("You need to be logged in to access this page");
    } else if (expired) {
      navigate("/");
      toast.error("Your session has expired, please log in again");
    }
  }, []);

  return <Outlet />;
}

export default ProtectedRoute;

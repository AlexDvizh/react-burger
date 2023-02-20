import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { getCookie } from "../utils/cookie";

const ProtectedRoute = ({onlyUnAuth = false, children}) => {
  const { isLoggedIn, user } = useSelector(state => state.auth);
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  if (!isLoggedIn && !onlyUnAuth) {
    return <Navigate to={"/login"} replace state={{ from: location }} />;
  }

  if (onlyUnAuth && user.hasOwnProperty("email")) {
    return <Navigate to={from} />;
  }

  return children;
}

export default ProtectedRoute;
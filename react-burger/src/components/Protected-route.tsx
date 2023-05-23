import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { RootState } from "../services/reducers";

function ProtectedRoute({
  onlyUnAuth = false, children }: { onlyUnAuth: boolean; children: React.ReactElement;
}): JSX.Element {
  const { isLoggedIn, user } = useSelector((state: RootState) => state.auth);
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
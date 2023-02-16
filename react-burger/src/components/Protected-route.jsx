import { Navigate } from "react-router-dom";
import { getCookie } from "../utils/cookie";

const ProtectedRoute = (props) => {
  const accessToken = getCookie("accessToken");

  if (accessToken) {
    return props.element;
  } else {
    return <Navigate to="/login" />;
  }
}

export default ProtectedRoute;
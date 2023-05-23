import ResetPasswordForm from "../components/ResetPasswordForm/ResetPasswordForm";
import styles from "./pages.module.css";
import { Navigate, useLocation } from "react-router-dom";

function ResetPasswordPage(): JSX.Element {
  const location = useLocation();
  const { state } = location;
  if (!state?.hasAccess) {
    return <Navigate to={"/forgot-password"} />;
  }

  return (
    <div className={styles.main}>
      <ResetPasswordForm />
    </div>
  );
}

export default ResetPasswordPage;
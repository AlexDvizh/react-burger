import ForgotPasswordForm from "../components/ForgotPasswordForm/ForgotPasswordForm";
import styles from "./pages.module.css";

function ForgotPasswordPage(): JSX.Element {

  return (
    <div className={styles.main}>
      <ForgotPasswordForm />
    </div>
  );
}

export default ForgotPasswordPage;
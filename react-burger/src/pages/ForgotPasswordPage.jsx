import { useState } from "react";
import ForgotPasswordForm from "../components/ForgotPasswordForm/ForgotPasswordForm";
import styles from "./pages.module.css";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");

  return (
    <div className={styles.main}>
      <ForgotPasswordForm email={email} setEmail={setEmail} />
    </div>
  );
}

export default ForgotPasswordPage;
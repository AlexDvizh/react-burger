import { useState } from "react";
import ResetPasswordForm from "../components/ResetPasswordForm/ResetPasswordForm";
import styles from "./pages.module.css";

const ResetPasswordPage = () => {
  const [form, setForm] = useState({ password: "", code: "" });

  return (
    <div className={styles.main}>
      <ResetPasswordForm form={form} setForm={setForm} />
    </div>
  );
}

export default ResetPasswordPage;
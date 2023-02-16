import { useState } from "react";
import RegisterForm from "../components/RegisterForm/RegisterForm";
import styles from "./pages.module.css";

const RegisterPage = () => {
  const [form, setForm] = useState({ email: "", password: "", name: "" });
  
  return (
    <div className={styles.main}>
      <RegisterForm form={form} setForm={setForm} />
    </div>
  );
}

export default RegisterPage;


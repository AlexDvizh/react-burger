import { useState } from "react";
import LoginForm from "../components/LoginForm/LoginForm";
import styles from "./pages.module.css";


const LoginPage = () => {
    const [form, setForm] = useState({ email: "", password: "" });

    return (
        <div className={styles.main}>
            <LoginForm form={form} setForm={setForm} />
        </div>
    )
}

export default LoginPage;
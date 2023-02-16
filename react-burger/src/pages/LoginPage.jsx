import { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import LoginForm from "../components/LoginForm/LoginForm";
import styles from "./pages.module.css";


const LoginPage = () => {
    const [form, setForm] = useState({ email: "", password: "" });
    const { isLoggedIn } = useSelector((store) => store.auth);

    if (isLoggedIn) {
        return <Navigate to={"/"} />;
    }

    return (
        <div className={styles.main}>
            <LoginForm form={form} setForm={setForm} />
        </div>
    )
}

export default LoginPage;
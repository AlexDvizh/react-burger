import { useState } from "react";
import LoginForm from "../components/LoginForm/LoginForm";


const LoginPage = () => {
    const [form, setForm] = useState({ email: "", password: "" });

    return (
        
        <div className={"auth"}>
            <LoginForm form={form} setForm={setForm} />
        </div>
        
    )
}

export default LoginPage;
import { useState } from "react";
import RegisterForm from "../components/RegisterForm/RegisterForm";


const RegisterPage = () => {
  const [form, setForm] = useState({ email: "", password: "", name: "" });
  
  return (
    <div className={"auth"}>
      <RegisterForm form={form} setForm={setForm} />
    </div>
  );
}

export default RegisterPage;


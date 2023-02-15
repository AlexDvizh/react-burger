import { useState } from "react";
import ResetPasswordForm from "../components/ResetPasswordForm/ResetPasswordForm";


const ResetPasswordPage = () => {
  const [form, setForm] = useState({ password: "", code: "" });

  return (
    <div className={"auth"}>
      <ResetPasswordForm form={form} setForm={setForm} />
    </div>
  );
}

export default ResetPasswordPage;
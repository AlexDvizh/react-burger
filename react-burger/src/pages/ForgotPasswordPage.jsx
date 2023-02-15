import { useState } from "react";
import ForgotPasswordForm from "../components/ForgotPasswordForm/ForgotPasswordForm";


const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");

  return (
    <div className={"auth"}>
      <ForgotPasswordForm email={email} setEmail={setEmail} />
    </div>
  );
}

export default ForgotPasswordPage;
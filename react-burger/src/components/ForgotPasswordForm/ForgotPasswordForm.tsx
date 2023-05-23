import React, { useState } from "react";
import { Button, EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "../../pages/pages.module.css";
import { resetPasswordRequest } from "../../utils/api";
  
const ForgotPasswordForm = () => {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(event.target.value);
    };

    const submitForm = async (event: React.FormEvent) => {
      event.preventDefault();
      await resetPasswordRequest<{ success: boolean }>(email)
      .then((res) => {
        if (res.success)
          return navigate("/reset-password", { state: { resetPassword: true } });
        if (!res.success) return Promise.reject(res);
      })
      .catch((err) => Promise.reject(err));
    };

    return (
      <form onSubmit={submitForm}>
        <h1 className="text text_type_main-medium">
          Восстановление пароля
        </h1>
        <div className="mt-6">
          <EmailInput 
            value={email} 
            onChange={onChange}
            placeholder={"Укажите e-mail"}
            name={"email"}
            isIcon={false}
          />
        </div>
        <div className={`mt-6 ${styles.button}`}>
          <Button htmlType="button" type="primary" size="large">
            Восстановить
          </Button>
        </div>
        <p className="mt-20 text text_type_main-default text_color_inactive">
          Вспомнили пароль?{" "}
          <NavLink className={styles.link} to="/login">
            Войти
          </NavLink>
        </p>
      </form>
    );
}

// const InputEmail = (email: string, setEmail: any) => {
//   const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setEmail(event.target.value);
//   };

//   return (
//     <EmailInput
//       onChange={onChange}
//       placeholder={"Укажите e-mail"}
//       value={email}
//       name={"email"}
//       isIcon={false}
//     />
//   );
// }

export default ForgotPasswordForm;
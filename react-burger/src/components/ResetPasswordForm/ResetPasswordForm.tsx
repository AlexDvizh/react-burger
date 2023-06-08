import { Button, PasswordInput, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import styles from "../../pages/pages.module.css";
import { resetPasswordConfirm } from "../../utils/api";
import useForm from "../../utils/hooks/useForm";
  
function ResetPasswordForm(): JSX.Element {
  const navigate = useNavigate();
  const { form, handleChange } = useForm({ password: "", token: "" });

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(event);
  };

  const submitForm = async (event: React.FormEvent) => {
    event.preventDefault();
    resetPasswordConfirm(form)
      .then((res: any) => {
        if (res.success) return navigate("/login");
        if (!res.success) return Promise.reject(res);
      })
      .catch((err) => Promise.reject(err));
  };

    return (
      <form onSubmit={submitForm}>
        <h1 className="text text_type_main-medium">Восстановление пароля</h1>
        <div className="mt-6">
          <PasswordInput
          onChange={onChange}
          value={form.password}
          name={"password"}
          placeholder={"Введите новый пароль"}
        />
        </div>
        <div className="mt-6">
          <Input
            type={"text"}
            placeholder={"Введите код из письма"}
            onChange={onChange}
            value={form.token}
            name={"token"}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
          />
        </div>
        <div className={`mt-6 ${styles.button}`}>
          <Button htmlType="button" type="primary" size="large">
            Сохранить
          </Button>
        </div>
        <p className="mt-20 text text_type_main-default text_color_inactive">
          Вспомнили пароль?{" "}
          <a className={"auth_link"} href="/login">
            Войти
          </a>
        </p>
      </form>
    );
};

// const InputPassword = (props) => {
//   const onChange = (event) => {
//     props.setForm((currentState) => {
//       const newState = {
//         ...currentState,
//         password: event.target.value,
//       };
//       return newState;
//     });
//   };

//   return (
//     <PasswordInput
//       onChange={onChange}
//       value={props.form.password}
//       name={"password"}
//       placeholder={"Введите новый пароль"}
//     />
//   );
// }

// const InputCode = (props) => {
//   const onChange = (event) => {
//     props.setForm((currentState) => {
//       const newState = {
//         ...currentState,
//         code: event.target.value,
//       };
//       return newState;
//     });
//   };

//   return (
//     <Input
//       type={"text"}
//       placeholder={"Введите код из письма"}
//       onChange={onChange}
//       value={props.form.code}
//       name={"code"}
//       error={false}
//       errorText={"Ошибка"}
//       size={"default"}
//     />
//   );
// }

export default ResetPasswordForm;
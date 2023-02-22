import { Button, PasswordInput, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import styles from "../../pages/pages.module.css";
import { resetPasswordConfirm } from "../../utils/api";
  
const ResetPasswordForm = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    !location?.state?.resetPassword && navigate("/forgot-password")
  }, [location.state, navigate])

  const submitForm = (event) => {
    event.preventDefault();
    resetPasswordConfirm(props.form)
    .then((res) => {
      if (res.success) return navigate("/login");
      if (!res.success) return Promise.reject(res);
    })
    .catch((err) => Promise.reject(err));
  };

    return (
      <form onSubmit={submitForm}>
        <h1 className="text text_type_main-medium">Восстановление пароля</h1>
        <div className="mt-6">
          <InputPassword form={props.form} setForm={props.setForm} />
        </div>
        <div className="mt-6">
          <InputCode form={props.form} setForm={props.setForm} />
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

const InputPassword = (props) => {
  const onChange = (event) => {
    props.setForm((currentState) => {
      const newState = {
        ...currentState,
        password: event.target.value,
      };
      return newState;
    });
  };

  return (
    <PasswordInput
      onChange={onChange}
      value={props.form.password}
      name={"password"}
      placeholder={"Введите новый пароль"}
    />
  );
}

const InputCode = (props) => {
  const onChange = (event) => {
    props.setForm((currentState) => {
      const newState = {
        ...currentState,
        code: event.target.value,
      };
      return newState;
    });
  };

  return (
    <Input
      type={"text"}
      placeholder={"Введите код из письма"}
      onChange={onChange}
      value={props.form.code}
      name={"code"}
      error={false}
      errorText={"Ошибка"}
      size={"default"}
    />
  );
}

export default ResetPasswordForm;
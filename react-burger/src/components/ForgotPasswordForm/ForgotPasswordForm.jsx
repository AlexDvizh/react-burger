import { Button, EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "../../pages/pages.module.css";
import { resetPasswordRequest } from "../../utils/api";
  
const ForgotPasswordForm = (props) => {
    const navigate = useNavigate();

    const submitForm = async (event) => {
      event.preventDefault();
      await resetPasswordRequest(props.email)
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
          <InputEmail email={props.email} setEmail={props.setEmail} />
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

const InputEmail = (props) => {
  const onChange = (event) => {
    props.setEmail(event.target.value);
  };

  return (
    <EmailInput
      onChange={onChange}
      placeholder={"Укажите e-mail"}
      value={props.email}
      name={"email"}
      isIcon={false}
    />
  );
}

export default ForgotPasswordForm;
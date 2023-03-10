import { Button, PasswordInput, EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from "react-redux";
import { login } from "../../services/actions/authentication";
import styles from "../../pages/pages.module.css";
import { NavLink } from "react-router-dom";
  
const LoginForm = (props) => {
    const dispatch = useDispatch();
    const submitForm = (event) => {
      event.preventDefault();
    
      dispatch(login(props.form));
    };

    return (
      <form onSubmit={submitForm}>
        <h1 className="text text_type_main-medium">Вход</h1>
        <div className="mt-6">
          <InputEmail form={props.form} setForm={props.setForm} />
        </div>
        <div className="mt-6">
          <InputPassword form={props.form} setForm={props.setForm} />
        </div>
        <div className={`mt-6 ${styles.button}`}>
          <Button htmlType="submit" type="primary" size="large">
            Войти
          </Button>
        </div>
        <p className={`mt-20 text text_type_main-default text_color_inactive ${styles.text}`}>
          Вы новый пользователь?{" "}
          <NavLink className={styles.link} to="/register">
            Зарегистрироваться
          </NavLink>
        </p>
        <p className={`mt-4 text text_type_main-default text_color_inactive ${styles.text}`}>
          Забыли пароль?{" "}
          <NavLink className={styles.link} to="/forgot-password">
            Восстановите пароль
          </NavLink>
        </p>
      </form>
    );
}

const InputEmail = (props) => {
  const onChange = (event) => {
    props.setForm((currentState) => {
      const newState = {
        ...currentState,
        email: event.target.value,
      };
      return newState;
    });
  };

  return (
    <EmailInput
      onChange={onChange}
      value={props.form.email}
      name={"email"}
      isIcon={false}
    />
  );
}

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
    />
  );
}

export default LoginForm;
import { Button, PasswordInput, EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { login } from "../../services/actions/authentication";
import styles from "../../pages/pages.module.css";
import { NavLink } from "react-router-dom";
import useForm from "../../utils/hooks/useForm";
import { useAppDispatch } from "../../services/hooks";
  
const LoginForm = () => {
    const dispatch = useAppDispatch();
    const { form, handleChange } = useForm({ email: "", password: "" });

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      handleChange(e);
    }

    const submitForm = (event:React.FormEvent) => {
      event.preventDefault();
      //@ts-ignore
      dispatch(login(props.form));
    };

    return (
      <form onSubmit={submitForm}>
        <h1 className="text text_type_main-medium">Вход</h1>
        <div className="mt-6">
          <EmailInput 
            onChange={onChange}
            value={form.email}
            name={"email"}
            isIcon={false}
          />
        </div>
        <div className="mt-6">
          <PasswordInput
            onChange={onChange}
            value={form.password}
            name={"password"}
          />
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

export default LoginForm;
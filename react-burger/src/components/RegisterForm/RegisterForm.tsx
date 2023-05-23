import {
  Button, PasswordInput,
  EmailInput, Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from "react-redux";
import { register } from "../../services/actions/authentication";
import styles from "../../pages/pages.module.css";
import { NavLink } from "react-router-dom";
import useForm from "../../utils/hooks/useForm";

function RegisterForm(): JSX.Element {
  const dispatch = useDispatch();
  const { form, handleChange } = useForm({ email: "", password: "", name: "" });

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    handleChange(event);
  };

  const submitForm = (event: React.FormEvent) => {
    event.preventDefault();
    //@ts-ignore
    dispatch(register(form));
  };

  return (
    <form method="POST" action="/login" onSubmit={submitForm}>
      <h1 className="text text_type_main-medium">
        Регистрация
      </h1>
      <div className="mt-6">
        <Input
          type={"text"}
          placeholder={"Имя"}
          onChange={onChange}
          value={form.name}
          name={"name"}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
        />
      </div>
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
        <Button htmlType="button" type="primary" size="large" onClick={submitForm}>
          Зарегистрироваться
        </Button>
      </div>
      <p className="mt-20 text text_type_main-default text_color_inactive">
        Уже зарегистрированы?{" "}
        <NavLink className={styles.link} to="/login">
          Войти
        </NavLink>
      </p>
    </form>
  );
}

export default RegisterForm;
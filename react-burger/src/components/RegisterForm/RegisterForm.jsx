import {
  Button, PasswordInput,
  EmailInput, Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from "react-redux";
import { register } from "../../services/actions/authentication";
import styles from "../../pages/pages.module.css";

const RegisterForm = (props) => {
  const dispatch = useDispatch();

  const submitForm = (event) => {
    event.preventDefault();

    dispatch(register(props.form));
  };

  return (
    <form method="POST" action="/login">
      <h1 className="text text_type_main-medium">
        Регистрация
      </h1>
      <div className="mt-6">
        <InputName form={props.form} setForm={props.setForm} />
      </div>
      <div className="mt-6">
        <InputEmail form={props.form} setForm={props.setForm} />
      </div>
      <div className="mt-6">
        <InputPassword form={props.form} setForm={props.setForm} />
      </div>
      <div className={`mt-6 ${styles.button}`}>
        <Button htmlType="button" type="primary" size="large" onClick={submitForm}>
          Зарегистрироваться
        </Button>
      </div>
      <p className="mt-20 text text_type_main-default text_color_inactive">
        Уже зарегистрированы?{" "}
        <a className={styles.link} href="/login">
          Войти
        </a>
      </p>
    </form>
  );
}

function InputName(props) {
  const onChange = (event) => {
    props.setForm((currentState) => {
      const newState = {
        ...currentState,
        name: event.target.value,
      };
      return newState;
    });
  };

  return (
    <Input
      type={"text"}
      placeholder={"Имя"}
      onChange={onChange}
      value={props.form.name}
      name={"name"}
      error={false}
      errorText={"Ошибка"}
      size={"default"}
    />
  );
}

function InputEmail(props) {
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

export default RegisterForm;
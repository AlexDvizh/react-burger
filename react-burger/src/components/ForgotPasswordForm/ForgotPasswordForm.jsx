import { Button, EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from "react-redux";
import styles from "../../pages/pages.module.css";
import { register } from "../../services/actions/authentication";
  
const ForgotPasswordForm = (props) => {
    const dispatch = useDispatch();
    const submitForm = (event) => {
      event.preventDefault();
      // dispatch(register(props.email));
    };

    return (
      <form method="POST" action="/login">
        <h1 className="text text_type_main-medium">
          Восстановление пароля
        </h1>
        <div className="mt-6">
          <InputEmail email={props.email} setEmail={props.setEmail} />
        </div>
        <div className={`mt-6 ${styles.button}`}>
          <Button htmlType="button" type="primary" size="large" onClick={submitForm}>
            Восстановить
          </Button>
        </div>
        <p className="mt-20 text text_type_main-default text_color_inactive">
          Вспомнили пароль?{" "}
          <a className={styles.link} href="/login">
            Войти
          </a>
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
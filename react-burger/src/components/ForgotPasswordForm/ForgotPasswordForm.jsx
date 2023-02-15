import { Button, EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
  
const ForgotPasswordForm = (props) => {
    const onChange = (event) => {
      props.setEmail(event.target.value);
    };
    
    return (
      <form method="POST" action="/login">
        <h1 className="text text_type_main-medium">Восстановление пароля</h1>
        <div className="mt-6">
          <EmailInput
            onChange={onChange}
            placeholder={"Укажите e-mail"}
            value={props.email}
            name={"email"}
            isIcon={false}
          />
        </div>
        <div className="mt-6">
          <Button htmlType="button" type="primary" size="large">
            Восстановить
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
}

export default ForgotPasswordForm;
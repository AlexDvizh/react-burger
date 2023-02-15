import { Button, PasswordInput, EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
  
const LoginForm = (props) => {
    const onChange = (event) => {
      props.setForm((currentState) => {
        const newState = {
          ...currentState,
          [event.target.name]: event.target.value,
        };
        return newState;
      });
    };

    return (
      <form>
        <h1 className="text text_type_main-medium">Вход</h1>
        <div className="mt-6">
          <EmailInput
            onChange={onChange}
            value={props.form.email}
            name={"email"}
            isIcon={false}
          />
        </div>
        <div className="mt-6">
          <PasswordInput
            onChange={onChange}
            value={props.form.password}
            name={"password"}
          />
        </div>
        <div className="mt-6">
          <Button htmlType="button" type="primary" size="large">
            Войти
          </Button>
        </div>
        <p className="mt-20 text text_type_main-default text_color_inactive">
          Вы новый пользователь?{" "}
          <a className={"auth_link"} href="/register">
            Зарегистрироваться
          </a>
        </p>
        <p className="mt-4 text text_type_main-default text_color_inactive">
          Забыли пароль?{" "}
          <a className={"auth_link"} href="/forgot-password">
            Восстановите пароль
          </a>
        </p>
      </form>
    );
}

export default LoginForm;
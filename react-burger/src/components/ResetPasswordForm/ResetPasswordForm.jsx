import { Button, PasswordInput, Input } from "@ya.praktikum/react-developer-burger-ui-components";
  
const ResetPasswordForm = (props) => {
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
      <form method="POST" action="/login">
        <h1 className="text text_type_main-medium">Восстановление пароля</h1>
        <div className="mt-6">
          <PasswordInput
            onChange={onChange}
            value={props.form.password}
            name={"password"}
            placeholder={"Введите новый пароль"}
          />
        </div>
        <div className="mt-6">
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
        </div>
        <div className="mt-6">
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

export default ResetPasswordForm;
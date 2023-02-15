import {
  Button, PasswordInput,
  EmailInput, Input,
} from "@ya.praktikum/react-developer-burger-ui-components";

const RegisterForm = (props) => {
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
      <h1 className="text text_type_main-medium">Регистрация</h1>
      <div className="mt-6">
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
      </div>
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
          Зарегистрироваться
        </Button>
      </div>
      <p className="mt-20 text text_type_main-default text_color_inactive">
        Уже зарегистрированы?{" "}
        <a className={"auth_link"} href="/login">
          Войти
        </a>
      </p>
    </form>
  );
}

export default RegisterForm;
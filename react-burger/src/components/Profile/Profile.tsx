import { EmailInput, PasswordInput, Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useRef } from "react";
import { updateUser } from "../../services/actions/user";
import styles from "./profile.module.css";
import { RootState } from "../../services/reducers";
import useForm from "../../utils/hooks/useForm";
import { useAppDispatch, useAppSelector } from "../../services/hooks";

  
function Profile(): JSX.Element {
  const dispatch = useAppDispatch();
  const user = useAppSelector((store: RootState) => store.user.user);
  const [showButtons, setShowButtons] = useState(false);
  const [passwordChanged, setPasswordChanged] = useState(false);
  
  const { form, handleChange, setForm } = useForm({
    name: user.username,
    email: user.email,
    password: "",
  });

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === "password") {
      setPasswordChanged(true);
    }
    handleChange(event);
    setShowButtons(true);
  };

  const handleCancel = () => {
    setForm({
      name: user.username,
      email: user.email,
      password: "********",
    });
    setShowButtons(false);
    setPasswordChanged(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordChanged) {
      //@ts-ignore
      dispatch(updateUser({ name: form.name, email: form.email }));
    } else {
      //@ts-ignore
      dispatch(updateUser(form));
    }
    setShowButtons(false);
    setPasswordChanged(false);
  };

  const [inputIsActive, setInputIsActive] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const onIconClick = () => {
    setTimeout(() => inputRef.current!.focus(), 0);
    setInputIsActive(true);
  };
  
    return (
      <form className={styles.profile} onSubmit={handleSubmit}>
        <div>
          <Input
            value={form.name}
            name={"name"}
            placeholder="Имя"
            icon="EditIcon"
            error={false}
            onChange={onChange}
            onIconClick={onIconClick}
            onBlur={() => setInputIsActive(false)}
            disabled={!inputIsActive}
            ref={inputRef}
          />
        </div>
        <div className="mt-6">
          <EmailInput
            value={form.email}
            name={"email"}
            placeholder="Логин"
            isIcon={true}
            onChange={onChange}
          />
        </div>
        <div className="mt-6 mb-6">
          <PasswordInput
            value={form.password}
            name={"password"}
            icon="EditIcon"
            onChange={onChange}
          />
        </div>
        {showButtons && (
          <div>
            <Button htmlType="button" type="secondary" size="medium" onClick={handleCancel}>
              Отмена
            </Button>
            <Button htmlType="submit" type="primary" size="medium">
              Сохранить
            </Button>
          </div>
        )}
      </form>
    );
}

export default Profile;
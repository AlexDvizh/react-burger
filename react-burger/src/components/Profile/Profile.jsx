import { EmailInput, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../../services/actions/user";
import styles from "./profile.module.css";

  
const Profile = ({ form, setForm }) => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user.user);

  useEffect(() => {
    setForm({ ...form, name: user.username, email: user.email });
  }, [user, setForm]);

  const onChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const submitForm = (event) => {
    event.preventDefault();
    dispatch(updateUser(form));
  };
  
    return (
      <form className={styles.profile}>
        <div>
          <EmailInput
            value={form.name}
            name={"name"}
            placeholder="Имя"
            isIcon={true}
            error={false}
            onChange={onChange}
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
        <div>
          <Button htmlType="button" type="secondary" size="medium">
            Отмена
          </Button>
          <Button htmlType="button" type="primary" size="medium" onSubmit={submitForm}>
            Сохранить
          </Button>
        </div>
      </form>
    );
}

export default Profile;
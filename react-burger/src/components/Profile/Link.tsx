import { useDispatch } from "react-redux";
import styles from "./profile.module.css";
import { NavLink } from "react-router-dom";

function ProfileLink({ name }: { name: string }): JSX.Element | null {
  const dispatch = useDispatch();
  const handleLogout = () => {
    //@ts-ignore
    dispatch(logout());
  };

  const active = `${styles.profile_link} ${styles.active}`;
  const inactive = `${styles.profile_link}`;

  switch (name) {
    case "Профиль":
      return (
        <li className={styles.list_item}>
          <NavLink
            className={({ isActive }) => (isActive ? active : inactive)}
            to={"/profile"}
            end
          >
            {name}
          </NavLink>
        </li>
      );
    case "История заказов":
      return (
        <li className={styles.list_item}>
          <NavLink
            className={({ isActive }) => (isActive ? active : inactive)}
            to={"orders"}
          >
            {name}
          </NavLink>
        </li>
      );
    case "Выход":
      return (
        <li className={styles.list_item} onClick={handleLogout}>
          <NavLink
            className={({ isActive }) => (isActive ? active : inactive)}
            to={"/"}
          >
            {name}
          </NavLink>
        </li>
      );
    default:
      return null;
  }
}

export default ProfileLink;
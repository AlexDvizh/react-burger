import ProfileLink from "./Link";
import styles from "./profile.module.css";

function ProfileNavigation(): JSX.Element {

  return (
    <section className={styles.profileNavigation}>
      <ul className="mr-15 text text_type_main-medium">
        <ProfileLink name={"Профиль"}/>
        <ProfileLink name={"История заказов"}/>
        <ProfileLink name={"Выход"}/>
      </ul>
      <p className="mt-20 text text_type_main-default text_color_inactive">
        В этом разделе вы можете изменить свои персональные данные
      </p>
    </section>
  );
}

export default ProfileNavigation;
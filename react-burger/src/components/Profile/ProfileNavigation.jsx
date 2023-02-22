import { useState } from "react";
import ProfileLink from "./Link";
import styles from "./profile.module.css";

const ProfileNavigation = () => {
  const active = "Профиль";

  return (
    <section className={styles.profileNavigation}>
      <ul className="mr-15 text text_type_main-medium">
        <ProfileLink name={"Профиль"} active={active} />
        <ProfileLink name={"История заказов"} active={active} />
        <ProfileLink name={"Выход"} active={active} />
      </ul>
      <p className="mt-20 text text_type_main-default text_color_inactive">
        В этом разделе вы можете изменить свои персональные данные
      </p>
    </section>
  );
}

export default ProfileNavigation;
import { useState } from "react";
import Profile from "../components/Profile/Profile";
import ProfileNavigation from "../components/Profile/ProfileNavigation";
import styles from "./pages.module.css";

const ProfilePage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "*******",
  });

  return (
    <div className={styles.mainProfile}>
      <ProfileNavigation />
      <Profile form={form} setForm={setForm}/>
    </div>
  );
}

export default ProfilePage;
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Profile from "../components/Profile/Profile";
import ProfileNavigation from "../components/Profile/ProfileNavigation";
import styles from "./pages.module.css";

const ProfilePage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "*******",
  });
  const { isLoggedIn } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  });

  return (
    <div className={styles.mainProfile}>
      <ProfileNavigation />
      <Profile form={form} setForm={setForm}/>
    </div>
  );
}

export default ProfilePage;
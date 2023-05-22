import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Profile from "../components/Profile/Profile";
import ProfileNavigation from "../components/Profile/ProfileNavigation";
import styles from "./pages.module.css";
import { RootState } from "../services/reducers";

function ProfilePage(): JSX.Element {
  // const { isLoggedIn } = useSelector((store: RootState) => store.auth);
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (!isLoggedIn) {
  //     navigate("/login");
  //   }
  // });

  return (
    <div className={styles.mainProfile}>
      <ProfileNavigation />
      <Profile />
    </div>
  );
}

export default ProfilePage;
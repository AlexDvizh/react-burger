import Profile from "../components/Profile/Profile";
import ProfileNavigation from "../components/Profile/ProfileNavigation";
import styles from "./pages.module.css";


function ProfilePage(): JSX.Element {

  return (
    <div className={styles.mainProfile}>
      <ProfileNavigation />
      <Profile />
    </div>
  );
}

export default ProfilePage;
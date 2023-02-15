import { ProfileNavigation } from "../components/profile/profile-navigation";
import { ProfileInfo } from "../components/profile/profile-info";
import styles from "./pages.module.css";

const ProfilePage = () => {
  return (
    <div className={styles.mainProfile}>
      <ProfileNavigation />
      <ProfileInfo />
    </div>
  );
}

export default ProfilePage;
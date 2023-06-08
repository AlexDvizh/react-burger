import { Outlet } from "react-router-dom";

import styles from "./pages.module.css";

import ProfileNavigation from "../components/Profile/ProfileNavigation";

export function ProfileSharedLayout(): JSX.Element {
  return (
    <main className={`${styles.profile_shared_main} "mt-30"`}>
      <ProfileNavigation />
      <Outlet />
    </main>
  );
}
import { Outlet } from "react-router-dom";

import "./profile-shared-layout.module.css";

import ProfileNavigation from "../components/Profile/ProfileNavigation";

export function ProfileSharedLayout(): JSX.Element {
  return (
    <main className="mt-30">
      <ProfileNavigation />
      <Outlet />
    </main>
  );
}
import { useUserProfile } from "./hooks/useUserProfile";
import { DEFAULT_PROFILE } from "./types";
import NotLoggedIn from "./components/NotLoggedIn";
import ProfileHeader from "./components/ProfileHeader";
import ProfileInfo from "./components/ProfileInfo";
import StatusCard from "./components/StatusCard";
import QuickActions from "./components/QuickActions";

const UserProfilePage = () => {
  const { user } = useUserProfile();

  if (!user) {
    return <NotLoggedIn />;
  }

  const profile = user.profile || DEFAULT_PROFILE;
  const verificationStatus = profile.verification_status;

  return (
    <div className="min-vh-100 bg-gradient-secondary py-5">
      <div className="container" style={{ maxWidth: "900px" }}>
        <ProfileHeader user={user} />
        <ProfileInfo user={user} />
        <StatusCard verificationStatus={verificationStatus} />
        <QuickActions />
      </div>
    </div>
  );
};

export default UserProfilePage;


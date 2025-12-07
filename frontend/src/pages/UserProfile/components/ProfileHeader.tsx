import { UserProfile, DEFAULT_PROFILE } from "../types";
import { getRoleIcon } from "../utils";

interface ProfileHeaderProps {
  user: UserProfile;
}

const ProfileHeader = ({ user }: ProfileHeaderProps) => {
  const profile = user.profile || DEFAULT_PROFILE;
  const role = profile.role_display;

  return (
    <div className="card border-0 shadow-sm rounded-xl p-5 mb-4 text-center">
      <div
        className="d-inline-block p-4 rounded-circle mb-4"
        style={{
          fontSize: "80px",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
        }}
      >
        {getRoleIcon(role)}
      </div>
      <h1 className="display-5 fw-bold text-dark mb-2">
        {user.username}
      </h1>
      <p className="text-muted mb-0">
        {user.email || "未设置邮箱"}
      </p>
    </div>
  );
};

export default ProfileHeader;


import { UserProfile, DEFAULT_PROFILE } from "../types";

interface ProfileInfoProps {
  user: UserProfile;
}

const ProfileInfo = ({ user }: ProfileInfoProps) => {
  const profile = user.profile || DEFAULT_PROFILE;
  return (
    <div className="row g-4 mb-4">
      <div className="col-md-6">
        <div className="card border-0 shadow-sm rounded-xl p-4 h-100">
          <h3 className="h5 fw-bold text-dark mb-4 d-flex align-items-center">
            <span className="me-2">📋</span>
            基本信息
          </h3>
          <div>
            <div className="mb-3">
              <div className="small text-muted mb-1">用户ID</div>
              <div className="fw-medium text-dark">#{user.id}</div>
            </div>
            <div className="mb-3">
              <div className="small text-muted mb-1">用户名</div>
              <div className="fw-medium text-dark">{user.username}</div>
            </div>
            <div>
              <div className="small text-muted mb-1">邮箱</div>
              <div className="fw-medium text-dark">{user.email || "未设置"}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-md-6">
        <div className="card border-0 shadow-sm rounded-xl p-4 h-100">
          <h3 className="h5 fw-bold text-dark mb-4 d-flex align-items-center">
            <span className="me-2">🎭</span>
            角色与认证
          </h3>
          <div className="mb-3">
            <div className="small text-muted mb-1">用户角色</div>
            <div className="h5 text-primary fw-semibold mb-0">
              {profile.role_display}
            </div>
          </div>
          <div>
            <div className="small text-muted mb-1">认证状态</div>
            <span className="badge rounded-pill px-3 py-2" style={{ fontSize: "14px" }}>
              {profile.verification_status_display}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;


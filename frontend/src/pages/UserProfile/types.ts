export interface UserProfileData {
  role: string;
  role_display: string;
  verification_status: string;
  verification_status_display: string;
}

export interface UserProfile {
  id: number;
  username: string;
  email: string;
  profile?: UserProfileData;
}

export const DEFAULT_PROFILE: UserProfileData = {
  role: "patient",
  role_display: "患者",
  verification_status: "unverified",
  verification_status_display: "未认证",
};


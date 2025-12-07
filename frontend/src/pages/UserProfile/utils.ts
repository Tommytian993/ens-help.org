export const getStatusStyle = (status: string) => {
  switch (status) {
    case "verified":
      return {
        color: "#28a745",
        backgroundColor: "#d4edda",
        borderColor: "#c3e6cb",
      };
    case "pending":
      return {
        color: "#856404",
        backgroundColor: "#fff3cd",
        borderColor: "#ffeaa7",
      };
    case "unverified":
    default:
      return {
        color: "#6c757d",
        backgroundColor: "#e9ecef",
        borderColor: "#dee2e6",
      };
  }
};

export const getStatusMessage = (status: string): string => {
  switch (status) {
    case "verified":
      return "✅ 您的身份已通过认证，可以享受所有平台功能";
    case "pending":
      return "⏳ 您的认证材料正在审核中，请耐心等待";
    case "unverified":
    default:
      return "📝 您尚未提交认证材料，如需认证请上传相关材料";
  }
};

export const getRoleIcon = (role: string): string => {
  switch (role) {
    case "认证医生":
      return "👨‍⚕️";
    case "管理员":
      return "👑";
    default:
      return "👤";
  }
};


import { ReactNode } from "react";

interface AuthCardProps {
  icon: string;
  title: string;
  subtitle: string;
  children: ReactNode;
}

const AuthCard = ({ icon, title, subtitle, children }: AuthCardProps) => {
  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-gradient-primary position-relative overflow-hidden p-4">
      {/* 背景装饰动画 */}
      <div className="bg-pattern" />

      {/* 卡片 */}
      <div className="w-100 glass-card rounded-xl shadow-xl position-relative z-1 animate-slide-up" style={{ maxWidth: "420px", padding: "40px" }}>
        {/* 标题区域 */}
        <div className="text-center mb-5">
          <div className="icon-lg mb-3 text-gradient">
            {icon}
          </div>
          <h1 className="mb-2 fw-bold text-dark" style={{ fontSize: "32px" }}>
            {title}
          </h1>
          <p className="mb-0 text-muted small">
            {subtitle}
          </p>
        </div>

        {children}
      </div>
    </div>
  );
};

export default AuthCard;


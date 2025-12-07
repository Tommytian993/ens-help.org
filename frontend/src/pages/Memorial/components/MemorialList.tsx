import { Memorial } from "../types";
import MemorialCard from "./MemorialCard";

interface MemorialListProps {
  memorials: Memorial[];
  user: any;
}

const MemorialList = ({ memorials, user }: MemorialListProps) => {
  if (memorials.length === 0) {
    return (
      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          borderRadius: "20px",
          padding: "60px",
          textAlign: "center",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
        }}
      >
        <div style={{ fontSize: "64px", marginBottom: "20px" }}>🕯️</div>
        <h3 style={{ color: "#666", marginBottom: "10px" }}>
          还没有纪念记录
        </h3>
        <p style={{ color: "#999" }}>
          {user
            ? '点击"添加纪念"按钮添加纪念记录'
            : "请先登录以添加纪念记录"}
        </p>
      </div>
    );
  }

  return (
    <div style={{ display: "grid", gap: "20px" }}>
      {memorials.map((memorial) => (
        <MemorialCard key={memorial.id} memorial={memorial} />
      ))}
    </div>
  );
};

export default MemorialList;


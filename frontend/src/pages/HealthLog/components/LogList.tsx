import { HealthLog } from "../types";
import LogCard from "./LogCard";

interface LogListProps {
  logs: HealthLog[];
  onDelete: (id: number) => void;
}

const LogList = ({ logs, onDelete }: LogListProps) => {
  if (logs.length === 0) {
    return (
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "20px",
          padding: "60px",
          textAlign: "center",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div style={{ fontSize: "64px", marginBottom: "20px" }}>📝</div>
        <h3 style={{ color: "#666", marginBottom: "10px" }}>
          还没有健康记录
        </h3>
        <p style={{ color: "#999" }}>
          点击"添加记录"按钮开始记录您的健康数据
        </p>
      </div>
    );
  }

  return (
    <div style={{ display: "grid", gap: "20px" }}>
      {logs.map((log) => (
        <LogCard key={log.id} log={log} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default LogList;


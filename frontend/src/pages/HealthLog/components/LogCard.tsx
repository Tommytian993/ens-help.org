import { HealthLog } from "../types";

interface LogCardProps {
  log: HealthLog;
  onDelete: (id: number) => void;
}

const LogCard = ({ log, onDelete }: LogCardProps) => {
  const getSeverityColor = (severity: number) => {
    if (severity >= 7)
      return "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)";
    if (severity >= 4)
      return "linear-gradient(135deg, #ffd89b 0%, #19547b 100%)";
    return "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)";
  };

  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: "20px",
        padding: "30px",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
        transition: "all 0.3s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-5px)";
        e.currentTarget.style.boxShadow =
          "0 15px 40px rgba(0, 0, 0, 0.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.1)";
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "15px",
        }}
      >
        <div>
          <div
            style={{
              fontSize: "14px",
              color: "#999",
              marginBottom: "5px",
            }}
          >
            {new Date(log.date).toLocaleDateString("zh-CN", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
          <div
            style={{
              display: "inline-block",
              padding: "4px 12px",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: "600",
              background: getSeverityColor(log.severity),
              color: "white",
            }}
          >
            严重程度: {log.severity}/10
          </div>
        </div>
        <button
          onClick={() => log.id && onDelete(log.id)}
          style={{
            background: "none",
            border: "none",
            fontSize: "20px",
            cursor: "pointer",
            padding: "5px",
          }}
        >
          🗑️
        </button>
      </div>
      <div style={{ marginBottom: "10px" }}>
        <strong style={{ color: "#333" }}>症状：</strong>
        <p
          style={{
            color: "#666",
            margin: "5px 0",
            lineHeight: "1.6",
          }}
        >
          {log.symptoms}
        </p>
      </div>
      {log.notes && (
        <div>
          <strong style={{ color: "#333" }}>备注：</strong>
          <p
            style={{
              color: "#666",
              margin: "5px 0",
              lineHeight: "1.6",
            }}
          >
            {log.notes}
          </p>
        </div>
      )}
    </div>
  );
};

export default LogCard;


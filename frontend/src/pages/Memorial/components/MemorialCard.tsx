import { Memorial } from "../types";

interface MemorialCardProps {
  memorial: Memorial;
}

const MemorialCard = ({ memorial }: MemorialCardProps) => {
  return (
    <div
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        borderRadius: "20px",
        padding: "30px",
        boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
        transition: "all 0.3s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-5px)";
        e.currentTarget.style.boxShadow =
          "0 25px 70px rgba(0, 0, 0, 0.4)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 20px 60px rgba(0, 0, 0, 0.3)";
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <div style={{ fontSize: "48px", marginRight: "20px" }}>🕯️</div>
        <div>
          <h3
            style={{
              fontSize: "24px",
              fontWeight: "700",
              color: "#333",
              margin: 0,
              marginBottom: "5px",
            }}
          >
            {memorial.name}
          </h3>
          <div
            style={{
              fontSize: "14px",
              color: "#999",
            }}
          >
            {new Date(memorial.date).toLocaleDateString("zh-CN", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        </div>
      </div>
      <p
        style={{
          color: "#666",
          lineHeight: "1.8",
          fontSize: "16px",
          marginBottom: "15px",
        }}
      >
        {memorial.message}
      </p>
      <div
        style={{
          fontSize: "14px",
          color: "#999",
          textAlign: "right",
        }}
      >
        — {memorial.author}
      </div>
    </div>
  );
};

export default MemorialCard;


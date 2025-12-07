interface HealthLogHeaderProps {
  showForm: boolean;
  onToggleForm: () => void;
}

const HealthLogHeader = ({
  showForm,
  onToggleForm,
}: HealthLogHeaderProps) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "30px",
      }}
    >
      <div>
        <h1
          style={{
            fontSize: "36px",
            fontWeight: "700",
            color: "#333",
            marginBottom: "10px",
          }}
        >
          📊 健康日志
        </h1>
        <p style={{ color: "#666", fontSize: "16px" }}>
          记录您的健康数据，追踪症状变化
        </p>
      </div>
      <button
        onClick={onToggleForm}
        style={{
          padding: "14px 28px",
          background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
          color: "white",
          border: "none",
          borderRadius: "12px",
          fontSize: "16px",
          fontWeight: "600",
          cursor: "pointer",
          boxShadow: "0 4px 15px rgba(240, 147, 251, 0.4)",
          transition: "all 0.3s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-2px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
        }}
      >
        {showForm ? "取消" : "+ 添加记录"}
      </button>
    </div>
  );
};

export default HealthLogHeader;


interface MemorialHeaderProps {
  user: any;
  showForm: boolean;
  onToggleForm: () => void;
}

const MemorialHeader = ({
  user,
  showForm,
  onToggleForm,
}: MemorialHeaderProps) => {
  return (
    <>
      <div
        style={{
          textAlign: "center",
          marginBottom: "40px",
          color: "white",
        }}
      >
        <div style={{ fontSize: "64px", marginBottom: "20px" }}>🕯️</div>
        <h1
          style={{
            fontSize: "48px",
            fontWeight: "700",
            marginBottom: "10px",
            textShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
          }}
        >
          纪念园
        </h1>
        <p style={{ fontSize: "18px", opacity: 0.9 }}>
          纪念逝去的患者，表达我们的敬意和怀念
        </p>
      </div>

      {user && (
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <button
            onClick={onToggleForm}
            style={{
              padding: "14px 28px",
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              backdropFilter: "blur(10px)",
              color: "white",
              border: "2px solid rgba(255, 255, 255, 0.3)",
              borderRadius: "12px",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.3)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            {showForm ? "取消" : "+ 添加纪念"}
          </button>
        </div>
      )}
    </>
  );
};

export default MemorialHeader;


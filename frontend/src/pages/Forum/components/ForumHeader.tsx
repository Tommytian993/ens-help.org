interface ForumHeaderProps {
  user: any;
  showForm: boolean;
  onToggleForm: () => void;
}

const ForumHeader = ({ user, showForm, onToggleForm }: ForumHeaderProps) => {
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
          💬 患者论坛
        </h1>
        <p style={{ color: "#666", fontSize: "16px" }}>
          与其他患者交流经验，分享治疗心得
        </p>
      </div>
      {user && (
        <button
          onClick={onToggleForm}
          style={{
            padding: "14px 28px",
            background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
            color: "white",
            border: "none",
            borderRadius: "12px",
            fontSize: "16px",
            fontWeight: "600",
            cursor: "pointer",
            boxShadow: "0 4px 15px rgba(79, 172, 254, 0.4)",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          {showForm ? "取消" : "+ 发布帖子"}
        </button>
      )}
    </div>
  );
};

export default ForumHeader;

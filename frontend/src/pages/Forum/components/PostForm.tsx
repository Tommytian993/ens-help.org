interface PostFormProps {
  formData: { title: string; content: string };
  onFormDataChange: (data: { title: string; content: string }) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

const PostForm = ({
  formData,
  onFormDataChange,
  onSubmit,
  onCancel,
}: PostFormProps) => {
  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: "20px",
        padding: "30px",
        marginBottom: "30px",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
        animation: "slideDown 0.3s ease-out",
      }}
    >
      <h2 style={{ marginTop: 0, marginBottom: "20px", color: "#333" }}>
        发布新帖子
      </h2>
      <form onSubmit={onSubmit}>
        <div style={{ marginBottom: "20px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              color: "#333",
              fontWeight: "500",
            }}
          >
            标题
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) =>
              onFormDataChange({ ...formData, title: e.target.value })
            }
            placeholder="请输入帖子标题"
            style={{
              width: "100%",
              padding: "12px",
              border: "2px solid #e0e0e0",
              borderRadius: "12px",
              fontSize: "16px",
              outline: "none",
              boxSizing: "border-box",
            }}
            required
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              color: "#333",
              fontWeight: "500",
            }}
          >
            内容
          </label>
          <textarea
            value={formData.content}
            onChange={(e) =>
              onFormDataChange({ ...formData, content: e.target.value })
            }
            placeholder="请输入帖子内容..."
            style={{
              width: "100%",
              padding: "12px",
              border: "2px solid #e0e0e0",
              borderRadius: "12px",
              fontSize: "16px",
              outline: "none",
              minHeight: "150px",
              resize: "vertical",
              boxSizing: "border-box",
            }}
            required
          />
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <button
            type="submit"
            style={{
              flex: 1,
              padding: "14px",
              background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
              color: "white",
              border: "none",
              borderRadius: "12px",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            发布
          </button>
          <button
            type="button"
            onClick={onCancel}
            style={{
              padding: "14px 24px",
              background: "#e0e0e0",
              color: "#333",
              border: "none",
              borderRadius: "12px",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            取消
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;

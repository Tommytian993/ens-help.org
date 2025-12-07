import { Memorial } from "../types";

interface MemorialFormProps {
  formData: Memorial;
  onFormDataChange: (data: Memorial) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

const MemorialForm = ({
  formData,
  onFormDataChange,
  onSubmit,
  onCancel,
}: MemorialFormProps) => {
  return (
    <div
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        borderRadius: "20px",
        padding: "30px",
        marginBottom: "30px",
        boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
        animation: "slideDown 0.3s ease-out",
      }}
    >
      <h2 style={{ marginTop: 0, marginBottom: "20px", color: "#333" }}>
        添加纪念
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
            姓名
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) =>
              onFormDataChange({ ...formData, name: e.target.value })
            }
            placeholder="请输入姓名"
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
            日期
          </label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) =>
              onFormDataChange({ ...formData, date: e.target.value })
            }
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
            纪念留言
          </label>
          <textarea
            value={formData.message}
            onChange={(e) =>
              onFormDataChange({ ...formData, message: e.target.value })
            }
            placeholder="请输入您的纪念留言..."
            style={{
              width: "100%",
              padding: "12px",
              border: "2px solid #e0e0e0",
              borderRadius: "12px",
              fontSize: "16px",
              outline: "none",
              minHeight: "120px",
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
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
              border: "none",
              borderRadius: "12px",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            提交纪念
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

export default MemorialForm;


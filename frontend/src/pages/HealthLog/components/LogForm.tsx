import { HealthLog } from "../types";

interface LogFormProps {
  formData: HealthLog;
  onFormDataChange: (data: HealthLog) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

const LogForm = ({
  formData,
  onFormDataChange,
  onSubmit,
  onCancel,
}: LogFormProps) => {
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
        新增健康记录
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
            症状描述
          </label>
          <textarea
            value={formData.symptoms}
            onChange={(e) =>
              onFormDataChange({ ...formData, symptoms: e.target.value })
            }
            placeholder="请描述您的症状..."
            style={{
              width: "100%",
              padding: "12px",
              border: "2px solid #e0e0e0",
              borderRadius: "12px",
              fontSize: "16px",
              outline: "none",
              minHeight: "100px",
              resize: "vertical",
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
            严重程度: {formData.severity}/10
          </label>
          <input
            type="range"
            min="1"
            max="10"
            value={formData.severity}
            onChange={(e) =>
              onFormDataChange({
                ...formData,
                severity: parseInt(e.target.value),
              })
            }
            style={{ width: "100%" }}
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
            备注
          </label>
          <textarea
            value={formData.notes}
            onChange={(e) =>
              onFormDataChange({ ...formData, notes: e.target.value })
            }
            placeholder="其他备注信息..."
            style={{
              width: "100%",
              padding: "12px",
              border: "2px solid #e0e0e0",
              borderRadius: "12px",
              fontSize: "16px",
              outline: "none",
              minHeight: "80px",
              resize: "vertical",
              boxSizing: "border-box",
            }}
          />
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <button
            type="submit"
            style={{
              flex: 1,
              padding: "14px",
              background:
                "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
              color: "white",
              border: "none",
              borderRadius: "12px",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            保存记录
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

export default LogForm;


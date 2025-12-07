import { Resource } from "../types";

interface ResourceFormProps {
  formData: Resource;
  onFormDataChange: (data: Resource) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const ResourceForm = ({
  formData,
  onFormDataChange,
  onSubmit,
}: ResourceFormProps) => {
  return (
    <div className="card border-0 shadow-sm rounded-xl p-4 mb-4 animate-fade-in-down">
      <h2 className="h4 fw-bold text-dark mb-4">添加资料</h2>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label className="form-label fw-medium text-dark">
            标题 <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className="form-control form-control-custom"
            value={formData.title}
            onChange={(e) =>
              onFormDataChange({ ...formData, title: e.target.value })
            }
            placeholder="请输入资料标题"
            required
          />
        </div>

        <div className="row g-3 mb-3">
          <div className="col-md-4">
            <label className="form-label fw-medium text-dark">
              作者 <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control form-control-custom"
              value={formData.author}
              onChange={(e) =>
                onFormDataChange({ ...formData, author: e.target.value })
              }
              placeholder="请输入作者"
              required
            />
          </div>

          <div className="col-md-4">
            <label className="form-label fw-medium text-dark">
              类型 <span className="text-danger">*</span>
            </label>
            <select
              className="form-select form-control-custom"
              value={formData.type}
              onChange={(e) =>
                onFormDataChange({
                  ...formData,
                  type: e.target.value as Resource["type"],
                })
              }
              required
            >
              <option value="文献">文献</option>
              <option value="指南">指南</option>
              <option value="视频">视频</option>
              <option value="其他">其他</option>
            </select>
          </div>

          <div className="col-md-4">
            <label className="form-label fw-medium text-dark">日期</label>
            <input
              type="date"
              className="form-control form-control-custom"
              value={formData.date}
              onChange={(e) =>
                onFormDataChange({ ...formData, date: e.target.value })
              }
            />
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label fw-medium text-dark">
            描述 <span className="text-danger">*</span>
          </label>
          <textarea
            className="form-control form-control-custom"
            value={formData.description}
            onChange={(e) =>
              onFormDataChange({ ...formData, description: e.target.value })
            }
            placeholder="请输入资料描述"
            rows={4}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-medium text-dark">链接</label>
          <input
            type="url"
            className="form-control form-control-custom"
            value={formData.link}
            onChange={(e) =>
              onFormDataChange({ ...formData, link: e.target.value })
            }
            placeholder="https://example.com"
          />
        </div>

        <div className="mb-4">
          <label className="form-label fw-medium text-dark">标签（用逗号分隔）</label>
          <input
            type="text"
            className="form-control form-control-custom"
            value={formData.tags.join(", ")}
            onChange={(e) =>
              onFormDataChange({
                ...formData,
                tags: e.target.value.split(",").map((tag) => tag.trim()),
              })
            }
            placeholder="ENS, 诊断, 治疗"
          />
        </div>

        <button
          type="submit"
          className="w-100 btn btn-lg rounded-3 fw-semibold btn-hover-lift text-white border-0"
          style={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            padding: "14px",
          }}
        >
          提交资料
        </button>
      </form>
    </div>
  );
};

export default ResourceForm;


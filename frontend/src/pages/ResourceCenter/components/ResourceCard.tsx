import { Resource } from "../types";
import { getTypeColor, getTypeIcon } from "../utils";

interface ResourceCardProps {
  resource: Resource;
  user: any;
  onDelete: (id: number) => void;
}

const ResourceCard = ({ resource, user, onDelete }: ResourceCardProps) => {
  return (
    <div className="card border-0 shadow-sm rounded-xl p-4 card-hover">
      <div className="d-flex justify-content-between align-items-start mb-3">
        <div className="flex-grow-1">
          <div className="d-flex align-items-center gap-3 mb-3">
            <div
              className="d-inline-block p-2 rounded-3"
              style={{
                fontSize: "32px",
                background: getTypeColor(resource.type),
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
              }}
            >
              {getTypeIcon(resource.type)}
            </div>
            <span
              className="badge rounded-pill px-3 py-2"
              style={{
                fontSize: "14px",
                fontWeight: "600",
                background: getTypeColor(resource.type),
              }}
            >
              {resource.type}
            </span>
          </div>
          <h3 className="h4 fw-bold text-dark mb-3">
            {resource.title}
          </h3>
          <div className="d-flex align-items-center gap-3 mb-3 text-muted small flex-wrap">
            <span>👤 {resource.author}</span>
            {resource.date && (
              <span>
                📅{" "}
                {new Date(resource.date).toLocaleDateString("zh-CN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            )}
          </div>
        </div>
        {user && (
          <button
            className="btn btn-link text-danger p-2"
            onClick={() => resource.id && onDelete(resource.id)}
            style={{ fontSize: "20px" }}
          >
            🗑️
          </button>
        )}
      </div>
      <p className="text-muted lh-lg mb-3">
        {resource.description}
      </p>
      {resource.tags && resource.tags.length > 0 && (
        <div className="d-flex gap-2 flex-wrap mb-3">
          {resource.tags.map((tag, index) => (
            <span
              key={index}
              className="badge bg-light text-dark rounded-pill px-3 py-2"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
      {resource.link && (
        <a
          href={resource.link}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-sm rounded-3 px-4 py-2 fw-semibold btn-hover-lift text-white text-decoration-none border-0"
          style={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            boxShadow: "0 2px 10px rgba(102, 126, 234, 0.3)",
          }}
        >
          查看资料 →
        </a>
      )}
    </div>
  );
};

export default ResourceCard;


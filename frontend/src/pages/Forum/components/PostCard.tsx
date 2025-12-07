import { Post, Reply } from "../types";

interface PostCardProps {
  post: Post;
  user: any;
  expandedPost: number | null;
  replyContent: { [key: number]: string };
  onExpand: (postId: number | null) => void;
  onReplyContentChange: (postId: number, content: string) => void;
  onReply: (postId: number) => void;
}

const PostCard = ({
  post,
  user,
  expandedPost,
  replyContent,
  onExpand,
  onReplyContentChange,
  onReply,
}: PostCardProps) => {
  const isExpanded = expandedPost === post.id;

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
        e.currentTarget.style.boxShadow = "0 15px 40px rgba(0, 0, 0, 0.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.1)";
      }}
    >
      <h3
        style={{
          fontSize: "24px",
          fontWeight: "700",
          color: "#333",
          marginBottom: "10px",
        }}
      >
        {post.title}
      </h3>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "15px",
          fontSize: "14px",
          color: "#999",
        }}
      >
        <span style={{ marginRight: "15px" }}>👤 {post.author}</span>
        <span>
          {new Date(post.createdAt).toLocaleDateString("zh-CN", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
      <p
        style={{
          color: "#666",
          lineHeight: "1.8",
          marginBottom: "20px",
          whiteSpace: "pre-wrap",
        }}
      >
        {post.content}
      </p>

      <div>
        <button
          onClick={() => onExpand(isExpanded ? null : post.id || null)}
          style={{
            padding: "8px 16px",
            background: "none",
            border: "2px solid #4facfe",
            color: "#4facfe",
            borderRadius: "8px",
            fontSize: "14px",
            fontWeight: "600",
            cursor: "pointer",
            marginBottom: "15px",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#4facfe";
            e.currentTarget.style.color = "white";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "none";
            e.currentTarget.style.color = "#4facfe";
          }}
        >
          {isExpanded ? "收起" : "回复"} ({post.replies?.length || 0})
        </button>

        {isExpanded && (
          <div style={{ marginTop: "20px" }}>
            {post.replies && post.replies.length > 0 && (
              <div style={{ marginBottom: "20px" }}>
                {post.replies.map((reply) => (
                  <div
                    key={reply.id}
                    style={{
                      padding: "15px",
                      backgroundColor: "#f8f9fa",
                      borderRadius: "12px",
                      marginBottom: "10px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "8px",
                      }}
                    >
                      <strong style={{ color: "#333" }}>{reply.author}</strong>
                      <span style={{ fontSize: "12px", color: "#999" }}>
                        {new Date(reply.createdAt).toLocaleDateString("zh-CN")}
                      </span>
                    </div>
                    <p
                      style={{
                        color: "#666",
                        margin: 0,
                        lineHeight: "1.6",
                      }}
                    >
                      {reply.content}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {user && (
              <div>
                <textarea
                  value={replyContent[post.id || 0] || ""}
                  onChange={(e) =>
                    onReplyContentChange(post.id || 0, e.target.value)
                  }
                  placeholder="写下您的回复..."
                  style={{
                    width: "100%",
                    padding: "12px",
                    border: "2px solid #e0e0e0",
                    borderRadius: "12px",
                    fontSize: "14px",
                    outline: "none",
                    minHeight: "80px",
                    resize: "vertical",
                    boxSizing: "border-box",
                    marginBottom: "10px",
                  }}
                />
                <button
                  onClick={() => post.id && onReply(post.id)}
                  disabled={!replyContent[post.id || 0]?.trim()}
                  style={{
                    padding: "10px 20px",
                    background: replyContent[post.id || 0]?.trim()
                      ? "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
                      : "#ccc",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    fontSize: "14px",
                    fontWeight: "600",
                    cursor: replyContent[post.id || 0]?.trim()
                      ? "pointer"
                      : "not-allowed",
                  }}
                >
                  发送回复
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostCard;

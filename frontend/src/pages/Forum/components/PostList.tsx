import { Post } from "../types";
import PostCard from "./PostCard";

interface PostListProps {
  posts: Post[];
  user: any;
  expandedPost: number | null;
  replyContent: { [key: number]: string };
  onExpand: (postId: number | null) => void;
  onReplyContentChange: (postId: number, content: string) => void;
  onReply: (postId: number) => void;
}

const PostList = ({
  posts,
  user,
  expandedPost,
  replyContent,
  onExpand,
  onReplyContentChange,
  onReply,
}: PostListProps) => {
  if (posts.length === 0) {
    return (
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "20px",
          padding: "60px",
          textAlign: "center",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div style={{ fontSize: "64px", marginBottom: "20px" }}>💬</div>
        <h3 style={{ color: "#666", marginBottom: "10px" }}>还没有帖子</h3>
        <p style={{ color: "#999" }}>
          {user ? '点击"发布帖子"按钮开始讨论' : "请先登录以发布帖子"}
        </p>
      </div>
    );
  }

  return (
    <div style={{ display: "grid", gap: "20px" }}>
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          user={user}
          expandedPost={expandedPost}
          replyContent={replyContent}
          onExpand={onExpand}
          onReplyContentChange={onReplyContentChange}
          onReply={onReply}
        />
      ))}
    </div>
  );
};

export default PostList;

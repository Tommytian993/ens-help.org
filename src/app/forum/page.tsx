"use client";

import { useState } from "react";
import Link from "next/link";

interface Post {
  id: number;
  title: string;
  category: string;
  content: string;
  author: string;
  authorAvatar: string;
  publishTime: string;
  views: number;
  likes: number;
  replies: number;
  tags: string[];
  isLiked: boolean;
}

interface Reply {
  id: number;
  postId: number;
  author: string;
  content: string;
  publishTime: string;
}

export default function ForumPage() {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      title: "我的 ENS 手术治疗经历分享",
      category: "treatment",
      content:
        "大家好，我想分享一下我的 ENS 手术治疗经历。手术是在北京某三甲医院进行的，主刀医生经验丰富。手术过程大约3小时，术后恢复期需要特别注意鼻腔护理。现在术后已经6个月了，症状有明显改善，但还需要继续观察。",
      author: "勇敢的小明",
      authorAvatar: "勇",
      publishTime: "2024-01-15 14:30",
      views: 156,
      likes: 23,
      replies: 8,
      tags: ["手术", "治疗经验", "北京"],
      isLiked: false,
    },
    {
      id: 2,
      title: "鼻塞严重，求助保守治疗方法",
      category: "qa",
      content:
        "最近鼻塞症状越来越严重，特别是晚上睡觉时。想问问大家有没有什么保守治疗的方法？我已经尝试了盐水冲洗，但效果不明显。医生建议手术，但我还是有些担心。",
      author: "迷茫的患者",
      authorAvatar: "迷",
      publishTime: "2024-01-14 09:15",
      views: 89,
      likes: 12,
      replies: 15,
      tags: ["鼻塞", "保守治疗", "求助"],
      isLiked: false,
    },
    {
      id: 3,
      title: "ENS 患者互助群，欢迎大家加入",
      category: "support",
      content:
        "我们建立了一个 ENS 患者互助群，群里有经验丰富的患者和家属，大家可以互相交流治疗经验，分享生活心得。群内氛围很好，大家都很友善。有需要的朋友可以私信我。",
      author: "热心志愿者",
      authorAvatar: "热",
      publishTime: "2024-01-13 16:45",
      views: 234,
      likes: 45,
      replies: 12,
      tags: ["互助群", "交流", "支持"],
      isLiked: true,
    },
  ]);

  const [replies] = useState<Reply[]>([
    {
      id: 1,
      postId: 1,
      author: "经验分享者",
      content: "感谢分享！请问手术费用大概多少？",
      publishTime: "2024-01-15 16:20",
    },
    {
      id: 2,
      postId: 1,
      author: "同病相怜",
      content: "我也在考虑手术，能详细说说恢复过程吗？",
      publishTime: "2024-01-15 18:45",
    },
  ]);

  const [currentCategory, setCurrentCategory] = useState("all");
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [showPostDetailModal, setShowPostDetailModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [newPost, setNewPost] = useState({
    title: "",
    category: "",
    content: "",
    tags: "",
  });

  const categoryNames = {
    treatment: "治疗经验",
    symptoms: "症状讨论",
    support: "情感支持",
    qa: "问答求助",
    news: "最新资讯",
  };

  const filteredPosts = posts.filter((post) => {
    const matchesCategory =
      currentCategory === "all" || post.category === currentCategory;
    const matchesSearch =
      !searchTerm ||
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );
    return matchesCategory && matchesSearch;
  });

  const handleLike = (postId: number) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              likes: post.likes + (post.isLiked ? -1 : 1),
            }
          : post
      )
    );
  };

  const handleNewPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPost.title && newPost.category && newPost.content) {
      const post: Post = {
        id: Date.now(),
        title: newPost.title,
        category: newPost.category,
        content: newPost.content,
        author: "当前用户",
        authorAvatar: "用",
        publishTime: new Date().toLocaleString("zh-CN"),
        views: 0,
        likes: 0,
        replies: 0,
        tags: newPost.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag),
        isLiked: false,
      };
      setPosts([post, ...posts]);
      setNewPost({ title: "", category: "", content: "", tags: "" });
      setShowNewPostModal(false);
    }
  };

  const showPostDetail = (post: Post) => {
    setSelectedPost(post);
    setShowPostDetailModal(true);
  };

  const postReplies = selectedPost
    ? replies.filter((reply) => reply.postId === selectedPost.id)
    : [];

  return (
    <div>
      <div className="header">
        <h1>💬 ENS 患者论坛</h1>
        <p>分享经验，互相支持，共同面对 ENS</p>
        <div className="nav-links">
          <Link href="/" className="nav-link">
            🗺️ 诊所地图
          </Link>
          <Link href="/memorial" className="nav-link">
            🕯️ 纪念园
          </Link>
          <Link href="/health-log" className="nav-link">
            📊 健康日志
          </Link>
        </div>
      </div>

      <div className="container">
        {/* 论坛统计 */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "20px",
            marginBottom: "30px",
          }}
        >
          {[
            { number: posts.length, label: "总帖子数", icon: "📝" },
            { number: 89, label: "注册用户", icon: "👥" },
            {
              number: Math.floor(Math.random() * 20) + 5,
              label: "在线用户",
              icon: "🟢",
            },
            {
              number: posts.filter(
                (post) =>
                  new Date(post.publishTime).toDateString() ===
                  new Date().toDateString()
              ).length,
              label: "今日新帖",
              icon: "📅",
            },
          ].map((stat, index) => (
            <div
              key={index}
              style={{
                background: "rgba(255, 255, 255, 0.9)",
                backdropFilter: "blur(10px)",
                borderRadius: "15px",
                padding: "25px",
                textAlign: "center",
                boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.3s ease",
              }}
            >
              <div style={{ fontSize: "2.5em", marginBottom: "10px" }}>
                {stat.icon}
              </div>
              <div
                style={{
                  fontSize: "2.5em",
                  fontWeight: "bold",
                  color: "#42a5f5",
                  marginBottom: "10px",
                }}
              >
                {stat.number}
              </div>
              <div style={{ color: "#666", fontSize: "1em" }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* 快速操作 */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "30px",
            flexWrap: "wrap",
            gap: "15px",
          }}
        >
          <button
            className="btn btn-primary"
            onClick={() => setShowNewPostModal(true)}
          >
            ✍️ 发布新帖
          </button>
          <div
            style={{ display: "flex", gap: "10px", flex: 1, minWidth: "300px" }}
          >
            <input
              type="text"
              placeholder="搜索帖子、用户或关键词..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                flex: 1,
                padding: "12px 15px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                fontSize: "14px",
                background: "white",
              }}
            />
            <button className="btn btn-secondary">🔍</button>
          </div>
        </div>

        {/* 分类导航 */}
        <div
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "30px",
            flexWrap: "wrap",
          }}
        >
          {[
            { key: "all", label: "全部" },
            { key: "treatment", label: "治疗经验" },
            { key: "symptoms", label: "症状讨论" },
            { key: "support", label: "情感支持" },
            { key: "qa", label: "问答求助" },
            { key: "news", label: "最新资讯" },
          ].map((category) => (
            <button
              key={category.key}
              className={`btn btn-secondary ${
                currentCategory === category.key ? "active" : ""
              }`}
              onClick={() => setCurrentCategory(category.key)}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* 帖子列表 */}
        <div
          style={{
            background: "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(10px)",
            borderRadius: "15px",
            boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
            overflow: "hidden",
          }}
        >
          {filteredPosts.length === 0 ? (
            <div
              style={{ textAlign: "center", padding: "40px", color: "#666" }}
            >
              <div style={{ fontSize: "3em", marginBottom: "20px" }}>📝</div>
              <h3>暂无帖子</h3>
              <p>成为第一个发布帖子的人吧！</p>
            </div>
          ) : (
            filteredPosts.map((post) => (
              <div
                key={post.id}
                style={{
                  padding: "20px",
                  borderBottom: "1px solid #eee",
                  transition: "background-color 0.3s ease",
                  cursor: "pointer",
                }}
                onClick={() => showPostDetail(post)}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "10px",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: "1.2em",
                        fontWeight: "bold",
                        color: "#333",
                        marginBottom: "5px",
                        lineHeight: "1.4",
                      }}
                    >
                      {post.title}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        gap: "15px",
                        fontSize: "0.9em",
                        color: "#666",
                        flexWrap: "wrap",
                      }}
                    >
                      <span
                        style={{
                          background: "#e3f2fd",
                          color: "#1976d2",
                          padding: "2px 8px",
                          borderRadius: "12px",
                          fontSize: "0.8em",
                        }}
                      >
                        {
                          categoryNames[
                            post.category as keyof typeof categoryNames
                          ]
                        }
                      </span>
                      <span>👤 {post.author}</span>
                      <span>🕒 {post.publishTime}</span>
                      <span>👁️ {post.views} 次浏览</span>
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    color: "#555",
                    lineHeight: "1.6",
                    marginBottom: "15px",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {post.content}
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: "8px",
                    flexWrap: "wrap",
                    marginBottom: "15px",
                  }}
                >
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        background: "#f0f0f0",
                        color: "#666",
                        padding: "2px 8px",
                        borderRadius: "10px",
                        fontSize: "0.8em",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: "15px",
                      fontSize: "0.9em",
                      color: "#666",
                    }}
                  >
                    <span>💬 {post.replies} 回复</span>
                  </div>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <button
                      className={`action-btn ${post.isLiked ? "liked" : ""}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLike(post.id);
                      }}
                      style={{
                        padding: "5px 10px",
                        border: "1px solid #ddd",
                        borderRadius: "15px",
                        background: post.isLiked ? "#ff6b6b" : "white",
                        color: post.isLiked ? "white" : "#666",
                        cursor: "pointer",
                        fontSize: "0.8em",
                        transition: "all 0.3s ease",
                      }}
                    >
                      {post.isLiked ? "❤️" : "🤍"} {post.likes}
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* 发布新帖模态框 */}
      {showNewPostModal && (
        <div className="modal show">
          <div className="modal-content">
            <div className="modal-header">
              <h2>发布新帖</h2>
              <span
                className="close"
                onClick={() => setShowNewPostModal(false)}
              >
                &times;
              </span>
            </div>
            <form onSubmit={handleNewPost}>
              <div className="form-group">
                <label htmlFor="postTitle">标题 *</label>
                <input
                  type="text"
                  id="postTitle"
                  value={newPost.title}
                  onChange={(e) =>
                    setNewPost({ ...newPost, title: e.target.value })
                  }
                  required
                  placeholder="请输入帖子标题..."
                />
              </div>
              <div className="form-group">
                <label htmlFor="postCategory">分类 *</label>
                <select
                  id="postCategory"
                  value={newPost.category}
                  onChange={(e) =>
                    setNewPost({ ...newPost, category: e.target.value })
                  }
                  required
                >
                  <option value="">请选择分类</option>
                  <option value="treatment">治疗经验</option>
                  <option value="symptoms">症状讨论</option>
                  <option value="support">情感支持</option>
                  <option value="qa">问答求助</option>
                  <option value="news">最新资讯</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="postContent">内容 *</label>
                <textarea
                  id="postContent"
                  value={newPost.content}
                  onChange={(e) =>
                    setNewPost({ ...newPost, content: e.target.value })
                  }
                  required
                  placeholder="分享你的经验、问题或想法..."
                  rows={6}
                />
              </div>
              <div className="form-group">
                <label htmlFor="postTags">标签（用逗号分隔）</label>
                <input
                  type="text"
                  id="postTags"
                  value={newPost.tags}
                  onChange={(e) =>
                    setNewPost({ ...newPost, tags: e.target.value })
                  }
                  placeholder="例如：手术,保守治疗,鼻塞"
                />
              </div>
              <div className="form-actions">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowNewPostModal(false)}
                >
                  取消
                </button>
                <button type="submit" className="btn btn-primary">
                  发布帖子
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 帖子详情模态框 */}
      {showPostDetailModal && selectedPost && (
        <div className="modal show">
          <div className="modal-content" style={{ maxWidth: "800px" }}>
            <div className="modal-header">
              <h2>{selectedPost.title}</h2>
              <span
                className="close"
                onClick={() => setShowPostDetailModal(false)}
              >
                &times;
              </span>
            </div>
            <div style={{ padding: "20px 0" }}>
              <div
                style={{
                  borderBottom: "1px solid #eee",
                  paddingBottom: "20px",
                  marginBottom: "20px",
                }}
              >
                <div
                  style={{
                    fontSize: "1.5em",
                    fontWeight: "bold",
                    color: "#333",
                    marginBottom: "10px",
                  }}
                >
                  {selectedPost.title}
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: "15px",
                    fontSize: "0.9em",
                    color: "#666",
                    flexWrap: "wrap",
                  }}
                >
                  <span
                    style={{
                      background: "#e3f2fd",
                      color: "#1976d2",
                      padding: "2px 8px",
                      borderRadius: "12px",
                      fontSize: "0.8em",
                    }}
                  >
                    {
                      categoryNames[
                        selectedPost.category as keyof typeof categoryNames
                      ]
                    }
                  </span>
                  <span>👤 {selectedPost.author}</span>
                  <span>🕒 {selectedPost.publishTime}</span>
                  <span>👁️ {selectedPost.views} 次浏览</span>
                  <span>💬 {selectedPost.replies} 回复</span>
                </div>
              </div>

              <div
                style={{
                  color: "#555",
                  lineHeight: "1.8",
                  marginBottom: "20px",
                  whiteSpace: "pre-wrap",
                }}
              >
                {selectedPost.content}
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  flexWrap: "wrap",
                  marginBottom: "20px",
                }}
              >
                {selectedPost.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      background: "#f0f0f0",
                      color: "#666",
                      padding: "2px 8px",
                      borderRadius: "10px",
                      fontSize: "0.8em",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div style={{ borderTop: "1px solid #eee", paddingTop: "20px" }}>
                <h4>回复 ({postReplies.length})</h4>
                {postReplies.map((reply) => (
                  <div
                    key={reply.id}
                    style={{
                      padding: "15px 0",
                      borderBottom: "1px solid #f0f0f0",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "10px",
                      }}
                    >
                      <span style={{ fontWeight: "bold", color: "#333" }}>
                        {reply.author}
                      </span>
                      <span style={{ fontSize: "0.9em", color: "#666" }}>
                        {reply.publishTime}
                      </span>
                    </div>
                    <div style={{ color: "#555", lineHeight: "1.6" }}>
                      {reply.content}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

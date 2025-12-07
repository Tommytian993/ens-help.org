import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Post, Reply } from "../types";

export const useForum = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: "", content: "" });
  const [expandedPost, setExpandedPost] = useState<number | null>(null);
  const [replyContent, setReplyContent] = useState<{ [key: number]: string }>(
    {}
  );

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      setUser(JSON.parse(userStr));
    }
    const savedPosts = localStorage.getItem("forumPosts");
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      navigate("/login");
      return;
    }
    const newPost: Post = {
      ...formData,
      id: Date.now(),
      author: user.username,
      createdAt: new Date().toISOString(),
      replies: [],
    };
    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);
    localStorage.setItem("forumPosts", JSON.stringify(updatedPosts));
    setFormData({ title: "", content: "" });
    setShowForm(false);
  };

  const handleReply = (postId: number) => {
    if (!user) {
      navigate("/login");
      return;
    }
    const reply: Reply = {
      id: Date.now(),
      content: replyContent[postId] || "",
      author: user.username,
      createdAt: new Date().toISOString(),
    };
    const updatedPosts = posts.map((post) =>
      post.id === postId
        ? { ...post, replies: [...(post.replies || []), reply] }
        : post
    );
    setPosts(updatedPosts);
    localStorage.setItem("forumPosts", JSON.stringify(updatedPosts));
    setReplyContent({ ...replyContent, [postId]: "" });
  };

  return {
    user,
    posts,
    showForm,
    setShowForm,
    formData,
    setFormData,
    expandedPost,
    setExpandedPost,
    replyContent,
    setReplyContent,
    handleSubmit,
    handleReply,
  };
};

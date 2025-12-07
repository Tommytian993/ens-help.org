import { useForum } from "./hooks/useForum";
import ForumHeader from "./components/ForumHeader";
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";

const ForumPage = () => {
  const {
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
  } = useForum();

  return (
    <div className="min-vh-100 bg-gradient-secondary py-5">
      <div className="container" style={{ maxWidth: "1000px" }}>
        <ForumHeader
          user={user}
          showForm={showForm}
          onToggleForm={() => setShowForm(!showForm)}
        />

        {showForm && user && (
          <div className="animate-fade-in-down">
            <PostForm
              formData={formData}
              onFormDataChange={setFormData}
              onSubmit={handleSubmit}
              onCancel={() => setShowForm(false)}
            />
          </div>
        )}

        <PostList
          posts={posts}
          user={user}
          expandedPost={expandedPost}
          replyContent={replyContent}
          onExpand={setExpandedPost}
          onReplyContentChange={(postId, content) =>
            setReplyContent({ ...replyContent, [postId]: content })
          }
          onReply={handleReply}
        />
      </div>
    </div>
  );
};

export default ForumPage;


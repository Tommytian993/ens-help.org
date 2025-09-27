// ENS 患者论坛 JavaScript

// 论坛数据
let forumData = {
  posts: [
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
    {
      id: 4,
      title: "最新 ENS 研究进展分享",
      category: "news",
      content:
        "最近看到一篇关于 ENS 的最新研究论文，研究人员发现了一些新的治疗方向。虽然还在实验阶段，但给患者带来了新的希望。我会持续关注相关研究进展，及时分享给大家。",
      author: "医学爱好者",
      authorAvatar: "医",
      publishTime: "2024-01-12 11:20",
      views: 178,
      likes: 34,
      replies: 6,
      tags: ["研究进展", "新治疗", "希望"],
      isLiked: false,
    },
    {
      id: 5,
      title: "术后护理经验分享",
      category: "treatment",
      content:
        "手术后的护理非常重要，直接影响恢复效果。我总结了一些术后护理经验：1. 按时用药，不要随意停药；2. 保持鼻腔湿润；3. 避免剧烈运动；4. 定期复查。希望对大家有帮助。",
      author: "康复患者",
      authorAvatar: "康",
      publishTime: "2024-01-11 20:30",
      views: 145,
      likes: 28,
      replies: 9,
      tags: ["术后护理", "康复", "经验"],
      isLiked: false,
    },
    {
      id: 6,
      title: "心理支持很重要",
      category: "support",
      content:
        "ENS 不仅影响身体健康，对心理健康也有很大影响。我建议大家：1. 保持积极心态；2. 寻求专业心理帮助；3. 与家人朋友多沟通；4. 参加患者互助活动。记住，你并不孤单。",
      author: "心理辅导员",
      authorAvatar: "心",
      publishTime: "2024-01-10 15:10",
      views: 167,
      likes: 41,
      replies: 11,
      tags: ["心理支持", "心理健康", "互助"],
      isLiked: true,
    },
  ],
  replies: [
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
    {
      id: 3,
      postId: 2,
      author: "老患者",
      content: "建议先尝试中药调理，我朋友试过效果不错。",
      publishTime: "2024-01-14 10:30",
    },
  ],
};

// 当前状态
let currentCategory = "all";
let currentPage = 1;
let postsPerPage = 5;

// DOM 元素
const postsList = document.getElementById("postsList");
const newPostBtn = document.getElementById("newPostBtn");
const newPostModal = document.getElementById("newPostModal");
const newPostForm = document.getElementById("newPostForm");
const postDetailModal = document.getElementById("postDetailModal");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const categoryBtns = document.querySelectorAll(".category-btn");
const closeBtns = document.querySelectorAll(".close");
const cancelPostBtn = document.getElementById("cancelPostBtn");

// 初始化
function init() {
  renderPosts();
  bindEvents();
  updateStats();
}

// 绑定事件
function bindEvents() {
  // 发布新帖
  newPostBtn.addEventListener("click", openNewPostModal);
  cancelPostBtn.addEventListener("click", closeNewPostModal);
  newPostForm.addEventListener("submit", handleNewPost);

  // 搜索
  searchBtn.addEventListener("click", handleSearch);
  searchInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      handleSearch();
    }
  });

  // 分类筛选
  categoryBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      currentCategory = this.dataset.category;
      updateCategoryButtons();
      renderPosts();
    });
  });

  // 关闭模态框
  closeBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const modal = this.closest(".modal");
      modal.style.display = "none";
      document.body.style.overflow = "auto";
    });
  });

  // 点击模态框外部关闭
  window.addEventListener("click", function (event) {
    if (event.target.classList.contains("modal")) {
      event.target.style.display = "none";
      document.body.style.overflow = "auto";
    }
  });
}

// 渲染帖子列表
function renderPosts() {
  const filteredPosts = getFilteredPosts();
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const pagePosts = filteredPosts.slice(startIndex, endIndex);

  if (pagePosts.length === 0) {
    postsList.innerHTML = `
      <div style="text-align: center; padding: 40px; color: #666;">
        <div style="font-size: 3em; margin-bottom: 20px;">📝</div>
        <h3>暂无帖子</h3>
        <p>成为第一个发布帖子的人吧！</p>
      </div>
    `;
    return;
  }

  postsList.innerHTML = pagePosts.map((post) => createPostHTML(post)).join("");

  // 绑定帖子点击事件
  document.querySelectorAll(".post-item").forEach((item) => {
    item.addEventListener("click", function () {
      const postId = parseInt(this.dataset.postId);
      showPostDetail(postId);
    });
  });

  // 绑定点赞事件
  document.querySelectorAll(".like-btn").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      const postId = parseInt(this.dataset.postId);
      toggleLike(postId);
    });
  });
}

// 创建帖子 HTML
function createPostHTML(post) {
  const categoryNames = {
    treatment: "治疗经验",
    symptoms: "症状讨论",
    support: "情感支持",
    qa: "问答求助",
    news: "最新资讯",
  };

  return `
    <div class="post-item" data-post-id="${post.id}">
      <div class="post-header">
        <div>
          <div class="post-title">${post.title}</div>
          <div class="post-meta">
            <span class="post-category">${categoryNames[post.category]}</span>
            <span>👤 ${post.author}</span>
            <span>🕒 ${post.publishTime}</span>
            <span>👁️ ${post.views} 次浏览</span>
          </div>
        </div>
      </div>
      <div class="post-content">${post.content}</div>
      <div class="post-tags">
        ${post.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
      </div>
      <div class="post-footer">
        <div class="post-stats">
          <span>💬 ${post.replies} 回复</span>
        </div>
        <div class="post-actions">
          <button class="action-btn like-btn ${
            post.isLiked ? "liked" : ""
          }" data-post-id="${post.id}">
            ${post.isLiked ? "❤️" : "🤍"} ${post.likes}
          </button>
        </div>
      </div>
    </div>
  `;
}

// 获取筛选后的帖子
function getFilteredPosts() {
  let posts = forumData.posts;

  if (currentCategory !== "all") {
    posts = posts.filter((post) => post.category === currentCategory);
  }

  return posts.sort(
    (a, b) => new Date(b.publishTime) - new Date(a.publishTime)
  );
}

// 更新分类按钮状态
function updateCategoryButtons() {
  categoryBtns.forEach((btn) => {
    btn.classList.remove("active");
    if (btn.dataset.category === currentCategory) {
      btn.classList.add("active");
    }
  });
}

// 显示帖子详情
function showPostDetail(postId) {
  const post = forumData.posts.find((p) => p.id === postId);
  if (!post) return;

  const replies = forumData.replies.filter((r) => r.postId === postId);

  const categoryNames = {
    treatment: "治疗经验",
    symptoms: "症状讨论",
    support: "情感支持",
    qa: "问答求助",
    news: "最新资讯",
  };

  document.getElementById("postDetailTitle").textContent = post.title;
  document.getElementById("postDetailContent").innerHTML = `
    <div class="post-detail-header">
      <div class="post-detail-title">${post.title}</div>
      <div class="post-detail-meta">
        <span class="post-category">${categoryNames[post.category]}</span>
        <span>👤 ${post.author}</span>
        <span>🕒 ${post.publishTime}</span>
        <span>👁️ ${post.views} 次浏览</span>
        <span>💬 ${post.replies} 回复</span>
      </div>
    </div>
    <div class="post-detail-content">${post.content}</div>
    <div class="post-detail-tags">
      ${post.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
    </div>
    <div class="replies-section">
      <h4>回复 (${replies.length})</h4>
      ${replies
        .map(
          (reply) => `
        <div class="reply-item">
          <div class="reply-header">
            <span class="reply-author">${reply.author}</span>
            <span class="reply-time">${reply.publishTime}</span>
          </div>
          <div class="reply-content">${reply.content}</div>
        </div>
      `
        )
        .join("")}
    </div>
  `;

  postDetailModal.style.display = "block";
  document.body.style.overflow = "hidden";
}

// 切换点赞状态
function toggleLike(postId) {
  const post = forumData.posts.find((p) => p.id === postId);
  if (!post) return;

  post.isLiked = !post.isLiked;
  post.likes += post.isLiked ? 1 : -1;

  renderPosts();
}

// 处理搜索
function handleSearch() {
  const searchTerm = searchInput.value.toLowerCase().trim();
  if (!searchTerm) {
    renderPosts();
    return;
  }

  const filteredPosts = forumData.posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm) ||
      post.content.toLowerCase().includes(searchTerm) ||
      post.author.toLowerCase().includes(searchTerm) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchTerm))
  );

  if (filteredPosts.length === 0) {
    postsList.innerHTML = `
      <div style="text-align: center; padding: 40px; color: #666;">
        <div style="font-size: 3em; margin-bottom: 20px;">🔍</div>
        <h3>未找到相关帖子</h3>
        <p>尝试使用其他关键词搜索</p>
      </div>
    `;
  } else {
    postsList.innerHTML = filteredPosts
      .map((post) => createPostHTML(post))
      .join("");
  }
}

// 打开发布新帖模态框
function openNewPostModal() {
  newPostModal.style.display = "block";
  document.body.style.overflow = "hidden";
}

// 关闭发布新帖模态框
function closeNewPostModal() {
  newPostModal.style.display = "none";
  document.body.style.overflow = "auto";
  newPostForm.reset();
}

// 处理新帖发布
function handleNewPost(e) {
  e.preventDefault();

  const formData = new FormData(newPostForm);
  const newPost = {
    id: Date.now(),
    title: formData.get("title"),
    category: formData.get("category"),
    content: formData.get("content"),
    author: "当前用户",
    authorAvatar: "用",
    publishTime: new Date().toLocaleString("zh-CN"),
    views: 0,
    likes: 0,
    replies: 0,
    tags: formData
      .get("tags")
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag),
    isLiked: false,
  };

  forumData.posts.unshift(newPost);
  renderPosts();
  closeNewPostModal();
  updateStats();

  alert("帖子发布成功！");
}

// 更新统计数据
function updateStats() {
  document.getElementById("totalPosts").textContent = forumData.posts.length;
  document.getElementById("totalUsers").textContent = 89; // 模拟数据
  document.getElementById("onlineUsers").textContent =
    Math.floor(Math.random() * 20) + 5;
  document.getElementById("todayPosts").textContent = forumData.posts.filter(
    (post) =>
      new Date(post.publishTime).toDateString() === new Date().toDateString()
  ).length;
}

// 页面加载完成后初始化
document.addEventListener("DOMContentLoaded", init);


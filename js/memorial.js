// ENS 患者纪念园 JavaScript

// 纪念数据存储
let memorialData = [
  {
    id: 1,
    name: "张小明",
    age: 45,
    birthDate: "1978-03-15",
    passDate: "2023-08-20",
    location: "北京",
    message:
      "小明是一位非常勇敢的ENS患者，他从未放弃过治疗，总是鼓励其他病友。他的乐观精神感染了很多人。",
    tags: ["勇敢", "乐观", "坚强"],
    addedDate: "2023-08-25",
  },
  {
    id: 2,
    name: "李美丽",
    age: 38,
    birthDate: "1985-07-22",
    passDate: "2023-06-10",
    location: "上海",
    message:
      "美丽是一位温柔的母亲，即使在与ENS抗争的过程中，她仍然坚持照顾家人。她的爱永远留在我们心中。",
    tags: ["温柔", "母爱", "坚持"],
    addedDate: "2023-06-15",
  },
  {
    id: 3,
    name: "王大华",
    age: 52,
    birthDate: "1971-11-08",
    passDate: "2023-09-05",
    location: "广东",
    message:
      "大华是一位热心的志愿者，经常帮助其他ENS患者。他的善举让我们永远铭记。",
    tags: ["热心", "志愿者", "善良"],
    addedDate: "2023-09-10",
  },
];

// DOM 元素
const memorialGrid = document.getElementById("memorialGrid");
const emptyState = document.getElementById("emptyState");
const searchInput = document.getElementById("searchInput");
const regionFilter = document.getElementById("regionFilter");
const addMemorialBtn = document.getElementById("addMemorialBtn");
const memorialModal = document.getElementById("memorialModal");
const memorialForm = document.getElementById("memorialForm");
const closeBtn = document.querySelector(".close");
const cancelBtn = document.getElementById("cancelBtn");

// 初始化
function init() {
  renderMemorials();
  bindEvents();
}

// 绑定事件
function bindEvents() {
  searchInput.addEventListener("input", filterMemorials);
  regionFilter.addEventListener("change", filterMemorials);
  addMemorialBtn.addEventListener("click", openModal);
  closeBtn.addEventListener("click", closeModal);
  cancelBtn.addEventListener("click", closeModal);
  memorialForm.addEventListener("submit", handleSubmit);

  // 点击模态框外部关闭
  window.addEventListener("click", function (event) {
    if (event.target === memorialModal) {
      closeModal();
    }
  });
}

// 渲染纪念卡片
function renderMemorials(data = memorialData) {
  if (data.length === 0) {
    memorialGrid.style.display = "none";
    emptyState.style.display = "block";
    return;
  }

  memorialGrid.style.display = "grid";
  emptyState.style.display = "none";

  memorialGrid.innerHTML = data
    .map((memorial) => createMemorialCard(memorial))
    .join("");
}

// 创建纪念卡片
function createMemorialCard(memorial) {
  const daysSince = calculateDaysSince(memorial.passDate);
  const birthYear = new Date(memorial.birthDate).getFullYear();
  const passYear = new Date(memorial.passDate).getFullYear();

  return `
    <div class="memorial-card">
      <div class="memorial-header">
        <div class="memorial-avatar">
          ${memorial.name.charAt(0)}
        </div>
        <div class="memorial-info">
          <h3>${memorial.name}</h3>
          <div class="age">${memorial.age}岁 (${birthYear} - ${passYear})</div>
        </div>
      </div>
      
      <div class="memorial-dates">
        <div class="date-item">
          <div class="label">出生</div>
          <div class="date">${formatDate(memorial.birthDate)}</div>
        </div>
        <div class="date-item">
          <div class="label">逝世</div>
          <div class="date">${formatDate(memorial.passDate)}</div>
        </div>
      </div>
      
      <div class="memorial-message">
        "${memorial.message}"
      </div>
      
      <div class="memorial-tags">
        ${memorial.tags
          .map((tag) => `<span class="tag">${tag}</span>`)
          .join("")}
      </div>
      
      <div class="memorial-footer">
        <div class="memorial-location">📍 ${memorial.location}</div>
        <div class="memorial-days">${daysSince} 天前</div>
      </div>
    </div>
  `;
}

// 计算天数
function calculateDaysSince(date) {
  const passDate = new Date(date);
  const now = new Date();
  const diffTime = Math.abs(now - passDate);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

// 格式化日期
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("zh-CN");
}

// 筛选纪念记录
function filterMemorials() {
  const searchTerm = searchInput.value.toLowerCase();
  const selectedRegion = regionFilter.value;

  const filtered = memorialData.filter((memorial) => {
    const matchesSearch =
      !searchTerm ||
      memorial.name.toLowerCase().includes(searchTerm) ||
      memorial.message.toLowerCase().includes(searchTerm) ||
      memorial.tags.some((tag) => tag.toLowerCase().includes(searchTerm));

    const matchesRegion =
      !selectedRegion || memorial.location === selectedRegion;

    return matchesSearch && matchesRegion;
  });

  renderMemorials(filtered);
}

// 打开模态框
function openModal() {
  memorialModal.style.display = "block";
  document.body.style.overflow = "hidden";
}

// 关闭模态框
function closeModal() {
  memorialModal.style.display = "none";
  document.body.style.overflow = "auto";
  memorialForm.reset();
}

// 处理表单提交
function handleSubmit(e) {
  e.preventDefault();

  const formData = new FormData(memorialForm);
  const newMemorial = {
    id: Date.now(),
    name: formData.get("name"),
    age: parseInt(formData.get("age")) || 0,
    birthDate: formData.get("birthDate"),
    passDate: formData.get("passDate"),
    location: formData.get("location"),
    message: formData.get("message"),
    tags: formData
      .get("tags")
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag),
    addedDate: new Date().toISOString().split("T")[0],
  };

  memorialData.unshift(newMemorial);
  renderMemorials();
  closeModal();

  // 显示成功消息
  alert("纪念记录已成功添加");
}

// 页面加载完成后初始化
document.addEventListener("DOMContentLoaded", init);


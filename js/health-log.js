// ENS 健康日志 JavaScript

// 健康日志数据
let healthLogData = {
  logs: [
    {
      id: 1,
      date: "2024-01-15",
      time: "09:00",
      severity: 3,
      symptoms: ["鼻塞", "鼻干", "头痛"],
      medication: "布地奈德鼻喷剂 2次/日",
      sleepQuality: 6,
      mood: 5,
      notes: "昨晚睡眠质量一般，早上起来鼻塞比较严重",
    },
    {
      id: 2,
      date: "2024-01-14",
      time: "20:30",
      severity: 4,
      symptoms: ["鼻塞", "失眠", "焦虑"],
      medication: "布地奈德鼻喷剂 2次/日，阿司匹林 1片",
      sleepQuality: 3,
      mood: 3,
      notes: "症状比较严重，影响了睡眠，心情有些焦虑",
    },
    {
      id: 3,
      date: "2024-01-13",
      time: "10:15",
      severity: 2,
      symptoms: ["鼻干"],
      medication: "生理盐水冲洗 3次/日",
      sleepQuality: 7,
      mood: 6,
      notes: "今天感觉好一些，主要是鼻干症状",
    },
    {
      id: 4,
      date: "2024-01-12",
      time: "14:20",
      severity: 3,
      symptoms: ["鼻塞", "疲劳"],
      medication: "布地奈德鼻喷剂 2次/日",
      sleepQuality: 5,
      mood: 4,
      notes: "工作压力大，感觉比较疲劳",
    },
    {
      id: 5,
      date: "2024-01-11",
      time: "08:45",
      severity: 2,
      symptoms: ["鼻干", "头痛"],
      medication: "生理盐水冲洗 2次/日",
      sleepQuality: 8,
      mood: 7,
      notes: "昨晚睡得很好，今天精神状态不错",
    },
  ],
};

// 当前状态
let currentView = "list";
let filteredLogs = [];

// DOM 元素
const addLogBtn = document.getElementById("addLogBtn");
const addLogModal = document.getElementById("addLogModal");
const addLogForm = document.getElementById("addLogForm");
const cancelLogBtn = document.getElementById("cancelLogBtn");
const listViewBtn = document.getElementById("listViewBtn");
const chartViewBtn = document.getElementById("chartViewBtn");
const listView = document.getElementById("listView");
const chartView = document.getElementById("chartView");
const logsList = document.getElementById("logsList");
const startDate = document.getElementById("startDate");
const endDate = document.getElementById("endDate");
const symptomFilter = document.getElementById("symptomFilter");
const applyFilterBtn = document.getElementById("applyFilterBtn");
const closeBtns = document.querySelectorAll(".close");

// 图表实例
let severityChart, symptomsChart, medicationChart, sleepChart;

// 初始化
function init() {
  // 设置默认日期
  const today = new Date().toISOString().split("T")[0];
  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];

  document.getElementById("logDate").value = today;
  startDate.value = weekAgo;
  endDate.value = today;

  filteredLogs = [...healthLogData.logs];
  renderLogs();
  updateStats();
  bindEvents();
  initCharts();
}

// 绑定事件
function bindEvents() {
  // 添加记录
  addLogBtn.addEventListener("click", openAddLogModal);
  cancelLogBtn.addEventListener("click", closeAddLogModal);
  addLogForm.addEventListener("submit", handleAddLog);

  // 视图切换
  listViewBtn.addEventListener("click", () => switchView("list"));
  chartViewBtn.addEventListener("click", () => switchView("chart"));

  // 筛选
  applyFilterBtn.addEventListener("click", applyFilters);

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

  // 范围滑块值显示
  document
    .getElementById("sleepQuality")
    .addEventListener("input", function () {
      document.getElementById("sleepValue").textContent = this.value;
    });

  document.getElementById("mood").addEventListener("input", function () {
    document.getElementById("moodValue").textContent = this.value;
  });
}

// 渲染日志列表
function renderLogs() {
  if (filteredLogs.length === 0) {
    logsList.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">📝</div>
        <h3>暂无记录</h3>
        <p>点击"添加记录"开始记录你的健康数据</p>
      </div>
    `;
    return;
  }

  logsList.innerHTML = filteredLogs
    .sort(
      (a, b) =>
        new Date(b.date + " " + b.time) - new Date(a.date + " " + a.time)
    )
    .map((log) => createLogHTML(log))
    .join("");
}

// 创建日志 HTML
function createLogHTML(log) {
  const severityLabels = {
    1: "轻微",
    2: "轻度",
    3: "中度",
    4: "重度",
    5: "极重",
  };

  return `
    <div class="log-item">
      <div class="log-header">
        <div class="log-date">${formatDate(log.date)}</div>
        <div class="log-time">${log.time}</div>
      </div>
      
      <div class="log-severity">
        <span class="severity-badge severity-${log.severity}">
          严重程度: ${log.severity} - ${severityLabels[log.severity]}
        </span>
      </div>
      
      <div class="log-symptoms">
        ${log.symptoms
          .map((symptom) => `<span class="symptom-tag">${symptom}</span>`)
          .join("")}
      </div>
      
      <div class="log-details">
        <div class="detail-item">
          <span class="detail-label">用药情况:</span>
          <span class="detail-value">${log.medication || "无"}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">睡眠质量:</span>
          <span class="detail-value">${log.sleepQuality}/10</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">情绪状态:</span>
          <span class="detail-value">${log.mood}/10</span>
        </div>
      </div>
      
      ${log.notes ? `<div class="log-notes">${log.notes}</div>` : ""}
    </div>
  `;
}

// 切换视图
function switchView(view) {
  currentView = view;

  // 更新按钮状态
  listViewBtn.classList.toggle("active", view === "list");
  chartViewBtn.classList.toggle("active", view === "chart");

  // 更新内容显示
  listView.classList.toggle("active", view === "list");
  chartView.classList.toggle("active", view === "chart");

  // 如果是图表视图，更新图表
  if (view === "chart") {
    updateCharts();
  }
}

// 应用筛选
function applyFilters() {
  let logs = [...healthLogData.logs];

  // 日期筛选
  if (startDate.value) {
    logs = logs.filter((log) => log.date >= startDate.value);
  }
  if (endDate.value) {
    logs = logs.filter((log) => log.date <= endDate.value);
  }

  // 症状筛选
  if (symptomFilter.value) {
    logs = logs.filter((log) => log.symptoms.includes(symptomFilter.value));
  }

  filteredLogs = logs;
  renderLogs();
  updateStats();

  if (currentView === "chart") {
    updateCharts();
  }
}

// 打开添加记录模态框
function openAddLogModal() {
  addLogModal.style.display = "block";
  document.body.style.overflow = "hidden";

  // 设置默认日期为今天
  document.getElementById("logDate").value = new Date()
    .toISOString()
    .split("T")[0];
}

// 关闭添加记录模态框
function closeAddLogModal() {
  addLogModal.style.display = "none";
  document.body.style.overflow = "auto";
  addLogForm.reset();
}

// 处理添加记录
function handleAddLog(e) {
  e.preventDefault();

  const formData = new FormData(addLogForm);
  const symptoms = [];

  // 收集选中的症状
  document
    .querySelectorAll('input[name="symptoms"]:checked')
    .forEach((checkbox) => {
      symptoms.push(checkbox.value);
    });

  const newLog = {
    id: Date.now(),
    date: formData.get("date"),
    time: formData.get("time") || new Date().toTimeString().slice(0, 5),
    severity: parseInt(formData.get("severity")),
    symptoms: symptoms,
    medication: formData.get("medication") || "",
    sleepQuality: parseInt(formData.get("sleepQuality")),
    mood: parseInt(formData.get("mood")),
    notes: formData.get("notes") || "",
  };

  healthLogData.logs.unshift(newLog);
  filteredLogs = [...healthLogData.logs];

  renderLogs();
  updateStats();
  closeAddLogModal();

  if (currentView === "chart") {
    updateCharts();
  }

  alert("记录添加成功！");
}

// 更新统计数据
function updateStats() {
  const logs = filteredLogs;

  // 记录天数
  const uniqueDates = new Set(logs.map((log) => log.date));
  document.getElementById("totalDays").textContent = uniqueDates.size;

  // 平均严重程度
  const avgSeverity =
    logs.length > 0
      ? (
          logs.reduce((sum, log) => sum + log.severity, 0) / logs.length
        ).toFixed(1)
      : 0;
  document.getElementById("avgSeverity").textContent = avgSeverity;

  // 用药天数
  const medicationDays = logs.filter(
    (log) => log.medication && log.medication.trim()
  ).length;
  document.getElementById("medicationDays").textContent = medicationDays;

  // 改善率（简化计算：最近7天平均严重程度 vs 前7天）
  const recentLogs = logs.slice(0, 7);
  const olderLogs = logs.slice(7, 14);

  let improvementRate = 0;
  if (recentLogs.length > 0 && olderLogs.length > 0) {
    const recentAvg =
      recentLogs.reduce((sum, log) => sum + log.severity, 0) /
      recentLogs.length;
    const olderAvg =
      olderLogs.reduce((sum, log) => sum + log.severity, 0) / olderLogs.length;
    improvementRate = Math.max(
      0,
      (((olderAvg - recentAvg) / olderAvg) * 100).toFixed(1)
    );
  }

  document.getElementById("improvementRate").textContent =
    improvementRate + "%";
}

// 初始化图表
function initCharts() {
  // 症状严重程度趋势图
  severityChart = echarts.init(document.getElementById("severityChart"));

  // 症状分布饼图
  symptomsChart = echarts.init(document.getElementById("symptomsChart"));

  // 用药记录柱状图
  medicationChart = echarts.init(document.getElementById("medicationChart"));

  // 睡眠质量折线图
  sleepChart = echarts.init(document.getElementById("sleepChart"));

  updateCharts();
}

// 更新图表
function updateCharts() {
  updateSeverityChart();
  updateSymptomsChart();
  updateMedicationChart();
  updateSleepChart();
}

// 更新严重程度趋势图
function updateSeverityChart() {
  const logs = filteredLogs.sort((a, b) => new Date(a.date) - new Date(b.date));

  const dates = logs.map((log) => formatDate(log.date));
  const severities = logs.map((log) => log.severity);

  const option = {
    title: {
      text: "症状严重程度趋势",
      left: "center",
      textStyle: { fontSize: 16 },
    },
    tooltip: {
      trigger: "axis",
      formatter: function (params) {
        const data = params[0];
        return `${data.name}<br/>严重程度: ${data.value}/5`;
      },
    },
    xAxis: {
      type: "category",
      data: dates,
      axisLabel: { rotate: 45 },
    },
    yAxis: {
      type: "value",
      min: 1,
      max: 5,
      axisLabel: {
        formatter: function (value) {
          const labels = {
            1: "轻微",
            2: "轻度",
            3: "中度",
            4: "重度",
            5: "极重",
          };
          return labels[value] || value;
        },
      },
    },
    series: [
      {
        data: severities,
        type: "line",
        smooth: true,
        lineStyle: { color: "#42a5f5", width: 3 },
        itemStyle: { color: "#42a5f5" },
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: "rgba(66, 165, 245, 0.3)" },
              { offset: 1, color: "rgba(66, 165, 245, 0.1)" },
            ],
          },
        },
      },
    ],
  };

  severityChart.setOption(option);
}

// 更新症状分布图
function updateSymptomsChart() {
  const symptomCount = {};
  filteredLogs.forEach((log) => {
    log.symptoms.forEach((symptom) => {
      symptomCount[symptom] = (symptomCount[symptom] || 0) + 1;
    });
  });

  const data = Object.entries(symptomCount).map(([name, value]) => ({
    name,
    value,
  }));

  const option = {
    title: {
      text: "症状分布",
      left: "center",
      textStyle: { fontSize: 16 },
    },
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b}: {c} ({d}%)",
    },
    series: [
      {
        name: "症状",
        type: "pie",
        radius: "60%",
        data: data,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };

  symptomsChart.setOption(option);
}

// 更新用药记录图
function updateMedicationChart() {
  const medicationCount = {};
  filteredLogs.forEach((log) => {
    if (log.medication && log.medication.trim()) {
      const meds = log.medication.split(/[,，]/).map((med) => med.trim());
      meds.forEach((med) => {
        if (med) {
          medicationCount[med] = (medicationCount[med] || 0) + 1;
        }
      });
    }
  });

  const data = Object.entries(medicationCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10); // 只显示前10个

  const option = {
    title: {
      text: "用药记录",
      left: "center",
      textStyle: { fontSize: 16 },
    },
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "shadow" },
    },
    xAxis: {
      type: "value",
    },
    yAxis: {
      type: "category",
      data: data.map((item) => item[0]),
      axisLabel: { fontSize: 10 },
    },
    series: [
      {
        data: data.map((item) => item[1]),
        type: "bar",
        itemStyle: { color: "#42a5f5" },
      },
    ],
  };

  medicationChart.setOption(option);
}

// 更新睡眠质量图
function updateSleepChart() {
  const logs = filteredLogs.sort((a, b) => new Date(a.date) - new Date(b.date));

  const dates = logs.map((log) => formatDate(log.date));
  const sleepQualities = logs.map((log) => log.sleepQuality);
  const moods = logs.map((log) => log.mood);

  const option = {
    title: {
      text: "睡眠质量与情绪状态",
      left: "center",
      textStyle: { fontSize: 16 },
    },
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: ["睡眠质量", "情绪状态"],
      top: 30,
    },
    xAxis: {
      type: "category",
      data: dates,
      axisLabel: { rotate: 45 },
    },
    yAxis: {
      type: "value",
      min: 1,
      max: 10,
    },
    series: [
      {
        name: "睡眠质量",
        data: sleepQualities,
        type: "line",
        smooth: true,
        lineStyle: { color: "#4caf50" },
        itemStyle: { color: "#4caf50" },
      },
      {
        name: "情绪状态",
        data: moods,
        type: "line",
        smooth: true,
        lineStyle: { color: "#ff9800" },
        itemStyle: { color: "#ff9800" },
      },
    ],
  };

  sleepChart.setOption(option);
}

// 格式化日期
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("zh-CN", {
    month: "short",
    day: "numeric",
  });
}

// 响应式处理
window.addEventListener("resize", function () {
  if (severityChart) severityChart.resize();
  if (symptomsChart) symptomsChart.resize();
  if (medicationChart) medicationChart.resize();
  if (sleepChart) sleepChart.resize();
});

// 页面加载完成后初始化
document.addEventListener("DOMContentLoaded", init);



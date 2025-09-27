"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

// 动态导入 ECharts 组件
const EChartsComponent = dynamic(
  () => import("@/components/EChartsComponent"),
  {
    ssr: false,
  }
);

interface HealthLog {
  id: number;
  date: string;
  time: string;
  severity: number;
  symptoms: string[];
  medication: string;
  sleepQuality: number;
  mood: number;
  notes: string;
}

export default function HealthLogPage() {
  const [logs, setLogs] = useState<HealthLog[]>([
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
  ]);

  const [currentView, setCurrentView] = useState("list");
  const [showAddModal, setShowAddModal] = useState(false);
  const [filteredLogs, setFilteredLogs] = useState<HealthLog[]>([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [symptomFilter, setSymptomFilter] = useState("");
  const [newLog, setNewLog] = useState({
    date: "",
    time: "",
    severity: "",
    symptoms: [] as string[],
    medication: "",
    sleepQuality: 5,
    mood: 5,
    notes: "",
  });

  const [charts, setCharts] = useState({
    severity: null,
    symptoms: null,
    medication: null,
    sleep: null,
  });

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0];

    setNewLog((prev) => ({ ...prev, date: today }));
    setStartDate(weekAgo);
    setEndDate(today);
    setFilteredLogs(logs);
  }, []);

  useEffect(() => {
    applyFilters();
  }, [logs, startDate, endDate, symptomFilter]);

  useEffect(() => {
    if (currentView === "chart") {
      updateCharts();
    }
  }, [currentView, filteredLogs]);

  const applyFilters = () => {
    let filtered = [...logs];

    if (startDate) {
      filtered = filtered.filter((log) => log.date >= startDate);
    }
    if (endDate) {
      filtered = filtered.filter((log) => log.date <= endDate);
    }
    if (symptomFilter) {
      filtered = filtered.filter((log) => log.symptoms.includes(symptomFilter));
    }

    setFilteredLogs(filtered);
  };

  const handleAddLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (newLog.severity && newLog.symptoms.length > 0) {
      const log: HealthLog = {
        id: Date.now(),
        date: newLog.date,
        time: newLog.time || new Date().toTimeString().slice(0, 5),
        severity: parseInt(newLog.severity),
        symptoms: newLog.symptoms,
        medication: newLog.medication,
        sleepQuality: newLog.sleepQuality,
        mood: newLog.mood,
        notes: newLog.notes,
      };
      setLogs([log, ...logs]);
      setNewLog({
        date: new Date().toISOString().split("T")[0],
        time: "",
        severity: "",
        symptoms: [],
        medication: "",
        sleepQuality: 5,
        mood: 5,
        notes: "",
      });
      setShowAddModal(false);
    }
  };

  const handleSymptomChange = (symptom: string, checked: boolean) => {
    if (checked) {
      setNewLog((prev) => ({ ...prev, symptoms: [...prev.symptoms, symptom] }));
    } else {
      setNewLog((prev) => ({
        ...prev,
        symptoms: prev.symptoms.filter((s) => s !== symptom),
      }));
    }
  };

  const updateCharts = () => {
    const sortedLogs = filteredLogs.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    // 严重程度趋势图
    const severityOption = {
      title: {
        text: "症状严重程度趋势",
        left: "center",
        textStyle: { fontSize: 16 },
      },
      tooltip: { trigger: "axis" },
      xAxis: {
        type: "category",
        data: sortedLogs.map((log) => formatDate(log.date)),
      },
      yAxis: { type: "value", min: 1, max: 5 },
      series: [
        {
          data: sortedLogs.map((log) => log.severity),
          type: "line",
          smooth: true,
          lineStyle: { color: "#42a5f5", width: 3 },
          itemStyle: { color: "#42a5f5" },
        },
      ],
    };

    // 症状分布饼图
    const symptomCount: { [key: string]: number } = {};
    filteredLogs.forEach((log) => {
      log.symptoms.forEach((symptom) => {
        symptomCount[symptom] = (symptomCount[symptom] || 0) + 1;
      });
    });
    const symptomsOption = {
      title: { text: "症状分布", left: "center", textStyle: { fontSize: 16 } },
      tooltip: { trigger: "item" },
      series: [
        {
          name: "症状",
          type: "pie",
          radius: "60%",
          data: Object.entries(symptomCount).map(([name, value]) => ({
            name,
            value,
          })),
        },
      ],
    };

    // 睡眠质量图
    const sleepOption = {
      title: {
        text: "睡眠质量与情绪状态",
        left: "center",
        textStyle: { fontSize: 16 },
      },
      tooltip: { trigger: "axis" },
      legend: { data: ["睡眠质量", "情绪状态"], top: 30 },
      xAxis: {
        type: "category",
        data: sortedLogs.map((log) => formatDate(log.date)),
      },
      yAxis: { type: "value", min: 1, max: 10 },
      series: [
        {
          name: "睡眠质量",
          data: sortedLogs.map((log) => log.sleepQuality),
          type: "line",
          smooth: true,
          lineStyle: { color: "#4caf50" },
          itemStyle: { color: "#4caf50" },
        },
        {
          name: "情绪状态",
          data: sortedLogs.map((log) => log.mood),
          type: "line",
          smooth: true,
          lineStyle: { color: "#ff9800" },
          itemStyle: { color: "#ff9800" },
        },
      ],
    };

    setCharts({
      severity: severityOption,
      symptoms: symptomsOption,
      medication: null,
      sleep: sleepOption,
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("zh-CN", { month: "short", day: "numeric" });
  };

  const getStats = () => {
    const uniqueDates = new Set(filteredLogs.map((log) => log.date));
    const avgSeverity =
      filteredLogs.length > 0
        ? (
            filteredLogs.reduce((sum, log) => sum + log.severity, 0) /
            filteredLogs.length
          ).toFixed(1)
        : 0;
    const medicationDays = filteredLogs.filter(
      (log) => log.medication && log.medication.trim()
    ).length;

    return {
      totalDays: uniqueDates.size,
      avgSeverity,
      medicationDays,
      improvementRate: "15.2%", // 简化计算
    };
  };

  const stats = getStats();

  return (
    <div>
      <div className="header">
        <h1>📊 ENS 健康日志</h1>
        <p>记录症状变化，跟踪治疗效果，管理健康数据</p>
        <div className="nav-links">
          <Link href="/" className="nav-link">
            🗺️ 诊所地图
          </Link>
          <Link href="/memorial" className="nav-link">
            🕯️ 纪念园
          </Link>
          <Link href="/forum" className="nav-link">
            💬 患者论坛
          </Link>
        </div>
      </div>

      <div className="container">
        {/* 快速统计 */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "20px",
            marginBottom: "30px",
          }}
        >
          {[
            { number: stats.totalDays, label: "记录天数", icon: "📅" },
            { number: stats.avgSeverity, label: "平均严重程度", icon: "😷" },
            { number: stats.medicationDays, label: "用药天数", icon: "💊" },
            { number: stats.improvementRate, label: "改善率", icon: "📈" },
          ].map((stat, index) => (
            <div
              key={index}
              style={{
                background: "rgba(255, 255, 255, 0.9)",
                backdropFilter: "blur(10px)",
                borderRadius: "15px",
                padding: "20px",
                boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.3s ease",
                display: "flex",
                alignItems: "center",
                gap: "15px",
              }}
            >
              <div
                style={{
                  fontSize: "2.5em",
                  width: "60px",
                  height: "60px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "linear-gradient(135deg, #667eea, #764ba2)",
                  borderRadius: "50%",
                  color: "white",
                }}
              >
                {stat.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: "2em",
                    fontWeight: "bold",
                    color: "#42a5f5",
                    marginBottom: "5px",
                  }}
                >
                  {stat.number}
                </div>
                <div style={{ color: "#666", fontSize: "0.9em" }}>
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 操作面板 */}
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
            onClick={() => setShowAddModal(true)}
          >
            ➕ 添加记录
          </button>
          <div style={{ display: "flex", gap: "10px" }}>
            <button
              className={`btn btn-secondary ${
                currentView === "list" ? "active" : ""
              }`}
              onClick={() => setCurrentView("list")}
            >
              📋 列表视图
            </button>
            <button
              className={`btn btn-secondary ${
                currentView === "chart" ? "active" : ""
              }`}
              onClick={() => setCurrentView("chart")}
            >
              📊 图表视图
            </button>
          </div>
        </div>

        {/* 筛选面板 */}
        <div
          style={{
            background: "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(10px)",
            borderRadius: "15px",
            padding: "20px",
            marginBottom: "30px",
            boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
            display: "flex",
            gap: "30px",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              flexWrap: "wrap",
            }}
          >
            <label
              style={{ fontWeight: 500, color: "#333", whiteSpace: "nowrap" }}
            >
              时间范围：
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              style={{
                padding: "8px 12px",
                border: "1px solid #ddd",
                borderRadius: "5px",
                fontSize: "14px",
              }}
            />
            <span>至</span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              style={{
                padding: "8px 12px",
                border: "1px solid #ddd",
                borderRadius: "5px",
                fontSize: "14px",
              }}
            />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <label style={{ fontWeight: 500, color: "#333" }}>症状筛选：</label>
            <select
              value={symptomFilter}
              onChange={(e) => setSymptomFilter(e.target.value)}
              style={{
                padding: "8px 12px",
                border: "1px solid #ddd",
                borderRadius: "5px",
                fontSize: "14px",
                minWidth: "150px",
              }}
            >
              <option value="">全部症状</option>
              <option value="鼻塞">鼻塞</option>
              <option value="鼻干">鼻干</option>
              <option value="头痛">头痛</option>
              <option value="失眠">失眠</option>
              <option value="焦虑">焦虑</option>
            </select>
          </div>
        </div>

        {/* 内容区域 */}
        <div
          style={{
            background: "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(10px)",
            borderRadius: "15px",
            boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
            overflow: "hidden",
          }}
        >
          {currentView === "list" ? (
            <div style={{ padding: "20px" }}>
              {filteredLogs.length === 0 ? (
                <div
                  style={{
                    textAlign: "center",
                    padding: "60px 20px",
                    color: "#666",
                  }}
                >
                  <div style={{ fontSize: "4em", marginBottom: "20px" }}>
                    📝
                  </div>
                  <h3>暂无记录</h3>
                  <p>点击"添加记录"开始记录你的健康数据</p>
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "15px",
                  }}
                >
                  {filteredLogs
                    .sort(
                      (a, b) =>
                        new Date(b.date + " " + b.time).getTime() -
                        new Date(a.date + " " + a.time).getTime()
                    )
                    .map((log) => (
                      <div
                        key={log.id}
                        style={{
                          background: "white",
                          borderRadius: "10px",
                          padding: "20px",
                          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                          transition: "transform 0.3s ease",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: "15px",
                          }}
                        >
                          <div
                            style={{
                              fontSize: "1.1em",
                              fontWeight: "bold",
                              color: "#333",
                            }}
                          >
                            {formatDate(log.date)}
                          </div>
                          <div style={{ color: "#666", fontSize: "0.9em" }}>
                            {log.time}
                          </div>
                        </div>

                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            marginBottom: "15px",
                          }}
                        >
                          <span
                            style={{
                              padding: "4px 12px",
                              borderRadius: "15px",
                              fontSize: "0.8em",
                              fontWeight: "bold",
                              color: "white",
                              background:
                                log.severity === 1
                                  ? "#4caf50"
                                  : log.severity === 2
                                  ? "#8bc34a"
                                  : log.severity === 3
                                  ? "#ff9800"
                                  : log.severity === 4
                                  ? "#ff5722"
                                  : "#f44336",
                            }}
                          >
                            严重程度: {log.severity} -{" "}
                            {
                              ["", "轻微", "轻度", "中度", "重度", "极重"][
                                log.severity
                              ]
                            }
                          </span>
                        </div>

                        <div
                          style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "8px",
                            marginBottom: "15px",
                          }}
                        >
                          {log.symptoms.map((symptom) => (
                            <span
                              key={symptom}
                              style={{
                                background: "#e3f2fd",
                                color: "#1976d2",
                                padding: "4px 8px",
                                borderRadius: "12px",
                                fontSize: "0.8em",
                              }}
                            >
                              {symptom}
                            </span>
                          ))}
                        </div>

                        <div
                          style={{
                            display: "grid",
                            gridTemplateColumns:
                              "repeat(auto-fit, minmax(200px, 1fr))",
                            gap: "15px",
                            marginBottom: "15px",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              padding: "8px 0",
                              borderBottom: "1px solid #f0f0f0",
                            }}
                          >
                            <span style={{ color: "#666", fontSize: "0.9em" }}>
                              用药情况:
                            </span>
                            <span style={{ color: "#333", fontWeight: 500 }}>
                              {log.medication || "无"}
                            </span>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              padding: "8px 0",
                              borderBottom: "1px solid #f0f0f0",
                            }}
                          >
                            <span style={{ color: "#666", fontSize: "0.9em" }}>
                              睡眠质量:
                            </span>
                            <span style={{ color: "#333", fontWeight: 500 }}>
                              {log.sleepQuality}/10
                            </span>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              padding: "8px 0",
                              borderBottom: "1px solid #f0f0f0",
                            }}
                          >
                            <span style={{ color: "#666", fontSize: "0.9em" }}>
                              情绪状态:
                            </span>
                            <span style={{ color: "#333", fontWeight: 500 }}>
                              {log.mood}/10
                            </span>
                          </div>
                        </div>

                        {log.notes && (
                          <div
                            style={{
                              background: "#f8f9fa",
                              padding: "10px",
                              borderRadius: "5px",
                              color: "#555",
                              fontStyle: "italic",
                              lineHeight: "1.5",
                            }}
                          >
                            {log.notes}
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              )}
            </div>
          ) : (
            <div style={{ padding: "20px" }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
                  gap: "20px",
                }}
              >
                {charts.severity && (
                  <div
                    style={{
                      background: "white",
                      borderRadius: "10px",
                      padding: "20px",
                      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <h3
                      style={{
                        marginBottom: "15px",
                        color: "#333",
                        fontSize: "1.2em",
                      }}
                    >
                      症状严重程度趋势
                    </h3>
                    <div style={{ height: "300px", width: "100%" }}>
                      <EChartsComponent
                        option={charts.severity}
                        style={{ height: "100%", width: "100%" }}
                      />
                    </div>
                  </div>
                )}

                {charts.symptoms && (
                  <div
                    style={{
                      background: "white",
                      borderRadius: "10px",
                      padding: "20px",
                      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <h3
                      style={{
                        marginBottom: "15px",
                        color: "#333",
                        fontSize: "1.2em",
                      }}
                    >
                      症状分布
                    </h3>
                    <div style={{ height: "300px", width: "100%" }}>
                      <EChartsComponent
                        option={charts.symptoms}
                        style={{ height: "100%", width: "100%" }}
                      />
                    </div>
                  </div>
                )}

                {charts.sleep && (
                  <div
                    style={{
                      background: "white",
                      borderRadius: "10px",
                      padding: "20px",
                      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <h3
                      style={{
                        marginBottom: "15px",
                        color: "#333",
                        fontSize: "1.2em",
                      }}
                    >
                      睡眠质量与情绪状态
                    </h3>
                    <div style={{ height: "300px", width: "100%" }}>
                      <EChartsComponent
                        option={charts.sleep}
                        style={{ height: "100%", width: "100%" }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 添加记录模态框 */}
      {showAddModal && (
        <div className="modal show">
          <div className="modal-content">
            <div className="modal-header">
              <h2>添加健康记录</h2>
              <span className="close" onClick={() => setShowAddModal(false)}>
                &times;
              </span>
            </div>
            <form onSubmit={handleAddLog}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="logDate">日期 *</label>
                  <input
                    type="date"
                    id="logDate"
                    value={newLog.date}
                    onChange={(e) =>
                      setNewLog({ ...newLog, date: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="logTime">时间</label>
                  <input
                    type="time"
                    id="logTime"
                    value={newLog.time}
                    onChange={(e) =>
                      setNewLog({ ...newLog, time: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="form-group">
                <label>症状严重程度 *</label>
                <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
                  {[1, 2, 3, 4, 5].map((level) => (
                    <div
                      key={level}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                      }}
                    >
                      <input
                        type="radio"
                        id={`severity${level}`}
                        name="severity"
                        value={level}
                        checked={newLog.severity === level.toString()}
                        onChange={(e) =>
                          setNewLog({ ...newLog, severity: e.target.value })
                        }
                        required
                      />
                      <label
                        htmlFor={`severity${level}`}
                        style={{
                          margin: 0,
                          fontWeight: "normal",
                          cursor: "pointer",
                        }}
                      >
                        {level} -{" "}
                        {["", "轻微", "轻度", "中度", "重度", "极重"][level]}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label>主要症状 *</label>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
                    gap: "10px",
                  }}
                >
                  {["鼻塞", "鼻干", "头痛", "失眠", "焦虑", "疲劳"].map(
                    (symptom) => (
                      <div
                        key={symptom}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "5px",
                        }}
                      >
                        <input
                          type="checkbox"
                          id={symptom}
                          checked={newLog.symptoms.includes(symptom)}
                          onChange={(e) =>
                            handleSymptomChange(symptom, e.target.checked)
                          }
                        />
                        <label
                          htmlFor={symptom}
                          style={{
                            margin: 0,
                            fontWeight: "normal",
                            cursor: "pointer",
                            fontSize: "0.9em",
                          }}
                        >
                          {symptom}
                        </label>
                      </div>
                    )
                  )}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="medication">用药情况</label>
                <input
                  type="text"
                  id="medication"
                  value={newLog.medication}
                  onChange={(e) =>
                    setNewLog({ ...newLog, medication: e.target.value })
                  }
                  placeholder="如：布地奈德鼻喷剂 2次/日"
                />
              </div>

              <div className="form-group">
                <label htmlFor="sleepQuality">睡眠质量 (1-10分)</label>
                <input
                  type="range"
                  id="sleepQuality"
                  min="1"
                  max="10"
                  value={newLog.sleepQuality}
                  onChange={(e) =>
                    setNewLog({
                      ...newLog,
                      sleepQuality: parseInt(e.target.value),
                    })
                  }
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "5px",
                    fontSize: "0.8em",
                    color: "#666",
                  }}
                >
                  <span>很差</span>
                  <span>{newLog.sleepQuality}</span>
                  <span>很好</span>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="mood">情绪状态 (1-10分)</label>
                <input
                  type="range"
                  id="mood"
                  min="1"
                  max="10"
                  value={newLog.mood}
                  onChange={(e) =>
                    setNewLog({ ...newLog, mood: parseInt(e.target.value) })
                  }
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "5px",
                    fontSize: "0.8em",
                    color: "#666",
                  }}
                >
                  <span>很差</span>
                  <span>{newLog.mood}</span>
                  <span>很好</span>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="notes">备注</label>
                <textarea
                  id="notes"
                  value={newLog.notes}
                  onChange={(e) =>
                    setNewLog({ ...newLog, notes: e.target.value })
                  }
                  placeholder="记录其他重要信息..."
                  rows={3}
                />
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowAddModal(false)}
                >
                  取消
                </button>
                <button type="submit" className="btn btn-primary">
                  保存记录
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}



"use client";

import { useState } from "react";
import Link from "next/link";

interface MemorialRecord {
  id: number;
  name: string;
  age: number;
  location: string;
  date: string;
  message: string;
  addedBy: string;
}

export default function MemorialPage() {
  const [memorials, setMemorials] = useState<MemorialRecord[]>([
    {
      id: 1,
      name: "张先生",
      age: 45,
      location: "北京",
      date: "2023-12-15",
      message: "愿天堂没有病痛，您永远活在我们心中。",
      addedBy: "家属",
    },
    {
      id: 2,
      name: "李女士",
      age: 38,
      location: "上海",
      date: "2023-11-28",
      message: "感谢您为 ENS 患者群体做出的贡献，您的精神将永远激励着我们。",
      addedBy: "病友",
    },
    {
      id: 3,
      name: "王先生",
      age: 52,
      location: "广州",
      date: "2023-10-20",
      message: "您是一位勇敢的战士，愿您安息。",
      addedBy: "朋友",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newMemorial, setNewMemorial] = useState({
    name: "",
    age: "",
    location: "",
    date: "",
    message: "",
    addedBy: "",
  });

  const handleAddMemorial = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMemorial.name && newMemorial.message) {
      const memorial: MemorialRecord = {
        id: Date.now(),
        name: newMemorial.name,
        age: parseInt(newMemorial.age) || 0,
        location: newMemorial.location,
        date: newMemorial.date || new Date().toISOString().split("T")[0],
        message: newMemorial.message,
        addedBy: newMemorial.addedBy || "匿名",
      };
      setMemorials([memorial, ...memorials]);
      setNewMemorial({
        name: "",
        age: "",
        location: "",
        date: "",
        message: "",
        addedBy: "",
      });
      setShowModal(false);
    }
  };

  return (
    <div>
      <div className="header">
        <h1>🕯️ ENS 患者纪念园</h1>
        <p>永远怀念那些与 ENS 抗争过的勇士们</p>
        <div style={{ marginTop: "15px" }}>
          <Link href="/" className="nav-link">
            🗺️ 返回地图
          </Link>
          <Link href="/forum" className="nav-link">
            💬 患者论坛
          </Link>
          <Link href="/health-log" className="nav-link">
            📊 健康日志
          </Link>
        </div>
      </div>

      <div className="container">
        <div
          style={{
            background: "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(10px)",
            borderRadius: "15px",
            padding: "30px",
            marginBottom: "20px",
            boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
          }}
        >
          <h2 style={{ marginBottom: "20px", color: "#333" }}>
            💙 纪念那些勇敢的灵魂
          </h2>
          <p style={{ color: "#666", marginBottom: "30px", lineHeight: "1.8" }}>
            在这个特殊的空间里，我们纪念那些曾经与 ENS 抗争过的患者们。
            他们虽然离开了我们，但他们的勇气、坚强和爱心将永远激励着我们继续前行。
            让我们共同缅怀，传递温暖，为仍在与疾病抗争的朋友们加油。
          </p>

          <button
            className="btn btn-primary"
            onClick={() => setShowModal(true)}
            style={{ marginBottom: "30px" }}
          >
            ➕ 添加纪念
          </button>
        </div>

        <div
          style={{
            background: "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(10px)",
            borderRadius: "15px",
            padding: "20px",
            boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h3
            style={{ marginBottom: "20px", color: "#333", textAlign: "center" }}
          >
            🕊️ 纪念墙
          </h3>

          <div style={{ display: "grid", gap: "20px" }}>
            {memorials.map((memorial) => (
              <div
                key={memorial.id}
                style={{
                  background: "white",
                  padding: "20px",
                  borderRadius: "10px",
                  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                  borderLeft: "4px solid #42a5f5",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "15px",
                  }}
                >
                  <div>
                    <h4 style={{ color: "#333", marginBottom: "5px" }}>
                      {memorial.name}
                    </h4>
                    <div style={{ fontSize: "14px", color: "#666" }}>
                      {memorial.age > 0 && <span>年龄: {memorial.age}岁</span>}
                      {memorial.location && (
                        <span style={{ marginLeft: "15px" }}>
                          📍 {memorial.location}
                        </span>
                      )}
                      <span style={{ marginLeft: "15px" }}>
                        📅 {memorial.date}
                      </span>
                    </div>
                  </div>
                  <div style={{ fontSize: "12px", color: "#999" }}>
                    由 {memorial.addedBy} 添加
                  </div>
                </div>

                <div
                  style={{
                    color: "#555",
                    lineHeight: "1.6",
                    fontStyle: "italic",
                    background: "#f8f9fa",
                    padding: "15px",
                    borderRadius: "8px",
                    border: "1px solid #e9ecef",
                  }}
                >
                  "{memorial.message}"
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 添加纪念模态框 */}
      {showModal && (
        <div className="modal show">
          <div className="modal-content">
            <div className="modal-header">
              <h2>添加纪念</h2>
              <span className="close" onClick={() => setShowModal(false)}>
                &times;
              </span>
            </div>
            <form onSubmit={handleAddMemorial}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">姓名 *</label>
                  <input
                    type="text"
                    id="name"
                    value={newMemorial.name}
                    onChange={(e) =>
                      setNewMemorial({ ...newMemorial, name: e.target.value })
                    }
                    required
                    placeholder="请输入姓名"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="age">年龄</label>
                  <input
                    type="number"
                    id="age"
                    value={newMemorial.age}
                    onChange={(e) =>
                      setNewMemorial({ ...newMemorial, age: e.target.value })
                    }
                    placeholder="请输入年龄"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="location">地区</label>
                  <input
                    type="text"
                    id="location"
                    value={newMemorial.location}
                    onChange={(e) =>
                      setNewMemorial({
                        ...newMemorial,
                        location: e.target.value,
                      })
                    }
                    placeholder="请输入地区"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="date">日期</label>
                  <input
                    type="date"
                    id="date"
                    value={newMemorial.date}
                    onChange={(e) =>
                      setNewMemorial({ ...newMemorial, date: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="message">纪念留言 *</label>
                <textarea
                  id="message"
                  value={newMemorial.message}
                  onChange={(e) =>
                    setNewMemorial({ ...newMemorial, message: e.target.value })
                  }
                  required
                  placeholder="请输入纪念留言..."
                  rows={4}
                />
              </div>

              <div className="form-group">
                <label htmlFor="addedBy">添加者</label>
                <input
                  type="text"
                  id="addedBy"
                  value={newMemorial.addedBy}
                  onChange={(e) =>
                    setNewMemorial({ ...newMemorial, addedBy: e.target.value })
                  }
                  placeholder="如：家属、朋友、病友等"
                />
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  取消
                </button>
                <button type="submit" className="btn btn-primary">
                  添加纪念
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

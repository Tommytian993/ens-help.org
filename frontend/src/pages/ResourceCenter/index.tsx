import { useState, useEffect } from "react";
import { Resource } from "./types";
import { filterResources, getInitialResources } from "./utils";
import ResourceFilter from "./components/ResourceFilter";
import ResourceForm from "./components/ResourceForm";
import ResourceCard from "./components/ResourceCard";

const ResourceCenterPage = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [filterType, setFilterType] = useState<string>("全部");
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState<Resource>({
    title: "",
    author: "",
    type: "文献",
    description: "",
    link: "",
    date: new Date().toISOString().split("T")[0],
    tags: [],
  });
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      setUser(JSON.parse(userStr));
    }
    // 从 localStorage 加载资料
    const savedResources = localStorage.getItem("resources");
    if (savedResources) {
      setResources(JSON.parse(savedResources));
    } else {
      // 初始化一些示例资料
      const initialResources = getInitialResources();
      setResources(initialResources);
      localStorage.setItem("resources", JSON.stringify(initialResources));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const tagsArray = formData.tags
      .toString()
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag);
    const newResource: Resource = {
      ...formData,
      id: Date.now(),
      tags: tagsArray,
    };
    const updatedResources = [newResource, ...resources];
    setResources(updatedResources);
    localStorage.setItem("resources", JSON.stringify(updatedResources));
    setFormData({
      title: "",
      author: "",
      type: "文献",
      description: "",
      link: "",
      date: new Date().toISOString().split("T")[0],
      tags: [],
    });
    setShowForm(false);
  };

  const deleteResource = (id: number) => {
    const updatedResources = resources.filter((resource) => resource.id !== id);
    setResources(updatedResources);
    localStorage.setItem("resources", JSON.stringify(updatedResources));
  };

  const filteredResources = filterResources(resources, filterType, searchQuery);

  return (
    <div className="min-vh-100 bg-gradient-secondary py-5">
      <div className="container">
        {/* 头部 */}
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
          <div>
            <h1 className="display-4 fw-bold text-dark mb-2">
              📚 资料中心
            </h1>
            <p className="text-muted mb-0">
              查找 ENS 相关文献、指南和资料
            </p>
          </div>
          {user && (
            <button
              onClick={() => setShowForm(!showForm)}
              className="btn btn-lg rounded-3 px-4 py-3 fw-semibold btn-hover-lift text-white border-0"
              style={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
              }}
            >
              {showForm ? "取消" : "+ 添加资料"}
            </button>
          )}
        </div>

        {/* 搜索和筛选 */}
        <ResourceFilter
          searchQuery={searchQuery}
          filterType={filterType}
          onSearchChange={setSearchQuery}
          onFilterChange={setFilterType}
        />

        {/* 添加资料表单 */}
        {showForm && user && (
          <div className="animate-fade-in-down">
            <ResourceForm
              formData={formData}
              onFormDataChange={setFormData}
              onSubmit={handleSubmit}
            />
          </div>
        )}

        {/* 资料列表 */}
        <div className="mt-4">
          {filteredResources.length === 0 ? (
            <div className="card border-0 shadow-sm rounded-xl text-center p-5">
              <div className="icon-xl mb-4">📚</div>
              <h3 className="text-muted mb-3">没有找到资料</h3>
              <p className="text-muted mb-0">
                {searchQuery || filterType !== "全部"
                  ? "尝试调整搜索条件"
                  : user
                  ? '点击"添加资料"按钮添加新资料'
                  : "请先登录以添加资料"}
              </p>
            </div>
          ) : (
            <div className="row g-4">
              {filteredResources.map((resource) => (
                <div key={resource.id} className="col-12">
                  <ResourceCard
                    resource={resource}
                    user={user}
                    onDelete={deleteResource}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResourceCenterPage;


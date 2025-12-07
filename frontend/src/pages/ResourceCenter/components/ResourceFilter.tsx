interface ResourceFilterProps {
  searchQuery: string;
  filterType: string;
  onSearchChange: (query: string) => void;
  onFilterChange: (type: string) => void;
}

const ResourceFilter = ({
  searchQuery,
  filterType,
  onSearchChange,
  onFilterChange,
}: ResourceFilterProps) => {
  return (
    <div className="card border-0 shadow-sm rounded-xl p-4 mb-4">
      <div className="d-flex gap-3 flex-wrap align-items-center">
        <div className="flex-grow-1" style={{ minWidth: "200px" }}>
          <input
            type="text"
            className="form-control form-control-custom"
            placeholder="搜索资料..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        <div>
          <select
            className="form-select form-control-custom"
            value={filterType}
            onChange={(e) => onFilterChange(e.target.value)}
          >
            <option value="全部">全部类型</option>
            <option value="文献">文献</option>
            <option value="指南">指南</option>
            <option value="视频">视频</option>
            <option value="其他">其他</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default ResourceFilter;


import { Resource } from "./types";

export const getTypeColor = (type: string): string => {
  switch (type) {
    case "文献":
      return "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
    case "指南":
      return "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)";
    case "视频":
      return "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)";
    default:
      return "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)";
  }
};

export const getTypeIcon = (type: string): string => {
  switch (type) {
    case "文献":
      return "📄";
    case "指南":
      return "📖";
    case "视频":
      return "🎥";
    default:
      return "📚";
  }
};

export const filterResources = (
  resources: Resource[],
  filterType: string,
  searchQuery: string
): Resource[] => {
  return resources.filter((resource) => {
    const matchesType = filterType === "全部" || resource.type === filterType;
    const matchesSearch =
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesType && matchesSearch;
  });
};

export const getInitialResources = (): Resource[] => {
  return [
    {
      id: 1,
      title: "Empty Nose Syndrome: A Comprehensive Review",
      author: "Dr. Smith et al.",
      type: "文献",
      description: "关于空鼻综合征的全面综述，涵盖病因、诊断和治疗方法。",
      link: "https://example.com/paper1",
      date: "2024-01-15",
      tags: ["ENS", "综述", "诊断"],
    },
    {
      id: 2,
      title: "ENS 患者护理指南",
      author: "ENS 患者协会",
      type: "指南",
      description: "为 ENS 患者提供的日常护理和生活建议指南。",
      link: "https://example.com/guide1",
      date: "2024-02-20",
      tags: ["护理", "指南", "生活建议"],
    },
  ];
};


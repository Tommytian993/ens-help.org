export interface Resource {
  id?: number;
  title: string;
  author: string;
  type: "文献" | "指南" | "视频" | "其他";
  description: string;
  link?: string;
  date: string;
  tags: string[];
}


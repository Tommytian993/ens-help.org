export interface Post {
  id?: number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  replies?: Reply[];
}

export interface Reply {
  id?: number;
  content: string;
  author: string;
  createdAt: string;
}

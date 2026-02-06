export type BlogPost = {
  id: string | number;
  title: string;
  content: string;
  thumbnail?: string | null;
  tags?: string[];
  views: number;
  _count?: {
    comments: number;
  };
  isFeatured?: boolean;
};

export type CreateBlogPost = {
  title: string;
  content: string;
  tags?: string[];
};


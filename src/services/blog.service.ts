import { env } from "@/env";

const API_URL = env.API_URL;

type GetPostsParams = {
  isFeatured?: boolean;
  search?: string;
};

export const blogPostService = {
  getPosts: async (params?: GetPostsParams, options?: any) => {
    try {
      const url = new URL(`${API_URL}/posts`);

      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            //@ts-ignore
            url.searchParams.append(key, value);
          }
        });
      }

      const config: RequestInit = {};

      if (options?.cache) {
        config.cache = options.cache;
      }

      if (options?.revalidate) {
        config.next = {revalidate: options.revalidate}
      }

      const res = await fetch(url.toString(), config);
      const result = await res.json();

      return { data: result, error: null };
    } catch (error: any) {
      return { data: null, error: { message: error.message } };
    }
  },

  getPostById: async (id: string) => {
    try {
      const res = await fetch(`${API_URL}/posts/${id}`);
      const data = await res.json();

      return { data: data.data, error: null };
    } catch (error: any) {
      return { data: null, error: { message: error.message } };
    }
  }
};

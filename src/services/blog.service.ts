import { env } from "@/env";
import { CreateBlogPost } from "@/types";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

type GetPostsParams = {
  isFeatured?: boolean;
  search?: string;
  page?: string;
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

      if (config.next) {
        config.next = {...config.next, tags: ["blogPosts"]}
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
  },

  createBlogPost: async (data: CreateBlogPost) => {
    const cookieStore = await cookies();
    try {
      const res = await fetch(`${API_URL}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (result.error) {
      return {data: null, error: {message: "Could not create the post"}}
    }

    return {data: result, error: null}
    } catch (error: any) {
       return {data: null, error: {message: error.message || "Something went wrong"}}
    }
  }
};

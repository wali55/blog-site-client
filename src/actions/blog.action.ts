"use server"

import { blogPostService } from "@/services/blog.service"
import { CreateBlogPost } from "@/types";
import { revalidateTag } from "next/cache";

export const getBlogs = async () => {
    const result = await blogPostService.getPosts();
    return result;
}

export const createBlog = async (data: CreateBlogPost) => {
    const result = await blogPostService.createBlogPost(data);
    revalidateTag("blogPosts", "max");
    return result;
}
"use server"

import { blogPostService } from "@/services/blog.service"

export const getBlogs = async () => {
    const result = await blogPostService.getPosts();
    return result;
}
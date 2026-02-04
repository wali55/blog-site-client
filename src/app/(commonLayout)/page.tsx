import BlogCard from "@/components/modules/homepage/BlogCard";
import { blogPostService } from "@/services/blog.service";
import { BlogPost } from "@/types";

export default async function Home() {
  const {data} = await blogPostService.getPosts();
  
  return (
    <div className="max-w-7xl grid grid-cols-3 gap-5 mx-auto mt-4">
      {data?.data?.map((post: BlogPost) => (
        <BlogCard key={post.id} post={post} />
      ))}
    </div>
  );
}

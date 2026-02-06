import { getBlogs } from "@/actions/blog.action"
import { CreateBlogFromClient } from "@/components/modules/user/createBlog/CreateBlogFromClient";
import { BlogPost } from "@/types";

const CreateBlogPage = async () => {
  const {data} = await getBlogs();
  return (
    <div>
      {/* <CreateBlogFromServer /> */}
      <CreateBlogFromClient />
      {data.data.map((blog: BlogPost) => (<p key={blog.id}>{blog.title}</p>))}
    </div>
  )
}

export default CreateBlogPage
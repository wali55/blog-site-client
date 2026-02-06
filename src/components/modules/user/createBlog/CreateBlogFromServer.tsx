import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { env } from "@/env";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

const CreateBlogFromServer = () => {
  const API_URL = env.API_URL;
  const createBlog = async (formData: FormData) => {
    "use server";

    const cookieStore = await cookies();

    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const tags = formData.get("tags") as string;

    const blogData = {
      title,
      content,
      tags: tags
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item !== ""),
    };
    const res = await fetch(`${API_URL}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify(blogData),
    });

    console.log(res);

    if (res.ok) {
      revalidateTag("blogPosts", "max");
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Create Blog</CardTitle>
        <CardDescription>Create blog form</CardDescription>
      </CardHeader>
      <CardContent>
        <form id="create-blog-form" action={createBlog}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="title">Title</FieldLabel>
              <Input id="title" name="title" placeholder="Blog title" />
            </Field>
            <Field>
              <FieldLabel htmlFor="content">Content</FieldLabel>
              <Textarea
                id="content"
                name="content"
                placeholder="Write your blog"
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="tags">Tags (comma separated)</FieldLabel>
              <Input id="tags" name="tags" placeholder="nextjs, web" />
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Button type="submit" form="create-blog-form" className="w-full">
          Submit
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CreateBlogFromServer;

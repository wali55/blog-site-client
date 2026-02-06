"use client";

import { createBlog } from "@/actions/blog.action";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import * as z from "zod";

const createBlogSchema = z.object({
  title: z.string().min(3, "Min 3 characters.").max(200, "Max 200 characters."),
  content: z.string().min(10, "Min 10 characters.").max(10000, "Max 10000 characters."),
  tags: z.string(),
})

export function CreateBlogFromClient() {
  const form = useForm({
    defaultValues: {
      title: "",
      content: "",
      tags: "",
    },
    validators: {
      onSubmit: createBlogSchema
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Creating a new blog...");

      const blogData = {
        ...value,
        tags: value.tags.split(",").map((tag) => tag.trim()).filter((tag) => tag !== "")
      }
      try {
        const result = await createBlog(blogData);
        if (result.error) {
            return toast.error(result?.error?.message || "Something went wrong", {id: toastId});
        }
        toast.success("Blog created successfully.", {id: toastId});
      } catch (error: any) {
        toast.error(error?.message || "Something went wrong", {id: toastId});
      }
    },
  });
  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Create an blog</CardTitle>
        <CardDescription>
          Fill up the form to create a blog
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="blog-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field
              name="title"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Title</FieldLabel>
                    <Input
                      type="text"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
            <form.Field
              name="content"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Content</FieldLabel>
                    <Input
                      type="text"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
            <form.Field
              name="tags"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Tags (Comma separated)</FieldLabel>
                    <Input
                      type="text"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <Button form="blog-form" type="submit" className="w-full">
          Submit
        </Button>
      </CardFooter>
    </Card>
  );
}

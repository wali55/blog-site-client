"use client";

import { getBlogs } from "@/actions/blog.action";
import { useEffect, useState } from "react";

const AboutPage = () => {
  const [blogs, setBlogs] = useState();
  const [error, setError] = useState<{message: string}| null>(null);

  console.log(blogs);

  useEffect(() => {
    (async () => {
      const { data, error } = await getBlogs();
      setBlogs(data);
      setError(error);
    })();
  }, []);

  return <div>AboutPage</div>;
};

export default AboutPage;

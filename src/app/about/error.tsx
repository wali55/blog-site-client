"use client";

import { Button } from "@/components/ui/button";
import { useEffect } from "react";

const AboutError = ({error, reset}: {
    error: Error & {digest?: string};
    reset: () => void;
}) => {

  useEffect(() => {
    console.log(error);
  }, [error]);

  return <div>Something went wrong
    <Button onClick={() => reset()}>Retry</Button>
  </div>;
};

export default AboutError;

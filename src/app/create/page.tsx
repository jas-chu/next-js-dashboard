"use client";

import { useRouter } from "next/navigation";
import { Heading } from "@chakra-ui/react";
import Layout from "../../components/Layout";
import CreatePostForm from "../../components/CreatePostFrom";

export default function CreatePost() {
  const router = useRouter();
  const handleCreatePost = () => {
    setTimeout(() => {
      router.push("/");
    }, 1000);
  };

  return (
    <Layout>
      <Heading as="h2" size="xl" mb={6}>
        Create New Post
      </Heading>
      <CreatePostForm onSuccess={handleCreatePost} />
    </Layout>
  );
}

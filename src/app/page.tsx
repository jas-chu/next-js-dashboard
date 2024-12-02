"use client";

import { useState } from "react";
import { Heading, Text, Spinner } from "@chakra-ui/react";
import Layout from "../components/Layout";
import PostList from "../components/PostList";
import SearchBar from "../components/SearchBar";
import { atom, useAtom } from "jotai";
import { usePostsControllerGetAllPosts } from "../api/generated/thinkEasy";
import { PostResponse } from "@/api/generated/thinkEasy.schemas";

const postsAtom = atom<PostResponse[]>([]);

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [posts, setPosts] = useAtom(postsAtom);

  const { data, isLoading, error } = usePostsControllerGetAllPosts();

  if (data && data !== posts) {
    setPosts(data);
  }

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <Layout>
        <Spinner />
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <Text color="red.500">Error loading posts: {error.message}</Text>
      </Layout>
    );
  }

  return (
    <Layout>
      <Heading as="h2" size="xl" mb={6}>
        All Posts
      </Heading>
      <SearchBar onSearch={setSearchQuery} />
      <PostList posts={filteredPosts} />
    </Layout>
  );
}

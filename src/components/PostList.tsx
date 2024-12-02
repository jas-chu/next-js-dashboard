import { SimpleGrid } from "@chakra-ui/react";
import PostCard from "./PostCard";
import { PostResponse } from "@/api/generated/thinkEasy.schemas";

type PostListProps = {
  posts: PostResponse[];
};

export default function PostList({ posts }: PostListProps) {
  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </SimpleGrid>
  );
}

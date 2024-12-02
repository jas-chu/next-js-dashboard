import { Box, Heading, Text, Badge } from "@chakra-ui/react";

type Post = {
  id: string;
  title: string;
  content: string;
  published: boolean;
  createdAt: string;
};

type PostCardProps = {
  post: Post;
};

export default function PostCard({ post }: PostCardProps) {
  return (
    <Box borderWidth={1} borderRadius="lg" p={4} bg="white">
      <Heading as="h3" size="md" mb={2}>
        {post.title}
      </Heading>
      <Text mb={2}>{post.content}</Text>
      <Badge colorScheme={post.published ? "green" : "red"}>
        {post.published ? "Published" : "Draft"}
      </Badge>
      <Text fontSize="sm" color="gray.500" mt={2}>
        Created: {new Date(post.createdAt).toLocaleDateString()}
      </Text>
    </Box>
  );
}

import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { usePostsControllerCreate } from "../api/generated/thinkEasy";

type CreatePostFormProps = {
  onSuccess?: () => void;
};

export default function CreatePostForm({ onSuccess }: CreatePostFormProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const toast = useToast();

  const { mutate: createPost, isLoading } = usePostsControllerCreate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createPost(
      { data: { title, content } },
      {
        onSuccess: () => {
          toast({
            title: "Post created.",
            description: "Your post has been successfully created.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
          setTitle("");
          setContent("");
          onSuccess?.();
        },
        onError: (error) => {
          toast({
            title: "Error creating post.",
            description: error.message || "Something went wrong.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        },
      }
    );
  };

  return (
    <Box as="form" onSubmit={handleSubmit}>
      <FormControl mb={4}>
        <FormLabel>Title</FormLabel>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>Content</FormLabel>
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </FormControl>
      <Button type="submit" colorScheme="blue" isLoading={isLoading}>
        Create Post
      </Button>
    </Box>
  );
}

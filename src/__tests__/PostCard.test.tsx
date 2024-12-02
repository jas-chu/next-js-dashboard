import React from "react";
import { render, screen } from "@testing-library/react";
import { ChakraProvider } from "@chakra-ui/react";
import PostCard from "../components/PostCard";

const renderWithChakra = (ui: React.ReactElement) => {
  return render(<ChakraProvider>{ui}</ChakraProvider>);
};

describe("PostCard", () => {
  const mockPost = {
    id: "1",
    title: "Test Post",
    content: "This is a test post content",
    published: true,
    createdAt: "2023-08-15T10:35:51.107Z",
    authorId: "author1",
  };

  it("renders post title and content", () => {
    renderWithChakra(<PostCard post={mockPost} />);
    expect(screen.getByText("Test Post")).toBeInTheDocument();
    expect(screen.getByText("This is a test post content")).toBeInTheDocument();
  });

  it("displays published status", () => {
    renderWithChakra(<PostCard post={mockPost} />);
    expect(screen.getByText("Published")).toBeInTheDocument();
  });

  it("displays created date", () => {
    renderWithChakra(<PostCard post={mockPost} />);
    expect(screen.getByText(/created:/i)).toBeInTheDocument();
    expect(screen.getByText(/8\/15\/2023/)).toBeInTheDocument();
  });

  it("renders draft status for unpublished post", () => {
    const draftPost = { ...mockPost, published: false };
    renderWithChakra(<PostCard post={draftPost} />);
    expect(screen.getByText("Draft")).toBeInTheDocument();
  });
});

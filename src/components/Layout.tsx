"use client";

import { Box, Button, Container, Flex, Heading, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { useAuth } from "../context/authContext";
import { useRouter } from "next/navigation";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  const { token, logout } = useAuth();
  const router = useRouter();

  const handleCreatePostClick = () => {
    if (!token) {
      router.push("/login");
    } else {
      router.push("/create");
    }
  };

  const handleLogout = () => {
    logout();
    setTimeout(() => {
      router.push("/");
    }, 500);
  };

  return (
    <Box minHeight="100vh" bg="gray.50">
      <Box as="nav" bg="white" boxShadow="sm" py={4}>
        <Container maxW="container.xl">
          <Flex justify="space-between" align="center">
            <Heading as="h1" size="lg">
              <Link as={NextLink} href="/" _hover={{ textDecoration: "none" }}>
                Dashboard
              </Link>
            </Heading>
            <Flex>
              <Flex gap={3}>
                <Button colorScheme="red" onClick={handleCreatePostClick}>
                  Create Post
                </Button>
                {token && (
                  <Button colorScheme="blackAlpha" onClick={handleLogout}>
                    Logout
                  </Button>
                )}
              </Flex>
            </Flex>
          </Flex>
        </Container>
      </Box>
      <Container maxW="container.xl" py={8}>
        {children}
      </Container>
    </Box>
  );
}

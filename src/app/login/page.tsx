"use client";

import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  VStack,
  Heading,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useAuthControllerLogin } from "../../api/generated/thinkEasy";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/authContext";

type FormData = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>();

  const router = useRouter();
  const toast = useToast();
  const { saveToken } = useAuth();

  const {
    mutate: login,
    isLoading,
    error,
  } = useAuthControllerLogin({
    mutation: {
      onSuccess: (data) => {
        saveToken(data);
        toast({
          title: "Login successful",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        router.push("/create");
      },
      onError: (error) => {
        toast({
          title: "Login failed",
          description: error.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      },
    },
  });

  const onSubmit = (data: FormData) => {
    login({ data: { email: data.email, password: data.password } });
  };

  return (
    <Box p={8} maxW="400px" mx="auto">
      <VStack spacing={6} align="stretch">
        <Heading as="h1" size="xl" textAlign="center">
          Login
        </Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl id="email" isInvalid={!!errors.email} isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Invalid email address",
                },
              })}
              placeholder="Enter your email"
            />
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl
            id="password"
            isInvalid={!!errors.password}
            isRequired
            mt={4}
          >
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              placeholder="Enter your password"
            />
            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>

          {error && (
            <Box color="red.500" mt={2}>
              Login failed. Please check your credentials.
            </Box>
          )}

          <Button
            mt={4}
            colorScheme="blue"
            type="submit"
            isLoading={isLoading}
            width="100%"
          >
            Login
          </Button>
        </form>
      </VStack>
    </Box>
  );
}

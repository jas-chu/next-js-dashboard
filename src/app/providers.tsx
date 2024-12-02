"use client";

import { Provider } from "jotai";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "../context/authContext";

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider>
          <Provider>{children}</Provider>
        </ChakraProvider>
      </QueryClientProvider>
    </AuthProvider>
  );
}
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import LoginPage from "../app/login/page";
import { useAuthControllerLogin } from "../api/generated/thinkEasy";
import { AuthProvider } from "@/context/authContext";

jest.mock("../api/generated/thinkEasy", () => ({
  useAuthControllerLogin: jest.fn(),
}));

jest.mock("next/router", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

const queryClient = new QueryClient();

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider>{ui}</ChakraProvider>
      </QueryClientProvider>
    </AuthProvider>
  );
};

describe("LoginPage", () => {
  beforeEach(() => {
    (useAuthControllerLogin as jest.Mock).mockReturnValue({
      mutate: jest.fn(),
      isLoading: false,
      error: null,
    });
  });

  it("renders login form", () => {
    renderWithProviders(<LoginPage />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  it("submits form with valid data", async () => {
    const mockLogin = jest.fn();
    (useAuthControllerLogin as jest.Mock).mockReturnValue({
      mutate: mockLogin,
      isLoading: false,
      error: null,
    });

    renderWithProviders(<LoginPage />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        data: { email: "test@example.com", password: "password123" },
      });
    });
  });

  it("displays error message on login failure", async () => {
    (useAuthControllerLogin as jest.Mock).mockReturnValue({
      mutate: jest.fn(),
      isLoading: false,
      error: new Error("Login failed"),
    });

    renderWithProviders(<LoginPage />);

    expect(screen.getByText(/login failed/i)).toBeInTheDocument();
  });
});

import React from "react";
import { renderHook } from "@testing-library/react";
import { useAuthForm } from "./useAuthForm";

// Mock the dependencies
jest.mock("../utils/auth", () => ({
  signIn: jest.fn(),
  signUp: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  useNavigate: () => jest.fn(),
  useSearchParams: () => [new URLSearchParams("mode=login"), jest.fn()],
}));

jest.mock("../store/hooks", () => ({
  useAppDispatch: () => jest.fn(),
  useAppSelector: () => ({ error: "", isLoading: false }),
}));

// Simple wrapper
const wrapper = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

describe("useAuthForm", () => {
  it("should render without crashing", () => {
    const { result } = renderHook(() => useAuthForm(), { wrapper });
    expect(result.current).toBeDefined();
  });
});

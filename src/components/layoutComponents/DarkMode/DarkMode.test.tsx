import { render, screen } from "../../../test/test-utils";
import DarkMode from "./DarkMode";
import userEvent from "@testing-library/user-event";
import { rightNavActions } from "../../../store/slices/rightNavSlice";

const mockDispatch = jest.fn();
jest.mock("../../../store/hooks.ts", () => ({
  useAppDispatch: () => mockDispatch,
  useAppSelector: () => ({ isDarkMode: false }),
}));

describe("DarkMode", () => {
  beforeEach(() => {
    localStorage.clear();
    mockDispatch.mockClear();
    document.documentElement.classList.remove("dark");
  });

  it("renders dark mode toggle button with correct styling", () => {
    render(<DarkMode />);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  it("displays moon icon in light mode", () => {
    render(<DarkMode />);
    expect(screen.getByTestId("moon-icon")).toBeInTheDocument();
  });

  it("toggles theme when clicked", async () => {
    render(<DarkMode />);
    const button = screen.getByRole("button");
    await userEvent.click(button);

    expect(mockDispatch).toHaveBeenCalledWith(
      rightNavActions.setIsDarkMode(true)
    );
    expect(localStorage.getItem("mode")).toBe("dark");
    expect(document.documentElement.classList.contains("dark")).toBeTruthy();
  });

  it("loads theme from localStorage on mount", () => {
    localStorage.setItem("mode", "dark");
    render(<DarkMode />);

    expect(mockDispatch).toHaveBeenCalledWith(
      rightNavActions.setIsDarkMode(true)
    );
    expect(document.documentElement.classList.contains("dark")).toBeTruthy();
  });

  it("handles missing localStorage value", () => {
    localStorage.removeItem("mode");
    render(<DarkMode />);

    expect(mockDispatch).toHaveBeenCalledWith(
      rightNavActions.setIsDarkMode(false)
    );
    expect(document.documentElement.classList.contains("dark")).toBeFalsy();
  });
});

import { render, screen, fireEvent } from "../../../test/test-utils";
import UserMenu from "./UserMenu";
import { rightNavActions } from "../../../store/slices/rightNavSlice";

// Mock auth utility
jest.mock("../../../utils/auth", () => ({
  getAuthUser: jest.fn(() => ({
    email: "test@example.com",
    uid: "123",
  })),
}));

const mockDispatch = jest.fn();
jest.mock("../../../store/hooks.ts", () => ({
  useAppDispatch: () => mockDispatch,
  useAppSelector: () => ({ isUserMenuOpen: false }),
}));

describe("UserMenu", () => {
  const renderWithRouter = (ui: React.ReactElement) => {
    return render(ui);
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders user avatar with first letter of email", () => {
    renderWithRouter(<UserMenu />);
    const avatarText = screen.getByText("T");
    expect(avatarText).toBeInTheDocument();
  });

  it("renders username from email", () => {
    renderWithRouter(<UserMenu />);
    const username = screen.getByText("test");
    expect(username).toBeInTheDocument();
    expect(username).toHaveClass("text-sm", "font-medium");
  });

  it("toggles dropdown menu when clicked", () => {
    renderWithRouter(<UserMenu />);
    const button = screen.getByRole("button");

    // Initial state - closed
    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();

    // Click to open
    fireEvent.click(button);
    expect(mockDispatch).toHaveBeenCalledWith(
      rightNavActions.setIsUserMenuOpen(true)
    );
  });

  it("handles guest user when no email is available", () => {
    // Mock the auth utility for this specific test
    const authModule = require("../../../utils/auth");
    const originalGetAuthUser = authModule.getAuthUser;
    authModule.getAuthUser = jest.fn(() => ({}));

    renderWithRouter(<UserMenu />);
    expect(screen.getByText("G")).toBeInTheDocument();
    expect(screen.getByText("Guest")).toBeInTheDocument();

    // Restore the original function
    authModule.getAuthUser = originalGetAuthUser;
  });
});

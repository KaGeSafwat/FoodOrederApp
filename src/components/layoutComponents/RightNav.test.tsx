import { render, screen } from "../../test/test-utils";
import RightNav from "./RightNav";

// Mock child components
jest.mock("./DarkMode", () => ({
  __esModule: true,
  default: () => <div data-testid="dark-mode">Dark Mode</div>,
}));

jest.mock("./UserMenu", () => ({
  __esModule: true,
  default: () => <div data-testid="user-menu">User Menu</div>,
}));

describe("RightNav", () => {
  const renderWithRouter = (ui: React.ReactElement) => {
    return render(ui);
  };

  it("renders dark mode toggle", () => {
    renderWithRouter(<RightNav />);
    expect(screen.getByTestId("dark-mode")).toBeInTheDocument();
  });

  it("renders user menu", () => {
    renderWithRouter(<RightNav />);
    expect(screen.getByTestId("user-menu")).toBeInTheDocument();
  });

  it("renders with correct container styles", () => {
    const { container } = renderWithRouter(<RightNav />);
    const navContainer = container.querySelector("div > div");
    expect(navContainer).toHaveClass("flex", "items-center", "space-x-4");
  });

  it("renders components in correct order", () => {
    renderWithRouter(<RightNav />);
    const elements = screen.getAllByTestId(/dark-mode|user-menu/);
    expect(elements[0]).toHaveTextContent("Dark Mode");
    expect(elements[1]).toHaveTextContent("User Menu");
  });
});

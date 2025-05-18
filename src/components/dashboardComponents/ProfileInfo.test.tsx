import { render, screen } from "../../test/test-utils";
import ProfileInfo from "./ProfileInfo";

// Mock the auth utility
jest.mock("../../utils/auth", () => ({
  getAuthUser: jest.fn(() => ({
    email: "testuser@example.com",
  })),
  UserDate: jest.fn(),
}));

describe("ProfileInfo", () => {
  it("renders profile information correctly", () => {
    render(<ProfileInfo />);

    // Check if title is rendered
    expect(screen.getByText("Profile Info")).toBeInTheDocument();

    // Check if username (derived from email) is displayed
    expect(screen.getByText("testuser")).toBeInTheDocument();

    // Check if email is displayed
    expect(screen.getByText("testuser@example.com")).toBeInTheDocument();

    // Check if role and location badges are present
    expect(screen.getByText("Software Engineer")).toBeInTheDocument();
    expect(screen.getByText("Cairo , Egypt")).toBeInTheDocument();
  });

  it("renders avatar with correct source", () => {
    render(<ProfileInfo />);

    const avatar = screen.getByAltText("profile");
    expect(avatar).toHaveAttribute(
      "src",
      expect.stringContaining("https://ui-avatars.com/api/?name=testuser")
    );
    expect(avatar).toHaveClass("rounded-full", "border-4", "border-blue-500");
  });

  it("extracts username correctly from email", () => {
    jest.spyOn(require("../../utils/auth"), "getAuthUser").mockReturnValue({
      email: "john.doe@example.com",
    });

    render(<ProfileInfo />);
    expect(screen.getByText("john.doe")).toBeInTheDocument();
  });

  it("handles missing email gracefully", () => {
    jest.spyOn(require("../../utils/auth"), "getAuthUser").mockReturnValue({
      email: undefined,
    });

    render(<ProfileInfo />);
    // Should not throw error when email is undefined
    expect(screen.getByAltText("profile")).toBeInTheDocument();
  });

  it("renders profile section with correct styling", () => {
    render(<ProfileInfo />);

    const section = screen.getByRole("region");
    expect(section).toHaveClass("mb-12");

    const container = screen.getByRole("img").parentElement;
    expect(container).toHaveClass(
      "bg-white",
      "dark:bg-gray-800",
      "rounded-2xl",
      "shadow-lg"
    );
  });
});

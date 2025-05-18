import { render, screen, fireEvent } from "../../test/test-utils";
import NoPosts from "./NoPosts";
import { useNavigate } from "react-router-dom";

// Mock useNavigate
jest.mock("react-router-dom", () => {
  const originalModule = jest.requireActual("react-router-dom");
  return {
    ...originalModule,
    useNavigate: jest.fn(),
  };
});

describe("NoPosts", () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders no posts message and description", () => {
    render(<NoPosts />);

    expect(screen.getByText("No posts found")).toBeInTheDocument();
    expect(screen.getByText(/Create your first post/)).toBeInTheDocument();
  });

  it("renders create post button with correct icon", () => {
    render(<NoPosts />);

    const createButton = screen.getByRole("button", {
      name: /create new post/i,
    });
    expect(createButton).toBeInTheDocument();
    expect(createButton.querySelector("svg")).toBeInTheDocument();
  });

  it("renders go to dashboard button with correct icon", () => {
    render(<NoPosts />);

    const dashboardButton = screen.getByRole("button", {
      name: /go to dashboard/i,
    });
    expect(dashboardButton).toBeInTheDocument();
    expect(dashboardButton.querySelector("svg")).toBeInTheDocument();
  });

  it("navigates to new post page when create button is clicked", () => {
    render(<NoPosts />);

    const createButton = screen.getByRole("button", {
      name: /create new post/i,
    });
    fireEvent.click(createButton);

    expect(mockNavigate).toHaveBeenCalledWith("/dashboard/new-post");
  });

  it("navigates to dashboard when dashboard button is clicked", () => {
    render(<NoPosts />);

    const dashboardButton = screen.getByRole("button", {
      name: /go to dashboard/i,
    });
    fireEvent.click(dashboardButton);

    expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
  });

  it("applies correct styles to container", () => {
    render(<NoPosts />);

    const container = screen.getByRole("region");
    expect(container).toHaveClass("col-span-3", "text-center", "py-12");
  });

  it("applies correct styles to card container", () => {
    render(<NoPosts />);

    const card = screen.getByRole("region").firstChild;
    expect(card).toHaveClass(
      "max-w-md",
      "mx-auto",
      "bg-white",
      "dark:bg-gray-800",
      "rounded-xl",
      "shadow-md",
      "overflow-hidden"
    );
  });

  it("applies correct styles to buttons", () => {
    render(<NoPosts />);

    const createButton = screen.getByRole("button", {
      name: /create new post/i,
    });
    expect(createButton).toHaveClass(
      "from-blue-600",
      "to-indigo-600",
      "hover:from-blue-700",
      "hover:to-indigo-700"
    );

    const dashboardButton = screen.getByRole("button", {
      name: /go to dashboard/i,
    });
    expect(dashboardButton).toHaveClass(
      "bg-gray-100",
      "dark:bg-gray-700",
      "hover:bg-gray-200",
      "dark:hover:bg-gray-600"
    );
  });

  it("renders large icon in correct style", () => {
    render(<NoPosts />);

    const iconContainer = screen.getByTestId("no-posts-icon");
    expect(iconContainer).toHaveClass(
      "text-blue-500",
      "dark:text-blue-400",
      "mb-6",
      "bg-blue-100",
      "dark:bg-blue-900/30",
      "p-5",
      "rounded-full"
    );
  });
});

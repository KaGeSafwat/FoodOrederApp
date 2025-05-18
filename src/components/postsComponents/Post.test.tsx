import { render, screen, fireEvent } from "../../test/test-utils";
import Post from "./Post";
import {
  formatDate,
  formatRelativeTime,
  truncateText,
  toTitleCase,
} from "../../utils/format";
import * as useAppMutations from "../../hooks/useAppMutation";

// Mock the format utilities
jest.mock("../../utils/format", () => ({
  formatDate: jest.fn(() => "May 17, 2025"),
  formatRelativeTime: jest.fn(() => "2 hours ago"),
  truncateText: jest.fn((text) => text.substring(0, 100)),
  toTitleCase: jest.fn((text) => text.charAt(0).toUpperCase() + text.slice(1)),
}));

// Mock the useAppMutations hook
jest.mock("../../hooks/useAppMutation", () => ({
  useAppMutations: jest.fn(),
}));

describe("Post", () => {
  const mockPost = {
    id: "1",
    title: "test post title",
    content: "Test content that is long enough to be truncated in the preview",
    image: "https://example.com/image.jpg",
    createdAt: new Date("2025-05-17T10:00:00Z").toISOString(),
  };

  beforeEach(() => {
    // Mock the useAppMutations hook implementation
    (useAppMutations.useAppMutations as jest.Mock).mockImplementation(() => ({
      deletePost: jest.fn(),
      isError: false,
      error: null,
    }));
  });

  const renderPost = () => {
    return render(<Post post={mockPost} />);
  };

  it("renders post content correctly", () => {
    renderPost();

    // Check if title is rendered and transformed
    // Use a case-insensitive regex to find the title
    const titleElement = screen.getByText(/test post title/i);
    expect(titleElement).toBeInTheDocument();
    expect(toTitleCase).toHaveBeenCalledWith(mockPost.title);

    // Check if content is truncated
    expect(
      screen.getByText(mockPost.content.substring(0, 100))
    ).toBeInTheDocument();
    expect(truncateText).toHaveBeenCalledWith(mockPost.content);

    // Check if date is formatted
    expect(screen.getByText("May 17, 2025")).toBeInTheDocument();
    expect(formatDate).toHaveBeenCalledWith(mockPost.createdAt);
    expect(screen.getByText("2 hours ago")).toBeInTheDocument();
    expect(formatRelativeTime).toHaveBeenCalledWith(mockPost.createdAt);
  });

  it("renders post image with fallback on error", () => {
    renderPost();
    const img = screen.getByAltText(mockPost.title);

    expect(img).toHaveAttribute("src", mockPost.image);

    // Test image error fallback
    fireEvent.error(img);
    expect(img).toHaveAttribute(
      "src",
      "https://via.placeholder.com/800x400?text=Image+Error"
    );
  });

  it("renders placeholder image when no image is provided", () => {
    render(<Post post={{ ...mockPost, image: undefined }} />);

    const img = screen.getByAltText(mockPost.title);
    expect(img).toHaveAttribute(
      "src",
      "https://via.placeholder.com/800x400?text=No+Image"
    );
  });

  it("navigates to edit page when edit button is clicked", () => {
    renderPost();
    const editLink = screen.getByTitle("Edit post");
    expect(editLink).toHaveAttribute(
      "href",
      `/dashboard/posts/${mockPost.id}/edit`
    );
  });

  it("calls deletePost when delete is confirmed", () => {
    const mockDeletePost = jest.fn();
    (useAppMutations.useAppMutations as jest.Mock).mockImplementation(() => ({
      deletePost: mockDeletePost,
      isError: false,
      error: null,
    }));

    // Mock window.confirm
    const confirmSpy = jest.spyOn(window, "confirm");
    confirmSpy.mockImplementation(() => true);

    renderPost();

    // Find the delete button by its icon
    const deleteButton = screen.getByRole("button", { name: "" });
    fireEvent.click(deleteButton);

    expect(mockDeletePost).toHaveBeenCalledWith(mockPost.id);

    confirmSpy.mockRestore();
  });

  it("shows error message when delete fails", () => {
    const errorMessage = "Failed to delete post";
    (useAppMutations.useAppMutations as jest.Mock).mockImplementation(() => ({
      deletePost: jest.fn(),
      isError: true,
      error: { message: errorMessage },
    }));

    renderPost();

    expect(screen.getByText(`Error: ${errorMessage}`)).toBeInTheDocument();
  });

  it("applies hover styles correctly", () => {
    renderPost();

    const imageContainer = screen.getByAltText(mockPost.title).parentElement;
    expect(imageContainer).toHaveClass("group");

    const overlay = imageContainer?.querySelector("div");
    expect(overlay).toHaveClass(
      "absolute",
      "inset-0",
      "bg-gradient-to-t",
      "from-black/70",
      "to-transparent",
      "opacity-0",
      "transition-opacity",
      "duration-300",
      "group-hover:opacity-100"
    );
  });
});

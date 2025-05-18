import { render, screen } from "../../test/test-utils";
import PostForm from "./PostForm";
import userEvent from "@testing-library/user-event";

// Mock the ImageUpload component since it has complex behavior
jest.mock("./ImageUpload", () => ({
  __esModule: true,
  default: () => (
    <div data-testid="mock-image-upload">Image Upload Component</div>
  ),
}));

describe("PostForm", () => {
  const mockHandleSubmit = jest.fn();
  const mockHandleCancel = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders form with empty values when no post is provided", () => {
    render(
      <PostForm
        handleSubmit={mockHandleSubmit}
        handleCancel={mockHandleCancel}
        isSubmitting={false}
      />
    );

    // Check if form elements are rendered
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/content/i)).toBeInTheDocument();
    expect(screen.getByTestId("mock-image-upload")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /cancel/i })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /create post/i })
    ).toBeInTheDocument();

    // Check if form fields are empty
    expect(screen.getByLabelText(/title/i)).toHaveValue("");
    expect(screen.getByLabelText(/content/i)).toHaveValue("");
  });

  it("renders form with post data when post is provided", () => {
    const post = {
      title: "Test Post Title",
      content: "Test post content",
      image: "test-image.jpg",
    };

    render(
      <PostForm
        handleSubmit={mockHandleSubmit}
        handleCancel={mockHandleCancel}
        post={post}
        isSubmitting={false}
      />
    );

    // Check if form fields have the post data
    expect(screen.getByLabelText(/title/i)).toHaveValue("Test Post Title");
    expect(screen.getByLabelText(/content/i)).toHaveValue("Test post content");
    expect(
      screen.getByRole("button", { name: /update post/i })
    ).toBeInTheDocument();
  });

  it("calls handleSubmit when form is submitted", async () => {
    const user = userEvent.setup();

    render(
      <PostForm
        handleSubmit={mockHandleSubmit}
        handleCancel={mockHandleCancel}
        isSubmitting={false}
      />
    );

    // Fill in form fields
    await user.type(screen.getByLabelText(/title/i), "New Post Title");
    await user.type(screen.getByLabelText(/content/i), "New post content");

    // Submit the form
    await user.click(screen.getByRole("button", { name: /create post/i }));

    // Check if handleSubmit was called
    expect(mockHandleSubmit).toHaveBeenCalledTimes(1);
  });

  it("calls handleCancel when cancel button is clicked", async () => {
    const user = userEvent.setup();

    render(
      <PostForm
        handleSubmit={mockHandleSubmit}
        handleCancel={mockHandleCancel}
        isSubmitting={false}
      />
    );

    // Click the cancel button
    await user.click(screen.getByRole("button", { name: /cancel/i }));

    // Check if handleCancel was called
    expect(mockHandleCancel).toHaveBeenCalledTimes(1);
  });

  it("disables submit button when isSubmitting is true", () => {
    render(
      <PostForm
        handleSubmit={mockHandleSubmit}
        handleCancel={mockHandleCancel}
        isSubmitting={true}
      />
    );

    expect(screen.getByRole("button", { name: /saving/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /saving/i })).toBeDisabled();
  });
});

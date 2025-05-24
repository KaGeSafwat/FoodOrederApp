import { render, screen, fireEvent } from "../../../test/test-utils";
import PostForm from "./PostForm";

// Mock ImageUpload component
jest.mock("../ImageUpload/ImageUpload", () => ({
  __esModule: true,
  default: ({ initialImage }: { initialImage?: string }) => (
    <div data-testid="image-upload">
      Image Upload Component
      {initialImage && <img src={initialImage} alt="uploaded" />}
    </div>
  ),
}));

describe("PostForm", () => {
  const mockProps = {
    handleSubmit: jest.fn((e) => e.preventDefault()),
    handleCancel: jest.fn(),
    isSubmitting: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders form with all required fields", () => {
    render(<PostForm {...mockProps} />);

    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/content/i)).toBeInTheDocument();
    expect(screen.getByTestId("image-upload")).toBeInTheDocument();
  });

  it("submits form with entered data", async () => {
    const { container } = render(<PostForm {...mockProps} />);

    const titleInput = screen.getByLabelText(/title/i);
    const contentInput = screen.getByLabelText(/content/i);
    const form = container.querySelector("form");

    if (!form) {
      throw new Error("Form not found");
    }

    fireEvent.change(titleInput, { target: { value: "Test Title" } });
    fireEvent.change(contentInput, { target: { value: "Test Content" } });
    fireEvent.submit(form);

    expect(mockProps.handleSubmit).toHaveBeenCalled();
  });

  it("loads existing post data when provided", () => {
    const post = {
      title: "Existing Title",
      content: "Existing Content",
      image: "https://example.com/image.jpg",
    };

    render(<PostForm {...mockProps} post={post} />);

    expect(screen.getByLabelText(/title/i)).toHaveValue("Existing Title");
    expect(screen.getByLabelText(/content/i)).toHaveValue("Existing Content");
    expect(screen.getByAltText("uploaded")).toHaveAttribute("src", post.image);
  });

  it("disables submit button when submitting", () => {
    render(<PostForm {...mockProps} isSubmitting={true} />);

    // The Input component doesn't support the disabled attribute for textareas
    // So we check if the submit button is disabled instead
    const submitButton = screen.getByText("Saving...");
    expect(submitButton).toBeDisabled();
  });

  it("calls handleCancel when cancel button is clicked", () => {
    render(<PostForm {...mockProps} />);

    const cancelButton = screen.getByText(/cancel/i);
    fireEvent.click(cancelButton);

    expect(mockProps.handleCancel).toHaveBeenCalled();
  });

  it("requires title and content fields", () => {
    render(<PostForm {...mockProps} />);

    const titleInput = screen.getByLabelText(/title/i);
    const contentInput = screen.getByLabelText(/content/i);

    expect(titleInput).toHaveAttribute("required");
    expect(contentInput).toHaveAttribute("required");
  });

  it("renders content field as textarea with correct rows", () => {
    render(<PostForm {...mockProps} />);

    const contentInput = screen.getByLabelText(/content/i);
    expect(contentInput.tagName.toLowerCase()).toBe("textarea");
    expect(contentInput).toHaveAttribute("rows", "6");
  });
});

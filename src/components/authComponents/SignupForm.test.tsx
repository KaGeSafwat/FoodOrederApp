import { render, screen } from "../../test/test-utils";
import { SignupForm } from "./SignupForm";
import userEvent from "@testing-library/user-event";

describe("SignupForm", () => {
  const mockOnSubmit = jest.fn();
  const mockRenderError = jest.fn().mockReturnValue(null);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders signup form correctly", () => {
    render(
      <SignupForm
        onSubmit={mockOnSubmit}
        renderError={mockRenderError}
        isLoading={false}
        isLogin={false}
      />
    );

    // Check if form elements are rendered
    expect(screen.getByText("Create an account")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email address")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByText("Already have an account?")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Signup" })).toBeInTheDocument();
  });

  it("calls onSubmit with form data when form is submitted", async () => {
    const user = userEvent.setup();

    render(
      <SignupForm
        onSubmit={mockOnSubmit}
        renderError={mockRenderError}
        isLoading={false}
        isLogin={false}
      />
    );

    // Fill in form fields
    await user.type(screen.getByPlaceholderText("Username"), "testuser");
    await user.type(
      screen.getByPlaceholderText("Email address"),
      "test@example.com"
    );
    await user.type(screen.getByPlaceholderText("Password"), "password123");

    // Submit the form
    await user.click(screen.getByRole("button", { name: "Signup" }));

    // Check if onSubmit was called with correct data
    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    expect(mockOnSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        username: "testuser",
        email: "test@example.com",
        password: "password123",
      })
    );
  });

  it("shows loading state when isLoading is true", () => {
    render(
      <SignupForm
        onSubmit={mockOnSubmit}
        renderError={mockRenderError}
        isLoading={true}
        isLogin={false}
      />
    );

    expect(
      screen.getByRole("button", { name: "Loading..." })
    ).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("calls renderError function when provided", () => {
    render(
      <SignupForm
        onSubmit={mockOnSubmit}
        renderError={mockRenderError}
        isLoading={false}
        isLogin={false}
      />
    );

    expect(mockRenderError).toHaveBeenCalledTimes(1);
  });

  it("renders error message when renderError returns content", () => {
    const errorMessage = "Email already in use";
    const mockRenderErrorWithContent = jest
      .fn()
      .mockReturnValue(<div className="error-message">{errorMessage}</div>);

    render(
      <SignupForm
        onSubmit={mockOnSubmit}
        renderError={mockRenderErrorWithContent}
        isLoading={false}
        isLogin={false}
      />
    );

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });
});

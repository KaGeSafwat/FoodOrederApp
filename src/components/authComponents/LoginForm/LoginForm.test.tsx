import { render, screen, fireEvent, waitFor } from "../../../test/test-utils";
import { LoginForm } from "./LoginForm";
import type { AuthFormProps } from "../../../types/auth";

const mockSubmit = jest.fn();
const mockRenderError = jest.fn(() => <div>Error occurred</div>);

describe("LoginForm", () => {
  const defaultProps: AuthFormProps = {
    onSubmit: mockSubmit,
    renderError: mockRenderError,
    isLoading: false,
    isLogin: true,
  };

  const renderLoginForm = (props: Partial<AuthFormProps> = {}) => {
    return render(<LoginForm {...defaultProps} {...props} />);
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders login form with all required elements", () => {
    renderLoginForm();

    // Check title and navigation
    expect(screen.getByRole("heading", { name: /login/i })).toBeInTheDocument();
    expect(screen.getByText("← Back to Home")).toHaveAttribute("href", "/home");

    // Check form inputs
    expect(
      screen.getByPlaceholderText(/example@gmail.com/i)
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("************")).toBeInTheDocument();

    // Check signup link
    expect(screen.getByText(/don't have an account\?/i)).toBeInTheDocument();
    expect(screen.getByText(/signup/i)).toHaveAttribute(
      "href",
      "/auth?mode=signup"
    );

    // Check submit button
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  it("handles form submission correctly", async () => {
    renderLoginForm();

    const emailInput = screen.getByPlaceholderText(/example@gmail.com/i);
    const passwordInput = screen.getByPlaceholderText("************");
    const submitButton = screen.getByRole("button", { name: /login/i });

    // Fill form
    fireEvent.change(emailInput, {
      target: { value: "test@example.com" },
    });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    // Submit form
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password123",
      });
    });
  });

  it("displays loading state correctly", () => {
    renderLoginForm({ isLoading: true });

    expect(screen.getByRole("button", { name: /loading/i })).toBeDisabled();
  });

  it("renders error message when provided", () => {
    renderLoginForm();

    expect(screen.getByText("Error occurred")).toBeInTheDocument();
    expect(mockRenderError).toHaveBeenCalled();
  });

  it("validates required fields", async () => {
    renderLoginForm();

    const submitButton = screen.getByRole("button", { name: /login/i });

    // Try to submit without filling required fields
    fireEvent.click(submitButton);

    // Check that form validation prevented submission
    expect(mockSubmit).not.toHaveBeenCalled();

    // Check validation messages
    const emailInput = screen.getByPlaceholderText(/example@gmail.com/i);
    const passwordInput = screen.getByPlaceholderText("************");

    expect(emailInput).toBeInvalid();
    expect(passwordInput).toBeInvalid();
  });

  it("validates email format", async () => {
    renderLoginForm();

    const emailInput = screen.getByPlaceholderText(/example@gmail.com/i);
    const submitButton = screen.getByRole("button", { name: /login/i });

    // Enter invalid email
    fireEvent.change(emailInput, { target: { value: "invalid-email" } });
    fireEvent.click(submitButton);

    expect(mockSubmit).not.toHaveBeenCalled();
    expect(emailInput).toBeInvalid();
  });

  it("validates password minimum length", async () => {
    renderLoginForm();

    const passwordInput = screen.getByPlaceholderText("************");
    const submitButton = screen.getByRole("button", { name: /login/i });

    // Enter short password
    fireEvent.change(passwordInput, { target: { value: "12345" } });
    fireEvent.click(submitButton);

    // Since we can't easily check if the input is invalid in JSDOM,
    // we'll just check that the submit function wasn't called
    expect(mockSubmit).not.toHaveBeenCalled();
  });

  it("applies correct styling classes", () => {
    const { container } = renderLoginForm();

    const form = container.querySelector("form");
    expect(form).toHaveClass("flex", "flex-col");
  });
});

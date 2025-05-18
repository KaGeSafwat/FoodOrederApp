import { render, screen, fireEvent } from "../test/test-utils";
import { Button } from "./Button";

describe("Button", () => {
  const mockProps = {
    onClick: jest.fn(),
    children: "Test Button",
    className: "test-class",
  };

  it("renders button with children", () => {
    render(<Button {...mockProps} />);
    expect(screen.getByText("Test Button")).toBeInTheDocument();
  });

  it("calls onClick handler when clicked", () => {
    render(<Button {...mockProps} />);
    fireEvent.click(screen.getByRole("button"));
    expect(mockProps.onClick).toHaveBeenCalled();
  });

  it("applies custom className when provided", () => {
    render(<Button {...mockProps} />);
    expect(screen.getByRole("button")).toHaveClass("test-class");
  });

  it("applies disabled attribute when disabled prop is true", () => {
    render(<Button {...mockProps} disabled={true} />);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });

  it("renders with aria-label when provided", () => {
    render(<Button {...mockProps} ariaLabel="Test Button Label" />);
    expect(screen.getByRole("button")).toHaveAttribute(
      "aria-label",
      "Test Button Label"
    );
  });
});

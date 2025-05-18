import { render, screen, fireEvent } from "../test/test-utils";
import Input from "./Input";

describe("Input", () => {
  const mockInputProps = {
    id: "testInput",
    name: "test",
    placeholder: "Test placeholder",
    istextarea: "false" as "false" | "true",
    onChange: jest.fn(),
  };

  const mockTextareaProps = {
    id: "testTextarea",
    name: "testTextarea",
    placeholder: "Test textarea placeholder",
    istextarea: "true" as "true" | "false",
    onChange: jest.fn(),
    rows: 4,
  };

  it("renders input element when istextarea is false", () => {
    render(<Input {...mockInputProps} />);
    expect(screen.getByPlaceholderText("Test placeholder")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Test placeholder").tagName.toLowerCase()
    ).toBe("input");
  });

  it("renders textarea element when istextarea is true", () => {
    render(<Input {...mockTextareaProps} />);
    expect(
      screen.getByPlaceholderText("Test textarea placeholder")
    ).toBeInTheDocument();
    expect(
      screen
        .getByPlaceholderText("Test textarea placeholder")
        .tagName.toLowerCase()
    ).toBe("textarea");
  });

  it("renders label when islabel is true", () => {
    render(<Input {...mockInputProps} islabel="true" />);
    expect(screen.getByText("testInput")).toBeInTheDocument();
    expect(screen.getByLabelText("testInput")).toBeInTheDocument();
  });

  it("does not render label when islabel is not true", () => {
    render(<Input {...mockInputProps} />);
    expect(screen.queryByText("testInput")).not.toBeInTheDocument();
  });

  it("applies custom className when provided with islabel=true", () => {
    const customClass = "custom-input";
    render(
      <Input {...mockInputProps} islabel="true" className={customClass} />
    );
    expect(screen.getByPlaceholderText("Test placeholder")).toHaveClass(
      customClass
    );
  });

  it("calls onChange handler when value changes", () => {
    render(<Input {...mockInputProps} />);
    const input = screen.getByPlaceholderText("Test placeholder");
    fireEvent.change(input, { target: { value: "new value" } });
    expect(mockInputProps.onChange).toHaveBeenCalled();
  });
});

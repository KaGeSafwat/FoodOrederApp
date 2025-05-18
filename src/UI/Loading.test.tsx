import { render, screen } from "../test/test-utils";
import Loading from "./Loading";

describe("Loading", () => {
  it("renders loading spinner with default size", () => {
    render(<Loading />);
    const spinner = screen.getByTestId("loading-spinner");
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass("w-10", "h-10");
  });

  it("renders loading spinner with small size", () => {
    render(<Loading size="small" />);
    const spinner = screen.getByTestId("loading-spinner");
    expect(spinner).toHaveClass("w-5", "h-5");
  });

  it("renders loading spinner with large size", () => {
    render(<Loading size="large" />);
    const spinner = screen.getByTestId("loading-spinner");
    expect(spinner).toHaveClass("w-16", "h-16");
  });

  it("applies custom className when provided", () => {
    const customClass = "custom-spinner";
    render(<Loading className={customClass} />);
    expect(screen.getByTestId("loading-spinner")).toHaveClass(customClass);
  });
});

import { render, screen } from "@testing-library/react";
import Header from "./Header";

// Mock the dependencies
jest.mock("react-router-dom", () => ({
  useNavigate: () => jest.fn(),
}));

jest.mock("../../../UI/Button", () => ({
  Button: ({ children, onClick, className, title }: any) => (
    <button onClick={onClick} className={className} title={title}>
      {children}
    </button>
  ),
}));

jest.mock("react-icons/hi", () => ({
  HiOutlineCalendar: () => <div data-testid="calendar-icon" />,
  HiOutlinePlus: () => <div data-testid="plus-icon" />,
}));

describe("Header", () => {
  it("renders the component", () => {
    render(<Header />);
    expect(screen.getByText("Posts")).toBeInTheDocument();
  });
});

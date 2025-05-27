import { render, screen } from "@testing-library/react";
import Dropdown from "./Dropdown";

// Mock dependencies
jest.mock("firebase/auth", () => ({
  signOut: jest.fn(),
  getAuth: jest.fn(),
}));

jest.mock("../../../firebase.js", () => ({
  auth: {},
}));

jest.mock("react-router-dom", () => ({
  NavLink: ({ children, className }: any) => (
    <a
      href="#"
      className={
        typeof className === "function"
          ? className({ isActive: false })
          : className
      }
    >
      {children}
    </a>
  ),
  useNavigate: () => jest.fn(),
}));

jest.mock("react-redux", () => ({
  useDispatch: () => jest.fn(),
}));

jest.mock("../../../assets/LINK_DATA", () => ({
  DROPDOWN_LINK_DATA: [
    { to: "/dashboard", title: "Dashboard", icon: "📊", end: true },
    { to: "/profile", title: "Profile", icon: "👤", end: false },
  ],
}));

describe("Dropdown", () => {
  it("renders basic component structure", () => {
    render(
      <Dropdown
        user={{
          email: "test@example.com",
          uid: "123",
        }}
      />
    );

    expect(screen.getByText("test@example.com")).toBeInTheDocument();
    expect(screen.getByText("test")).toBeInTheDocument();
    expect(screen.getByText("Sign Out")).toBeInTheDocument();
  });
});

import { render, screen } from "../../../test/test-utils";
import { FormContent } from "./FormContent";

describe("FormContent", () => {
  const renderWithRouter = (ui: React.ReactElement) => {
    return render(ui);
  };

  describe("Login Mode", () => {
    it("renders login form without username field", () => {
      renderWithRouter(<FormContent isLoading={false} isLogin={true} />);

      expect(
        screen.queryByPlaceholderText("AbdElrahman Safwat")
      ).not.toBeInTheDocument();
      expect(
        screen.getByPlaceholderText("example@gmail.com")
      ).toBeInTheDocument();
      expect(screen.getByPlaceholderText("************")).toBeInTheDocument();
      expect(screen.getByText("Don't have an account?")).toBeInTheDocument();
      expect(screen.getByText("Signup")).toBeInTheDocument();
    });

    it("shows correct link to signup page", () => {
      renderWithRouter(<FormContent isLoading={false} isLogin={true} />);

      const signupLink = screen.getByText("Signup");
      expect(signupLink).toHaveAttribute("href", "/auth?mode=signup");
    });
  });

  describe("Signup Mode", () => {
    it("renders signup form with username field", () => {
      renderWithRouter(<FormContent isLoading={false} isLogin={false} />);

      expect(
        screen.getByPlaceholderText("AbdElrahman Safwat")
      ).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText("example@gmail.com")
      ).toBeInTheDocument();
      expect(screen.getByPlaceholderText("************")).toBeInTheDocument();
      expect(screen.getByText("Already have an account?")).toBeInTheDocument();
      expect(screen.getByText("Login")).toBeInTheDocument();
    });

    it("shows correct link to login page", () => {
      renderWithRouter(<FormContent isLoading={false} isLogin={false} />);

      const loginLink = screen.getByText("Login");
      expect(loginLink).toHaveAttribute("href", "/auth?mode=login");
    });
  });

  describe("Loading State", () => {
    it("shows loading text in button when loading", () => {
      renderWithRouter(<FormContent isLoading={true} isLogin={false} />);

      expect(
        screen.getByRole("button", { name: "Loading..." })
      ).toBeInTheDocument();
      expect(screen.getByRole("button")).toBeDisabled();
    });
  });

  describe("Input Validation", () => {
    it("requires email input", () => {
      renderWithRouter(<FormContent isLoading={false} isLogin={true} />);

      const emailInput = screen.getByPlaceholderText("example@gmail.com");
      expect(emailInput).toHaveAttribute("required");
    });

    it("requires password with minimum length", () => {
      renderWithRouter(<FormContent isLoading={false} isLogin={true} />);

      const passwordInput = screen.getByPlaceholderText("************");
      expect(passwordInput).toHaveAttribute("required");
      expect(passwordInput).toHaveAttribute("minLength", "6");
    });
  });
});

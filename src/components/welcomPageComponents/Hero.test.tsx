import { render, screen } from "../../test/test-utils";
import Hero from "./Hero";
import { HERO_LINK_DATA } from "../../assets/LINK_DATA";

// Mock LandingDiagram component
jest.mock("../../UI/LandingDiagram", () => ({
  __esModule: true,
  default: () => <div data-testid="landing-diagram">Landing Diagram</div>,
}));

describe("Hero", () => {
  const renderWithRouter = (ui: React.ReactElement) => {
    return render(ui);
  };

  it("renders main heading and description", () => {
    renderWithRouter(<Hero />);

    expect(
      screen.getByText("Share Your Story with the World")
    ).toBeInTheDocument();
    expect(
      screen.getByText(/A powerful platform for bloggers/)
    ).toBeInTheDocument();
  });

  it("renders all hero links with correct attributes", () => {
    renderWithRouter(<Hero />);

    HERO_LINK_DATA.forEach((link) => {
      const linkElement = screen.getByText(link.title);
      expect(linkElement).toHaveAttribute("href", link.to);
      expect(linkElement).toHaveClass(link.className);
    });
  });

  it("renders landing diagram", () => {
    renderWithRouter(<Hero />);
    expect(screen.getByTestId("landing-diagram")).toBeInTheDocument();
  });

  it("has correct layout classes for responsive design", () => {
    const { container } = renderWithRouter(<Hero />);

    const heroContainer = container.querySelector("div > div");
    expect(heroContainer).toHaveClass(
      "flex",
      "flex-col",
      "lg:flex-row",
      "items-center",
      "gap-8",
      "lg:gap-12"
    );
  });

  it("applies correct text alignment classes", () => {
    const { container } = renderWithRouter(<Hero />);

    const content = container.querySelector("div > div > div");
    expect(content).toHaveClass("text-center", "lg:text-left");
  });

  it("renders links in correct flex layout", () => {
    const { container } = renderWithRouter(<Hero />);

    const linkContainer = container.querySelector("div > div > div > div");
    expect(linkContainer).toHaveClass(
      "flex",
      "flex-col",
      "sm:flex-row",
      "gap-4",
      "justify-center",
      "lg:justify-start"
    );
  });

  it("applies correct text styles to heading and description", () => {
    renderWithRouter(<Hero />);

    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveClass(
      "text-3xl",
      "sm:text-4xl",
      "lg:text-5xl",
      "font-bold",
      "text-white"
    );

    const description = screen.getByText(/A powerful platform/);
    expect(description).toHaveClass(
      "text-base",
      "sm:text-lg",
      "lg:text-xl",
      "text-gray-300"
    );
  });
});

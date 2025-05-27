import { render, screen } from "../../../test/test-utils";
import WelcomeNav from "./WelcomeNav";
import { NAV_LINK_DATA } from "../../../assets/LINK_DATA";

describe("WelcomeNav", () => {
  const renderWithRouter = (ui: React.ReactElement) => {
    return render(ui);
  };

  it("renders logo text", () => {
    renderWithRouter(<WelcomeNav />);
    expect(screen.getByText("BlogDash")).toBeInTheDocument();
  });

  it("renders all navigation links", () => {
    renderWithRouter(<WelcomeNav />);

    NAV_LINK_DATA.forEach((link) => {
      const linkElement = screen.getByText(link.title);
      expect(linkElement).toBeInTheDocument();
      expect(linkElement).toHaveAttribute("href", link.to);
      expect(linkElement).toHaveClass(link.className);
    });
  });

  it("applies correct styles to logo text", () => {
    renderWithRouter(<WelcomeNav />);

    const logo = screen.getByText("BlogDash");
    expect(logo).toHaveClass(
      "text-xl",
      "sm:text-2xl",
      "font-bold",
      "bg-gradient-to-r",
      "from-blue-400",
      "to-purple-500",
      "bg-clip-text",
      "text-transparent"
    );
  });

  it("renders links container with correct spacing", () => {
    renderWithRouter(<WelcomeNav />);

    const linksContainer = screen
      .getByRole("navigation")
      .querySelector(".flex.items-center.space-x-2");
    expect(linksContainer).toHaveClass(
      "flex",
      "items-center",
      "space-x-2",
      "sm:space-x-4"
    );
  });

  it("renders links in correct order", () => {
    renderWithRouter(<WelcomeNav />);

    const links = screen.getAllByRole("link");
    NAV_LINK_DATA.forEach((link, index) => {
      expect(links[index]).toHaveTextContent(link.title);
    });
  });
});

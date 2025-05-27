import { render, screen } from "../../../test/test-utils";
import CTA from "./CTA";

describe("CTA Component", () => {
  it("renders CTA component", () => {
    render(<CTA />);

    // Check if the main heading is present
    const heading = screen.getByText(/Ready to Start Your Blog?/i);
    expect(heading).toBeInTheDocument();

    // Check if the subheading is present
    const subheading = screen.getByText(
      /Join our community of writers and share your stories with the world./i
    );
    expect(subheading).toBeInTheDocument();

    // Check if the buttons are present
    const buttons = screen.getAllByRole("link");
    expect(buttons.length).toBe(2); // Assuming there are 2 buttons
  });
});

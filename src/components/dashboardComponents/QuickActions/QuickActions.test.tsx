import { render, screen } from "../../../test/test-utils";
import QuickActions from "./QuickActions";

describe("QuickActions", () => {
  const renderWithRouter = (ui: React.ReactElement) => {
    return render(ui);
  };

  it("renders the Quick Actions section title", () => {
    renderWithRouter(<QuickActions />);
    expect(screen.getByText("Quick Actions")).toBeInTheDocument();
  });

  it("renders all quick action cards with correct content", () => {
    renderWithRouter(<QuickActions />);

    // Check for all action titles
    expect(screen.getByText("Create New Post")).toBeInTheDocument();
    expect(screen.getByText("Manage Posts")).toBeInTheDocument();
    expect(screen.getByText("View Analytics")).toBeInTheDocument();

    // Check for all action descriptions
    expect(
      screen.getByText("Share your thoughts with the world")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Edit or delete your existing posts")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Track your content performance")
    ).toBeInTheDocument();
  });

  it("renders action cards with correct navigation links", () => {
    renderWithRouter(<QuickActions />);

    const [createPost, managePosts, viewAnalytics] =
      screen.getAllByRole("link");

    expect(createPost).toHaveAttribute("href", "/dashboard/new-post");
    expect(managePosts).toHaveAttribute("href", "/dashboard/posts");
    expect(viewAnalytics).toHaveAttribute("href", "/dashboard/posts");
  });

  it("renders icons for all action cards", () => {
    renderWithRouter(<QuickActions />);

    const createPostIcon = screen.getByTestId("create-post-icon");
    const managePostsIcon = screen.getByTestId("manage-posts-icon");
    const analyticsIcon = screen.getByTestId("analytics-icon");

    expect(createPostIcon).toHaveClass("text-blue-600", "dark:text-blue-400");
    expect(managePostsIcon).toHaveClass(
      "text-purple-600",
      "dark:text-purple-400"
    );
    expect(analyticsIcon).toHaveClass("text-green-600", "dark:text-green-400");
  });

  it("renders with correct grid layout", () => {
    renderWithRouter(<QuickActions />);

    const gridContainer = screen.getByTestId("quick-actions-grid");
    expect(gridContainer).toHaveClass(
      "grid",
      "grid-cols-1",
      "sm:grid-cols-2",
      "md:grid-cols-3",
      "gap-4"
    );
  });
});

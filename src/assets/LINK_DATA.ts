type LinkData = {
  to: string;
  title: string;
  className: string;
};
export const CTA_LINK_DATA: LinkData[] = [
  {
    to: "/auth?mode=signup",
    title: "Create Account",
    className:
      "px-6 sm:px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium rounded-lg hover:opacity-90 transition-opacity",
  },
  {
    to: "/auth?mode=login",
    title: "Login",
    className:
      "px-6 sm:px-8 py-3 bg-gray-700 text-gray-300 font-medium rounded-lg hover:bg-gray-600 transition-colors",
  },
];

export const HERO_LINK_DATA: LinkData[] = [
  {
    to: "/auth?mode=signup",
    title: "Create Account",
    className:
      "px-6 sm:px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium rounded-lg hover:opacity-90 transition-opacity",
  },
  {
    to: "/auth?mode=login",
    title: "Login",
    className:
      "px-6 sm:px-8 py-3 bg-gray-700 text-gray-300 font-medium rounded-lg hover:bg-gray-600 transition-colors",
  },
];

export const NAV_LINK_DATA: LinkData[] = [
  {
    to: "/auth?mode=login",
    title: "Login",
    className:
      "text-gray-300 hover:text-white px-2 sm:px-3 py-2 rounded-md text-sm font-medium transition-colors",
  },
  {
    to: "/auth?mode=signup",
    title: "Sign Up",
    className:
      "bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 sm:px-4 py-2 rounded-md text-sm font-medium hover:opacity-90 transition-opacity",
  },
];

type NavLinkData = {
  to: string;
  title: string;
  className?: string;
  end?: boolean;
  icon: string;
};
export const DROPDOWN_LINK_DATA: NavLinkData[] = [
  {
    to: "/dashboard",
    title: "Dashboard",
    end: true,
    icon: "📊",
  },
  {
    to: "/dashboard/posts",
    title: "Posts",
    icon: "📝",
  },
  {
    to: "/dashboard/new-post",
    title: "New Post",
    icon: "✏️",
  },
];

import DarkMode from "../DarkMode/DarkMode";
import UserMenu from "../UserMenu/UserMenu";

export default function RightNav() {
  return (
    <ul className="flex items-center space-x-2 md:space-x-4">
      {/* Dark mode toggle */}
      <DarkMode />

      {/* User menu */}
      <UserMenu />
    </ul>
  );
}

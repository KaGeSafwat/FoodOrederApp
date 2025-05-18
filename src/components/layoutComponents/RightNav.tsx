import DarkMode from "./DarkMode";
import UserMenu from "./UserMenu";

export default function RightNav() {
  return (
    <div className="flex items-center space-x-4">
      {/* Dark mode toggle */}
      <DarkMode />

      {/* User menu */}
      <UserMenu />
    </div>
  );
}

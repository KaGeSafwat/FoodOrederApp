import { rightNavActions } from '../../store/slices/rightNavSlice.js';
import Dropdown from './Dropdown.js';
import { useAppDispatch, useAppSelector } from '../../store/hooks.ts';

export default function UserMenu() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const dispatch = useAppDispatch();
  const { isUserMenuOpen } = useAppSelector((state) => state.rightNav);

  const toggleUserMenu = () => {
    dispatch(rightNavActions.setIsUserMenuOpen(!isUserMenuOpen));
  };

  const username = user?.email.split('@')[0];
  return (
    <div className="relative">
      <button
        onClick={toggleUserMenu}
        className="flex items-center space-x-2 p-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
      >
        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
          {user?.email?.charAt(0).toUpperCase() || 'U'}
        </div>
        <span className="text-sm font-medium">{username}</span>
      </button>

      {/* Dropdown menu */}
      {isUserMenuOpen && <Dropdown user={user} />}
    </div>
  );
}

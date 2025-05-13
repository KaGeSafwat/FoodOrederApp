import { HiOutlineCalendar, HiOutlinePlus } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();
  const handleCreatePost = () => {
    navigate('/dashboard/new-post');
  };
  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-semibold text-blue-900 dark:text-white flex items-center gap-2">
        <HiOutlineCalendar className="inline-block text-blue-900 dark:text-blue-400" />
        Posts
      </h2>

      <button
        onClick={handleCreatePost}
        className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors flex items-center gap-2"
        title="Create new post"
      >
        <HiOutlinePlus className="w-5 h-5" />
        <span>New Post</span>
      </button>
    </div>
  );
}

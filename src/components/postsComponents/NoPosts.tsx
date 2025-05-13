import {
  HiOutlinePhotograph,
  HiOutlinePencilAlt,
  HiOutlineDocumentAdd,
} from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

export default function NoPosts() {
  const navigate = useNavigate();
  const handleCreatePost = () => {
    navigate('/dashboard/new-post');
  };
  const handleGoToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="col-span-3 text-center py-12">
      <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8 border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col items-center">
          <div className="text-blue-500 dark:text-blue-400 mb-6 bg-blue-100 dark:bg-blue-900/30 p-5 rounded-full">
            <HiOutlinePhotograph className="h-20 w-20" />
          </div>

          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            No posts found
          </h3>

          <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-xs text-center">
            Create your first post to start sharing your content with the world
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xs">
            <button
              onClick={handleCreatePost}
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg w-full"
            >
              <HiOutlineDocumentAdd className="h-5 w-5" />
              <span>Create New Post</span>
            </button>

            <button
              onClick={handleGoToDashboard}
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all border border-gray-200 dark:border-gray-600 w-full"
            >
              <HiOutlinePencilAlt className="h-5 w-5" />
              <span>Go to Dashboard</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

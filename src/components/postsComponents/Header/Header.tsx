import { HiOutlineCalendar, HiOutlinePlus } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../UI/Button";

export default function Header() {
  const navigate = useNavigate();
  const handleCreatePost = () => {
    navigate("/dashboard/new-post");
  };
  return (
    <section className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-semibold text-blue-900 dark:text-white flex items-center gap-2">
        <HiOutlineCalendar
          data-testid="calendar-icon"
          className="inline-block text-blue-900 dark:text-blue-400"
        />
        Posts
      </h1>

      <Button
        onClick={handleCreatePost}
        className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors flex items-center gap-2"
        title="Create new post"
      >
        <HiOutlinePlus data-testid="plus-icon" className="w-5 h-5" />
        <span>New Post</span>
      </Button>
    </section>
  );
}

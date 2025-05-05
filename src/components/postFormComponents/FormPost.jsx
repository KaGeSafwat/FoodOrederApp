import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { newPostActions } from "../../store/slices/newPostSlice";
import ImageUpload from "./ImageUpload";
import Input from "../../UI/Input";
import { useEffect } from "react";

export default function PostForm({
  handleSubmit,
  post = {},
  isSubmitting = false,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // Clear image preview when component unmounts
    return () => {
      dispatch(newPostActions.setImagePreview(null));
      dispatch(newPostActions.setIsImageUrl(false));
    };
  }, [dispatch]);

  const handleCancel = () => {
    navigate("/dashboard/posts");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title Input */}
      <div>
        <Input
          isLabel
          id="title"
          placeholder="Enter post title"
          type="text"
          name="title"
          required
          defaultValue={post.title || ""}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors"
        />
      </div>

      {/* Content Textarea */}
      <div>
        <Input
          isLabel
          id="content"
          isTextArea
          name="content"
          required
          rows="6"
          defaultValue={post.content || ""}
          placeholder="Write your post content here..."
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors resize-none"
        />
      </div>

      {/* Image Upload */}
      <ImageUpload initialImage={post.image} />

      {/* Submit Button */}
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={handleCancel}
          className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 dark:hover:from-blue-600 dark:hover:to-purple-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Saving..." : post.id ? "Update Post" : "Create Post"}
        </button>
      </div>
    </form>
  );
}

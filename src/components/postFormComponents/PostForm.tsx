import ImageUpload from "./ImageUpload";
import Input from "../../UI/Input";
import { type FormEvent } from "react";
type PostFormProps = {
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  handleCancel: () => void;
  post?: { title?: string; content?: string; image?: string };
  isSubmitting?: boolean;
};

export default function PostForm({
  handleSubmit,
  handleCancel,
  post = {},
  isSubmitting = false,
}: PostFormProps) {
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title Input */}
      <div>
        <Input
          istextarea="true"
          islabel="true"
          id="Title"
          placeholder="Enter post title"
          name="title"
          required
          defaultValue={post.title || ""}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors dark:placeholder:text-slate-100 placeholder:text-slate-900"
        />
      </div>

      {/* Content Textarea */}
      <div>
        <Input
          islabel="true"
          id="Content"
          istextarea="true"
          name="content"
          required
          rows={6}
          defaultValue={post.content || ""}
          placeholder="Write your post content here..."
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors resize-none dark:placeholder:text-slate-100 placeholder:text-slate-900"
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
          {isSubmitting
            ? "Saving..."
            : post.title
            ? "Update Post"
            : "Create Post"}
        </button>
      </div>
    </form>
  );
}

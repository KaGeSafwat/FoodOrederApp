import { type FormEvent, type ChangeEvent, useRef, useEffect } from 'react';
import { newPostActions } from '../../store/slices/newPostSlice.ts';
import { useAppDispatch, useAppSelector } from '../../store/hooks.ts';

export default function ImageUpload({
  initialImage,
}: {
  initialImage?: string;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const { imagePreview, error, imageUrl } = useAppSelector(
    (state) => state.newPost
  );

  // Set initial image if provided
  useEffect(() => {
    if (initialImage) {
      dispatch(newPostActions.setImagePreview(initialImage));

      if (initialImage.startsWith('http')) {
        dispatch(newPostActions.setIsImageUrl(true));
        dispatch(newPostActions.setImageUrl(initialImage));
      }
    }
  }, [initialImage, dispatch]);

  // Handle file upload
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(newPostActions.setError(null));
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      dispatch(newPostActions.setError('Please select an image file'));
      return;
    }

    // Read and set image
    const reader = new FileReader();
    reader.onload = () => {
      dispatch(newPostActions.setImagePreview(reader.result));
      dispatch(newPostActions.setIsImageUrl(false));
    };
    reader.readAsDataURL(file);
  };

  // Handle URL input change
  const handleUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(newPostActions.setImageUrl(e.target.value));
  };

  // Handle URL submission
  const handleUrlSubmit = (
    e: FormEvent<HTMLFormElement | HTMLButtonElement>
  ) => {
    e.preventDefault?.();
    dispatch(newPostActions.setError(null));

    // Validate URL
    if (!imageUrl) {
      dispatch(newPostActions.setError('Please enter an image URL'));
      return;
    }

    if (!imageUrl.match(/^https?:\/\/.+\..+/)) {
      dispatch(newPostActions.setError('Please enter a valid URL'));
      return;
    }

    // Validate image URL
    const img = new Image();
    img.onload = () => {
      dispatch(newPostActions.setImagePreview(imageUrl));
      dispatch(newPostActions.setIsImageUrl(true));
      dispatch(newPostActions.setError(null));
    };
    img.onerror = () => {
      dispatch(
        newPostActions.setError(
          'The URL does not point to a valid image. Please try another URL.'
        )
      );
    };
    img.src = imageUrl;
  };

  // Handle image removal
  const handleRemoveImage = () => {
    dispatch(newPostActions.setImagePreview(null));
    dispatch(newPostActions.setIsImageUrl(false));
    dispatch(newPostActions.setImageUrl(''));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-4">
      <label className="block text-gray-700 dark:text-gray-200 font-medium mb-1">
        Image
      </label>

      {/* Image Preview */}
      {imagePreview && (
        <div className="mb-4">
          <div className="relative w-full h-48 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-full object-contain"
              onError={() => {
                dispatch(newPostActions.setError('Error loading image'));
                dispatch(newPostActions.setImagePreview(null));
              }}
              onLoad={() => {
                if (error) dispatch(newPostActions.setError(null));
              }}
            />
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && <div className="text-red-500 text-sm mb-2">{error}</div>}

      {/* File Upload */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Upload from device
        </label>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="block w-full text-sm text-gray-500 dark:text-gray-400
            file:mr-4 file:py-2 file:px-4
            file:rounded-lg file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            dark:file:bg-blue-900/20 dark:file:text-blue-400
            hover:file:bg-blue-100 dark:hover:file:bg-blue-900/30
            transition-colors"
        />
      </div>

      {/* URL Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Or add image URL
        </label>
        <div className="flex">
          <input
            type="text"
            value={imageUrl}
            onChange={handleUrlChange}
            placeholder="https://example.com/image.jpg"
            className="flex-grow px-4 py-2 rounded-l-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors"
          />
          <button
            type="submit"
            onClick={handleUrlSubmit}
            className="px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-r-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

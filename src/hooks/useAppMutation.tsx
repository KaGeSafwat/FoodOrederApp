import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  queryClient,
  createPost,
  updatePost,
  deletePost,
  type Post,
  type PostsData,
  type PostInput,
} from "../utils/fetch";
import { useNavigate } from "react-router";
import { useAppDispatch } from "../store/hooks";
import { newPostActions } from "../store/slices/newPostSlice";

export const useAppMutations = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Create mutation with optimistic update
  const createMutation = useMutation({
    mutationFn: createPost,
    onMutate: async (newPost: PostInput) => {
      await queryClient.cancelQueries({ queryKey: ["posts"] });
      const previousPosts = queryClient.getQueryData<PostsData>(["posts"]);

      const optimisticPost = {
        ...newPost,
        id: `temp-${Date.now()}`,
        createdAt: new Date().toISOString(),
      };

      queryClient.setQueryData<PostsData>(["posts"], (old) => {
        if (!old)
          return {
            posts: [optimisticPost],
            totalPosts: 1,
            totalPages: 1,
            currentPage: 1,
          };

        return {
          ...old,
          posts: [optimisticPost, ...old.posts],
          totalPosts: old.totalPosts + 1,
        };
      });

      return { previousPosts };
    },
    onError: (err, _, context) => {
      if (context?.previousPosts) {
        queryClient.setQueryData(["posts"], context.previousPosts);
      }
      toast.error(`Failed to create post: ${err.message}`);
    },
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: ["posts"] });
      dispatch(newPostActions.setImagePreview(null));
      toast.success("Post created successfully!");
      navigate("/dashboard/posts");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  // Update mutation with optimistic update
  const updateMutation = useMutation({
    mutationFn: updatePost,
    onMutate: async (updatedPost: Post) => {
      await queryClient.cancelQueries({ queryKey: ["posts"] });
      await queryClient.cancelQueries({ queryKey: ["post", updatedPost.id] });

      const previousPosts = queryClient.getQueryData<PostsData>(["posts"]);
      const previousPost = queryClient.getQueryData<Post>([
        "post",
        updatedPost.id,
      ]);

      // Optimistically update both posts list and single post
      queryClient.setQueryData<Post>(["post", updatedPost.id], updatedPost);
      queryClient.setQueryData<PostsData>(["posts"], (old) => {
        if (!old) return old;
        return {
          ...old,
          posts: old.posts.map((post) =>
            post.id === updatedPost.id ? updatedPost : post
          ),
        };
      });

      return { previousPosts, previousPost };
    },
    onError: (err, _, context) => {
      if (context?.previousPost) {
        queryClient.setQueryData(
          ["post", context.previousPost.id],
          context.previousPost
        );
      }
      if (context?.previousPosts) {
        queryClient.setQueryData(["posts"], context.previousPosts);
      }
      toast.error(`Failed to update post: ${err.message}`);
    },
    onSuccess: (_, updatedPost) => {
      // queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["post", updatedPost.id] });
      toast.success("Post updated successfully!");
      navigate("/dashboard/posts");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  // Delete mutation with optimistic update
  const deleteMutation = useMutation({
    mutationFn: deletePost,
    onMutate: async (postId: string) => {
      await queryClient.cancelQueries({ queryKey: ["posts"] });
      const previousPosts = queryClient.getQueryData<PostsData>(["posts"]);

      // Optimistically remove post from list
      queryClient.setQueryData<PostsData>(["posts"], (old) => {
        if (!old) return old;
        return {
          ...old,
          posts: old.posts.filter((post) => post.id !== postId),
          totalPosts: old.totalPosts - 1,
        };
      });

      return { previousPosts };
    },
    onError: (err, _, context) => {
      if (context?.previousPosts) {
        queryClient.setQueryData(["posts"], context.previousPosts);
      }
      toast.error(`Failed to delete post: ${err.message}`);
    },
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast.success("Post deleted successfully!");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  return {
    createPost: createMutation.mutate,
    updatePost: updateMutation.mutate,
    deletePost: deleteMutation.mutate,
    error: createMutation.error || updateMutation.error || deleteMutation.error,
    isError:
      createMutation.isError ||
      updateMutation.isError ||
      deleteMutation.isError,
    isLoading:
      createMutation.isPending ||
      updateMutation.isPending ||
      deleteMutation.isPending,
  };
};

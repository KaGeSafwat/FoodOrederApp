import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient();

// Firebase database URL
const FIREBASE_DB_URL = 'https://dashboard-ea48b-default-rtdb.firebaseio.com';

// Define TypeScript interfaces
export interface Post {
  id: string;
  title: string;
  content: string;
  image?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface PostInput {
  title: string;
  content: string;
  image?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface PostUpdateInput extends PostInput {
  id: string;
}

export interface PostsData {
  posts: Post[];
  totalPosts: number;
  totalPages: number;
  currentPage: number;
}

export interface GetPostsParams {
  signal?: AbortSignal;
  searchTerm?: string;
  page?: number;
  limit?: number;
}

// Custom error class with additional properties
export class AppError extends Error {
  info?: Record<string, unknown>;
  status?: number;

  constructor(message: string) {
    super(message);
    this.name = 'AppError';
  }
}

export async function createPost(postData: PostInput): Promise<Post> {
  const response = await fetch(`${FIREBASE_DB_URL}/posts.json`, {
    method: 'POST',
    body: JSON.stringify(postData),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = new AppError(
      `Failed to create post: ${response.status} ${response.statusText}`
    );
    error.info = await response.json().catch(() => ({}));
    error.status = response.status;
    throw error;
  }

  const data = await response.json();
  // Firebase returns { name: "-MXYZ123" } where name is the new ID
  return { id: data.name, ...postData };
}

export async function getPosts({
  signal,
  searchTerm,
  page = 1,
  limit = 4,
}: GetPostsParams = {}): Promise<PostsData> {
  let url = `${FIREBASE_DB_URL}/posts.json`;
  if (searchTerm) {
    url += `?orderBy="title"&startAt="${searchTerm}"&endAt="${searchTerm}\uf8ff"`;
  }

  const response = await fetch(url, { signal });
  if (!response.ok) {
    const error = new AppError(
      `Failed to fetch posts: ${response.status} ${response.statusText}`
    );
    error.info = await response.json().catch(() => ({}));
    error.status = response.status;
    throw error;
  }

  const data = await response.json();

  // Firebase returns null if there are no posts
  if (!data) {
    return { posts: [], totalPosts: 0, totalPages: 0, currentPage: page };
  }

  // Convert Firebase object to array
  const postsArray =
    typeof data === 'object' && data !== null
      ? Object.keys(data).map((key) => ({ id: key, ...data[key] }))
      : [];

  // Sort posts by createdAt date (newest first)
  postsArray.sort(
    (a, b) =>
      new Date(b.createdAt || 0).getTime() -
      new Date(a.createdAt || 0).getTime()
  );

  // Calculate pagination values
  const totalPosts = postsArray.length;
  const totalPages = Math.ceil(totalPosts / limit);

  // Apply pagination
  const startIndex = (page - 1) * limit;
  const paginatedPosts = postsArray.slice(startIndex, startIndex + limit);

  return {
    posts: paginatedPosts,
    totalPosts,
    totalPages,
    currentPage: page,
  };
}

// Get a single post by ID
export const getPostById = async (id: string): Promise<Post | null> => {
  const response = await fetch(`${FIREBASE_DB_URL}/posts/${id}.json`);
  if (!response.ok) {
    const error = new AppError(
      `Failed to fetch post: ${response.status} ${response.statusText}`
    );
    error.status = response.status;
    throw error;
  }
  const data = await response.json();
  return data ? { id, ...data } : null;
};

// Update an existing post
export const updatePost = async (postData: PostUpdateInput): Promise<Post> => {
  const { id, ...data } = postData;
  const response = await fetch(`${FIREBASE_DB_URL}/posts/${id}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = new AppError(
      `Failed to update post: ${response.status} ${response.statusText}`
    );
    error.status = response.status;
    throw error;
  }

  return { id, ...data };
};

// Delete a post
export const deletePost = async (
  id: string
): Promise<{ success: boolean; id: string }> => {
  const response = await fetch(`${FIREBASE_DB_URL}/posts/${id}.json`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const error = new AppError(
      `Failed to delete post: ${response.status} ${response.statusText}`
    );
    error.status = response.status;
    throw error;
  }

  return { success: true, id };
};

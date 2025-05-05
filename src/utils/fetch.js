import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

// Firebase database URL
const FIREBASE_DB_URL = "https://dashboard-ea48b-default-rtdb.firebaseio.com";

export async function createPost(postData) {
  const response = await fetch(`${FIREBASE_DB_URL}/posts.json`, {
    method: "POST",
    body: JSON.stringify(postData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const error = new Error(
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
} = {}) {
  let url = `${FIREBASE_DB_URL}/posts.json`;
  if (searchTerm) {
    url += `?orderBy="title"&startAt="${searchTerm}"&endAt="${searchTerm}\uf8ff"`;
  }

  const response = await fetch(url, { signal });
  if (!response.ok) {
    const error = new Error(
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
    typeof data === "object" && data !== null
      ? Object.keys(data).map((key) => ({ id: key, ...data[key] }))
      : [];

  // Sort posts by createdAt date (newest first)
  postsArray.sort(
    (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
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
export const getPostById = async (id) => {
  const response = await fetch(`${FIREBASE_DB_URL}/posts/${id}.json`);
  if (!response.ok) {
    const error = new Error(
      `Failed to fetch post: ${response.status} ${response.statusText}`
    );
    error.status = response.status;
    throw error;
  }
  const data = await response.json();
  return data ? { id, ...data } : null;
};

// Update an existing post
export const updatePost = async (postData) => {
  const { id, ...data } = postData;
  const response = await fetch(`${FIREBASE_DB_URL}/posts/${id}.json`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = new Error(
      `Failed to update post: ${response.status} ${response.statusText}`
    );
    error.status = response.status;
    throw error;
  }

  return { id, ...data };
};

// Delete a post
export const deletePost = async (id) => {
  const response = await fetch(`${FIREBASE_DB_URL}/posts/${id}.json`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const error = new Error(
      `Failed to delete post: ${response.status} ${response.statusText}`
    );
    error.status = response.status;
    throw error;
  }

  return { success: true, id };
};

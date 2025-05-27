import { useQuery } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { getPosts } from "../utils/fetch.ts";
import Pagination from "../components/postsComponents/Pagination/Pagination.tsx";
import NoPosts from "../components/postsComponents/NoPosts/NoPosts.tsx";
import Loading from "../UI/Loading.tsx";
import Post from "../components/postsComponents/Post/Post.tsx";
import Header from "../components/postsComponents/Header/Header.tsx";

export default function Posts() {
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch posts data
  const {
    data: postsData = {
      posts: [],
      totalPosts: 0,
      totalPages: 0,
      currentPage: 1,
    },
    error: error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["posts", currentPage],
    queryFn: () => getPosts({ page: currentPage, limit: 4 }),
    staleTime: 60000, // 1 minute
    retry: 2,
    retryDelay: 1000,
    refetchOnWindowFocus: false,
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0); // Scroll to top when changing pages
  };

  const renderLoading = useCallback(() => {
    if (isLoading) {
      return (
        <div className="py-12">
          <Loading size="large" text="Loading Posts..." />
        </div>
      );
    }
  }, [isLoading]);

  const renderError = useCallback(() => {
    if (error) {
      return (
        <div className="bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 p-4 rounded-lg mb-4">
          <h2 className="font-medium">Error:</h2>
          <p>{error.message}</p>
          <button
            onClick={() => refetch}
            className="mt-2 text-red-700 dark:text-red-400 underline hover:no-underline"
          >
            Try again
          </button>
        </div>
      );
    }
  }, [error]);

  const renderPosts = useCallback(() => {
    if (!isLoading && !error) {
      return (
        <>
          {postsData?.posts && postsData.posts.length > 0 ? (
            <>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {postsData.posts.map((post) => (
                  <li key={post.id}>
                    <Post post={post} />
                  </li>
                ))}
              </ul>
              {/* Post count and pagination */}
              <div className="flex flex-col sm:flex-row justify-between items-center border-t border-gray-200 dark:border-gray-700 pt-4">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 sm:mb-0">
                  Showing{" "}
                  <span className="font-medium">
                    {postsData.posts?.length || 0}
                  </span>{" "}
                  of{" "}
                  <span className="font-medium">
                    {postsData.totalPosts || 0}
                  </span>{" "}
                  posts
                </p>

                {postsData?.totalPages > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={postsData.totalPages}
                    onPageChange={handlePageChange}
                  />
                )}
              </div>
            </>
          ) : (
            <div className="col-span-2">
              <NoPosts />
            </div>
          )}
        </>
      );
    }
  }, [isLoading, error, postsData]);

  return (
    <>
      {/* Header */}
      <Header />

      {/* Posts content */}
      <section className="bg-gray-50 dark:bg-gray-900/20 p-6 rounded-xl shadow-sm">
        {renderLoading()}

        {renderError()}

        {renderPosts()}
      </section>
    </>
  );
}

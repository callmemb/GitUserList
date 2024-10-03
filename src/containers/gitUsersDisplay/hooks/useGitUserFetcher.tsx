import { useInfiniteQuery } from "@tanstack/react-query";

const usersPerPage = 50;
const getGitUsersSearchUrl = (searchValue: string, pageNumber: number) =>
  `https://api.github.com/search/users?q=${searchValue}&page=${pageNumber}&per_page=${usersPerPage}`;



export default function useGitUserFetcher(searchValue: string) {
  const { data, error, isFetching, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["gitUsers", searchValue],
      queryFn: async ({ pageParam }) => {
        const pageNumber = pageParam;
        return fetch(getGitUsersSearchUrl(searchValue, pageParam))
          .then((resp) => {
            if (resp.ok) {
              return resp.json();
            }
            throw new Error(`${resp.status}`);
          })
          .then((resp) => ({
            ...resp,
            pageNumber,
          }));
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        return lastPage?.items?.length === usersPerPage
          ? (lastPage.pageNumber || 0) + 1
          : null;
      },
    });

  const users = data?.pages?.flatMap((d) => d.items || []) || [];
  const hasMore = !isFetching && hasNextPage;

  return {
    users,
    isLoading: isFetching,
    hasMore,
    getMore: fetchNextPage,
    error,
  };
}

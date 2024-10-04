import { useInfiniteQuery } from "@tanstack/react-query";

const usersPerPage = 50;
const getGitUsersSearchUrl = (searchValue: string, pageNumber: number) => {
  const params = {
    page: `${pageNumber}`,
    per_page: `${usersPerPage}`,
    ...(searchValue ? { q: searchValue } : {}),
  };

  return `https://api.github.com/search/users?${new URLSearchParams(
    params
  ).toString()}`;
};

export type GitUserType = {
  id: string;
  login: string;
  avatar_url: string;
};

export default function useGitUserFetcher(searchValue: string) {
  const { data, error, isFetching, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["gitUsers", searchValue ],
      queryFn: async ({ pageParam }) => {
        const pageNumber = pageParam;
        if(!searchValue){
          return {
            pages:[]
          }
        }
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

  const users = (data?.pages?.flatMap((d) => d.items || []) ||
    []) as GitUserType[];
  const hasMore = !isFetching && hasNextPage;

  return {
    users,
    isLoading: isFetching,
    hasMore,
    getMore: fetchNextPage,
    error,
  };
}

import { Alert, Box } from "@mui/material";
import useGitUserFetcher from "./hooks/useGitUserFetcher";
import useSearchInputBuilder from "./hooks/useSearchInputBuilder";
import InfiniteScroll from "../../components/InfiniteScroll";
import LoadingList from "../../components/LoadingList";
import UserListItem from "./components/UserListItem";
import UserSkeleton from "./components/UserSkeleton";

export default function GitUsersDisplay() {
  const { inputNode, inputValue } = useSearchInputBuilder();
  const { users, isLoading, hasMore, getMore, error } =
    useGitUserFetcher(inputValue);

  return (
    <Box
      sx={{
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        overflowY: "clip",
      }}
    >
      <Box sx={{ width: "100%", padding: ".5rem .5rem 1rem" }}>{inputNode}</Box>

      {error ? (
        <Alert sx={{ margin: "1rem" }} severity="error">{`${error}`}</Alert>
      ) : null}

      <InfiniteScroll getMore={getMore} hasMore={hasMore}>
        {/** LoadingList
         * Ciekawa (i użyteczna) technika
         * związaną z programowaniem funkcyjnym
         **/}
        <LoadingList
          list={users}
          isLoading={isLoading}
          itemRender={(user) => <UserListItem key={user.id} data={user} />}
          noResultsRender={"No Result"}
          loadingRender={<UserSkeleton />}
        />
      </InfiniteScroll>
    </Box>
  );
}

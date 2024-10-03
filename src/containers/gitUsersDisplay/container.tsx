import { Alert, Box } from "@mui/material";
import useGitUserFetcher from "./hooks/useGitUserFetcher";
import useSearchInputBuilder from "./hooks/useSearchInputBuilder";
import UserList from "./components/UserList";
import InfiniteScroll from "./components/InfiniteScroll";

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
      <Box sx={{ width: "100%", padding: "1rem" }}>{inputNode}</Box>

      {error ? <Alert severity="error">{`${error}`}</Alert> : null}

      <InfiniteScroll getMore={getMore} hasMore={hasMore}>
        <UserList users={users} isLoading={isLoading} />
      </InfiniteScroll>
    </Box>
  );
}

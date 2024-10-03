import { TextField } from "@mui/material";

export default function useSearchInputBuilder() {
  const searchNode = (
    <TextField fullWidth id="search-input" label="Search" variant="outlined" />
  );

  return {
    inputNode: searchNode,
    inputValue: "asd",
  };
}

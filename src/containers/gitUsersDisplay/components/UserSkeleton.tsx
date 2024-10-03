import { ListItem, ListItemAvatar, ListItemText, Skeleton } from "@mui/material";

export default function UserSkeleton() {
  return (
    <ListItem alignItems="center">
      <ListItemAvatar>
        <Skeleton variant="circular" width={40} height={40} />
      </ListItemAvatar>
      <ListItemText
        primary={
          <Skeleton
            variant="text"
            sx={{ fontSize: "1rem", flex: 1 }}
          />
        }
      />
    </ListItem>
  );
}

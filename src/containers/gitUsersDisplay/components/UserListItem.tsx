import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";

export type UserType = {
  id: string;
  login: string;
  avatar_url: string;
};

type Props = {
  data: UserType;
};
export default function UserListItem({ data }: Props) {
  return (
    <ListItem alignItems="center">
      <ListItemAvatar>
        <Avatar alt={`${data.login} avatar`} src={data.avatar_url} />
      </ListItemAvatar>
      <ListItemText primary={data.login} />
    </ListItem>
  );
}

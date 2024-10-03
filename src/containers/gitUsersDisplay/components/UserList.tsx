import { List } from "@mui/material";
import UserSkeleton from "./UserSkeleton";
import UserListItem, { UserType } from "./UserListItem";
import NoResult from "./NoResult";

type Props = {
  users: UserType[];
  isLoading: boolean;
};
export default function UserList({ users, isLoading }: Props) {
  return (
    <List>
      {users.map((u) => (
        <UserListItem key={u.id} data={u} />
      ))}
      {isLoading ? <UserSkeleton /> : null}
      {!isLoading && users.length === 0 ? <NoResult /> : null}
    </List>
  );
}

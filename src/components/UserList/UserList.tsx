import { useState, memo } from "react";
import cn from "classnames";
import UserItem from "../UserItem/UserItem";
import { Loader } from "../Loader/Loader";
import { Modal } from "../Modal/Modal";
import type { User } from "../../types/types";

import styles from "./UserList.module.css";

interface UsersProps {
  users: User[];
  loading: boolean;
  error: string | null;
}

export const UserList = memo(({ users, loading, error }: UsersProps) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  return (
    <div className={cn(styles.userList)}>
      <div className={cn(styles.userList__loading_error)}>
        {loading ? (
          <Loader />
        ) : error ? (
          <p className="error">Error: {error}</p>
        ) : users.length === 0 ? (
          <p className={cn(styles.userList__no_users)}>No users found</p>
        ) : null}
      </div>
      <div className={cn(styles.userList__inner)}>
        {!error &&
          users.length > 0 &&
          users.map((user) => (
            <UserItem
              key={user.id}
              user={user}
              onClick={() => setSelectedUser(user)}
            />
          ))}
      </div>
      <Modal user={selectedUser} onClose={() => setSelectedUser(null)} />
    </div>
  );
});

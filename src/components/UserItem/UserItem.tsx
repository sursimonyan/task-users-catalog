import { memo } from "react";
import cn from "classnames";

import styles from "./UserItem.module.css";
import type { User } from "../../types/types";

interface UserItemProps {
  user: User;
  onClick: () => void;
}

export const UserItem = memo(({ user, onClick }: UserItemProps) => {
  return (
    <div className={cn(styles.userItem)} onClick={onClick}>
      <img
        src={user.image}
        alt={`${user.firstName} ${user.lastName}`}
        className={cn(styles.userItem__image)}
      />
      <div className={cn(styles.userItem__info)}>
        <p>Role: {user.role}</p>
        <h3 className={cn(styles.userItem__userName)}>{user.username}</h3>
        <h4>
          {user.firstName} {user.lastName}
        </h4>
        <p>{user.email}</p>
        <p>{user.phone}</p>
      </div>
    </div>
  );
});

export default UserItem;

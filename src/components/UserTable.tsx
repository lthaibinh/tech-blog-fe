"use client";

import { FC } from "react";

interface IUser {
  users: { id: number; name: string; email: string }[];
}
export const UserTable: FC<IUser> = ({ users }) => {
  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
};

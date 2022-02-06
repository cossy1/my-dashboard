import React, {useState} from "react";
import { UsersTable } from "../users-table";
import { AddUsers } from "../add-users";

export const Dashboard = () => {
  const [showForm, setShowForm] = useState(false);

  return showForm ? (
    <AddUsers setShowForm={setShowForm} showForm={showForm} />
  ) : (
    <UsersTable setShowForm={setShowForm} showForm={showForm} />
  );
};

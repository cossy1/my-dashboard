import React, {useEffect} from "react";
import { Button, Table } from "antd";
import { useDispatch, useSelector } from 'react-redux';
import {fetchUsers, usersSelector} from "../../slices/users";


export const UsersTable = () => {
  const dispatch = useDispatch();
  const {users, loading, hasErrors} = useSelector(usersSelector);
  console.log('A:::::', users);

  const dataSource = [
    {
      id: "1",
      name: "Mike",
      age: 32,
      address: "10 Downing Street",
    },
    {
      id: "2",
      name: "John",
      age: 42,
      address: "10 Downing Street",
    },
  ];

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "name",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "age",
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "address",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "address",
    },
    {
      title: "City",
      dataIndex: "address",
      key: "address",
      render: (text:Record<string, any>)=> <div>{text.city}</div>
    },
    {
      title: "Edit",
      key: "action",
      render: () => (
        <Button
          style={{ background: "#cc9966", color: "white", borderRadius: 5 }}
        >
          Edit
        </Button>
      ),
    },

    {
      title: "Delete",
      key: "action",
      render: () => (
        <Button
          style={{ background: "#FF0000", color: "white", borderRadius: 5 }}
        >
          Delete
        </Button>
      ),
    },
  ];

  useEffect(()=> {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div className="users-table">
      <div className="users-table-top">
        <div>User List</div>
        <div>
          <Button type="primary" style={{ borderRadius: 5 }}>
            Add new
          </Button>
        </div>
      </div>

      <div className="users-table-content">
        <Table dataSource={users} columns={columns} />
      </div>
    </div>
  );
};

import React, { memo, SetStateAction, useEffect, useState } from "react";
import { Button, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, deleteUser, usersSelector } from "../../slices/users";
import { isEmpty } from "lodash";
import { DeleteUserModal } from "../delete-user";

interface Props {
  setShowForm: React.Dispatch<SetStateAction<boolean>>;
  showForm: boolean;
}

export const UsersTable = memo((props: Props) => {
  const { showForm, setShowForm } = props;
  const [data, setData] = useState<any>([]);
  const [visible, setVisible] = useState<boolean>(false);
  const [id, setId] = useState<number>();
  const dispatch = useDispatch();
  const { users, updateUsers } = useSelector(usersSelector);

  const columns: any = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      defaultSortOrder: 'descend',
      sorter: (a: any, b: any) =>{
        if(a.username < b.username) { return -1; }
        if(a.username > b.username) { return 1; }
        return 0;
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "City",
      dataIndex: "address",
      key: "address",
      render: (text: Record<string, any>) => <div>{text?.city}</div>,
    },
    {
      title: "Edit",
      key: "action",
      render: (e: Record<string, any>) => {
        if (!isEmpty(e)) {
          return (
            <Button
              style={{ background: "#cc9966", color: "white", borderRadius: 5 }}
              onClick={() => {
                localStorage.setItem("initialValue", JSON.stringify(e));
                setShowForm(true);
              }}
            >
              Edit
            </Button>
          );
        }
      },
    },

    {
      title: "Delete",
      key: "action",
      render: (e: Record<string, any>) => {
        if (!isEmpty(e)) {
          return (
            <Button
              style={{ background: "#FF0000", color: "white", borderRadius: 5 }}
              onClick={() => {
                console.log(e);
                setVisible(!visible);
                setId(e.id);
              }}
            >
              Delete
            </Button>
          );
        }
      },
    },
  ];

  useEffect(() => {
    if (isEmpty(users)) {
      dispatch(fetchUsers());
    }
    localStorage.removeItem("initialValue");
  }, []);

  useEffect(() => {
    if (users) {
      setData(users);
    }
  }, [users]);

  useEffect(() => {
    if (users && !isEmpty(updateUsers)) {
      setData([...users, ...updateUsers]);
    }
  }, [users, updateUsers]);

  const handleDelete = () => {
    dispatch(deleteUser(id));
    setVisible(false);
  };

  const onCancel = () => {
    setVisible(false);
  };

  return (
    <div className="users-table">
      <div className="users-table-top">
        <div>User List</div>
        <div>
          <Button
            type="primary"
            style={{ borderRadius: 5 }}
            onClick={() => {
              setShowForm(!showForm);
            }}
          >
            Add new
          </Button>
        </div>
      </div>

      <div className="users-table-content">
        <Table
          dataSource={data}
          columns={columns}
          rowKey={(data) => data?.id}
        />
      </div>

      <DeleteUserModal
        visible={visible}
        handleDelete={handleDelete}
        onCancel={onCancel}
      />
    </div>
  );
});

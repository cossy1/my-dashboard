import React, { memo, SetStateAction, useEffect, useState } from "react";
import { Button, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, usersSelector } from "../../slices/users";
import { isEmpty} from 'lodash';

interface Props {
  setShowForm: React.Dispatch<SetStateAction<boolean>>;
  showForm: boolean;
}

export const UsersTable = memo(
  (props: Props) => {
    const { showForm, setShowForm } = props;
    const [data, setData] = useState<any>([]);
    const dispatch = useDispatch();
    const { users, updateUsers, loading, hasErrors } =
      useSelector(usersSelector);

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
        render: (text: Record<string, any>) => <div>{text?.city}</div>,
      },
      {
        title: "Edit",
        key: "action",
        render: (e: Record<string, any>) => (
          <Button
            style={{ background: "#cc9966", color: "white", borderRadius: 5 }}
            onClick={() => {
                console.log(e);
              localStorage.setItem("initialValue", JSON.stringify(e));
              setShowForm(true);
            }}
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

    useEffect(() => {
      if(isEmpty(users)){
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
          <Table dataSource={data} columns={columns} rowKey={data.id} />
        </div>
      </div>
    );
  }
);

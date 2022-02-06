import React, { SetStateAction, useState } from "react";
import { Button, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addUser, editUser, usersSelector } from "../../slices/users";

interface Props {
  setShowForm: React.Dispatch<SetStateAction<boolean>>;
  showForm: boolean;
}

export const AddUsers = (props: Props) => {
  const { updateUsers, loading } = useSelector(usersSelector);
  const { showForm, setShowForm } = props;
  const [id, setId] = useState<number>(updateUsers[updateUsers.length-1]?.id ?? 10);
  const dispatch = useDispatch();
  const val = localStorage.getItem("initialValue");
  let initialValues: any;

  if (typeof val === "string") {
    initialValues = JSON.parse(val);
  }

  const onFinish = (val: Record<string, any>) => {
    if(!initialValues){
      val.id = id;
      let updatedPayload = Object.assign({}, {...val}, {address: {city: val.city} });

      dispatch(addUser(updatedPayload));
    }
    if(initialValues){
      val.id = initialValues.id;
      let updatedPayload = Object.assign({}, {...val}, {address: {city: val.city} });

      dispatch(editUser(updatedPayload));
    }
    form.resetFields();
    setShowForm(!showForm);
  };

  const defaultInitialValues = {
    city: undefined,
    name: undefined,
    email: undefined,
    username: undefined,
  };

  const [form] = Form.useForm();
  if (initialValues) {
    initialValues.city = initialValues?.address?.city;
  }

  return (
    <div className="users-table">
      <div className="add-users-form-top">Form</div>

      <div className="add-users-form-body">
        <Form
          layout="horizontal"
          size="large"
          form={form}
          initialValues={initialValues ? initialValues : defaultInitialValues}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Name is required" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, type: "email", message: "Email is required" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="City" name="city">
            <Input />
          </Form.Item>
          <Form.Item label="Username" name="username">
            <Input />
          </Form.Item>
        </Form>
        <div
          style={{ display: "flex", justifyContent: "flex-end", gap: "20px" }}
        >
          <div>
            <Button
              style={{ borderRadius: 5 }}
              type="primary"
              danger
              ghost
              htmlType="submit"
              onClick={() => {
                localStorage.removeItem("initialValue");
                form.resetFields();
                setShowForm(!showForm);
              }}
            >
              Cancel
            </Button>
          </div>

          <div>
            <Button
              style={{ background: "green", color: "#ffff", borderRadius: 5 }}
              htmlType="submit"
              loading={loading}
              onClick={() => {
                setId((currentState) => currentState + 1);
                form.submit();
              }}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

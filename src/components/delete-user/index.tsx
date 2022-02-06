import {Modal} from "antd";
import React from "react";

interface modalProp {
    visible: boolean;
    handleDelete: () => void;
    onCancel: () => void;
}

export const DeleteUserModal = (props: modalProp) => {
    const {visible, onCancel, handleDelete} = props;

    return(
        <Modal
            title="Are you sure you want to delete this user?"
            visible={visible}
            onOk={handleDelete}
            onCancel={onCancel}
        >
            <p>Sure to delete user?</p>
        </Modal>
    );
};
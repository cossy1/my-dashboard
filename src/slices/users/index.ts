import { createSlice } from "@reduxjs/toolkit";

interface PropTypes {
  users:  Record<string, any>[];
  updateUsers: Record<string, any>[];
  user: Record<string, any>;
  loading: boolean;
  hasErrors: boolean;
}
export const initialState: PropTypes = {
  loading: false,
  hasErrors: false,
  users: [],
  updateUsers: [],
  user: {},
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    getUsers: (state) => {
      state.loading = true;
    },
    getUsersSuccess: (state, { payload }) => {
      state.users = payload;
      state.loading = false;
      state.hasErrors = false;
    },
    getUsersFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },
    addUser: (state, { payload }) => {
      state.loading = true;
      let updatedPayload = Object.assign({}, {...payload}, {address: {city: payload.city} });
      state.updateUsers = [...state.updateUsers, updatedPayload];
    },

    editUser: (state, { payload }) => {
      state.loading = true;
      console.log('EDIT::::', payload);

      let updatedPayload = Object.assign({}, {...payload}, {address: {city: payload.city} });
      state.updateUsers = [...state.updateUsers, updatedPayload];
    },
    addUserSuccess: (state, { payload }) => {
      state.users = payload;
      state.loading = false;
      state.hasErrors = false;
    },
    addUserFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },
  },
});

export const { getUsers, getUsersSuccess, getUsersFailure, addUser, editUser } =
  usersSlice.actions;

export const usersSelector = (state: any) => state;

export default usersSlice.reducer;

export function fetchUsers() {
  return async (dispatch: any) => {
    dispatch(getUsers());

    try {
      const response = await fetch(
        "https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data"
      );
      const data = await response.json();

      dispatch(getUsersSuccess(data));
    } catch (error) {
      dispatch(getUsersFailure());
    }
  };
}

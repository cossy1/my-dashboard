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
      state.updateUsers = [...state.updateUsers, payload];
      state.loading = false;
    },

    deleteUser: (state, { payload }) => {
      state.loading = true;

      state.updateUsers.forEach((e, index) => {
        if(e?.id === payload){
          delete state.updateUsers[index];
          return state.updateUsers.filter(item => item?.id !== payload);
        }
      });

      state.users.forEach((e) => {
        if(e?.id === payload){
         return  state.users.splice(state.users.findIndex(function(i){
           state.loading = false;
            return i.id === payload;
          }), 1);
        }
      });
    },

    editUser: (state, { payload }) => {
      state.loading = true;
     state.updateUsers.forEach((e, index) => {
       if(e.id === payload.id){
         state.updateUsers[index] = payload;
       }
       state.loading = false;
     });

      state.users.forEach((e, index) => {
        if(e.id === payload.id){
          state.users[index] = payload;
        }
        state.loading = false;
      });
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

export const { getUsers, getUsersSuccess, getUsersFailure, addUser, editUser, deleteUser } =
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

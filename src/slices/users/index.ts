import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
    loading: false,
    hasErrors: false,
    users: [],
    user: {}
};

const usersSlice = createSlice({
    name: 'users',
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
    },
});

export const { getUsers, getUsersSuccess, getUsersFailure } = usersSlice.actions;

export const usersSelector = (state: any) => state;

export default usersSlice.reducer

export function fetchUsers() {
    return async (dispatch: any) => {
        dispatch(getUsers());

        try {
            const response = await fetch('https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data');
            const data = await response.json();

            dispatch(getUsersSuccess(data));
        } catch (error) {
            dispatch(getUsersFailure());
        }
    }
}

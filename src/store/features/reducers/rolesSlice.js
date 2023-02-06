import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const getRoles = createAsyncThunk(
    "roles/getRoles",
    async (object, {getState, rejectWithValue}) => {
    try {
        const response = await axios.get('/api/roles/get_roles');
        const data= response.data;
        return data;
    } catch (error) {
        rejectWithValue(error.response.data)
    }
});
const rolesSlice = createSlice({
    name: 'roles',
    initialState: {
        data: [],
        isSuccess: false,
        message: "",
        isLoading: false
    },
    reducers: {},
    extraReducers: {
        [getRoles.pending]: (state, action) =>{
            state.isLoading = true;
        },
        [getRoles.fulfilled]: (state, {payload}) =>{
            state.isLoading = false;
            state.data = payload;
            state.success = true;
        },
        [getRoles.rejected]: (state, {payload}) =>{
            state.message = "failed";
            state.isLoading = false;
            state.success = false;
        }
    }
})

export default rolesSlice
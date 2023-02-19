import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const config = {
    headers:{
        'Content-type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }
}
export const getUsers = createAsyncThunk(
    "users/getUsers",
    async (object, {getState, rejectWithValue}) => {
    try {
        const response = await axios.get('/api/users/get_users', config);
        const data= response.data;
        return data;
    } catch (error) {
        if(error.response.status === 403){
            const refreshToken = sessionStorage.getItem('refreshToken');
            console.log('from session', refreshToken)
            if(!refreshToken) return console.log('Error -- forbidden please login to continue')
            //get a new accessToken
            const newToken = await axios.get(`http://localhost:8000/api/refresh/refresh_token/${refreshToken}`);
            config.headers.Authorization = `Bearer ${newToken.data.token}`;
            const response = await axios.get('/api/users/get_users', config);
            const data= response.data;
            return data;
        }
        rejectWithValue(error.response.data)
    }
});
const usersSlice = createSlice({
    name: 'organizations',
    initialState: {
        data: [],
        isSuccess: false,
        message: "",
        isLoading: false
    },
    reducers: {},
    extraReducers: {
        [getUsers.pending]: (state, action) =>{
            state.isLoading = true;
        },
        [getUsers.fulfilled]: (state, {payload}) =>{
            state.isLoading = false;
            state.data = payload;
            state.success = true;
        },
        [getUsers.rejected]: (state, {payload}) =>{
            state.message = "failed";
            state.isLoading = false;
            state.success = false;
        }
    }
})

export default usersSlice
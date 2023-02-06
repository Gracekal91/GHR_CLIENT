import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const getTimeOff = createAsyncThunk(
    "organizations/getData",
    async (object, {getState, rejectWithValue}) => {
    try {
        const response = await axios.get('/api/organizations/find_organization');
        const data= response.data;
        return data;
    } catch (error) {
        rejectWithValue(error.response.data)
    }
});
const timeOffSlice = createSlice({
    name: 'organizations',
    initialState: {
        data: [],
        isSuccess: false,
        message: "",
        isLoading: false
    },
    reducers: {},
    extraReducers: {
        [getTimeOff.pending]: (state, action) =>{
            state.isLoading = true;
        },
        [getTimeOff.fulfilled]: (state, {payload}) =>{
            state.isLoading = false;
            state.data = payload;
            state.success = true;
        },
        [getTimeOff.rejected]: (state, {payload}) =>{
            state.message = "failed";
            state.isLoading = false;
            state.success = false;
        }
    }
})

export default timeOffSlice
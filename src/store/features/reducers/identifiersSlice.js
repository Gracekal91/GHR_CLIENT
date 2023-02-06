import {createSlice} from "@reduxjs/toolkit";

export const identifiersSlice = createSlice({
    name: 'identifier',
    initialState: {
        itemId: null
    },
    reducers:{
        grabItemId: (state) =>{
            return {...state, itemId: 2}
        }
    }
});

export const {grabItemId} = identifiersSlice;
export default identifiersSlice;
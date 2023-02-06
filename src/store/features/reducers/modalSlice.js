import {createSlice} from "@reduxjs/toolkit";

export const modalSlice= createSlice({
    name: 'toggleModal',
    initialState:{
        showCreate: false,
        showUpdate: false,
        counter: 0
    },
    reducers:{
        toggleCreate: (state) =>{
            return {...state, showCreate: !state.showCreate}
        },
        closeModal : (state, action) =>{
            return {...state, showCreate: false, showUpdate: false}
        },
        toggleUpdate : (state, action) =>{
            return {...state, showUpdate: !state.showUpdate}
        },
        updateCounter: (state) =>{
            return {...state, counter: state.counter + 1}
        }
    }
})

export const  {toggleCreate, closeModal, toggleUpdate, updateCounter} = modalSlice.actions
export default modalSlice
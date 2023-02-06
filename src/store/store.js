import {configureStore} from '@reduxjs/toolkit';
import organizationsSlice from "./features/reducers/organizationsSlice";
import modalSlice from "./features/reducers/modalSlice";
import identifiersSlice from "./features/reducers/identifiersSlice";
import usersSlice from "./features/reducers/usersSlice";
import rolesSlice from "./features/reducers/rolesSlice";
import timeOffSlice from "./features/reducers/timeOffSlice";

const store = configureStore({
    reducer: {
        users: usersSlice.reducer,
        organizations: organizationsSlice.reducer,
        time_offs: timeOffSlice.reducer,
        modal: modalSlice.reducer,
        identifiers: identifiersSlice,
        roles: rolesSlice.reducer
    }
});

export default store;
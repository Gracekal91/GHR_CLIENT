import '../../assets/scss/dashboard.scss'

import TableList from "./TableList";
import CreateModal from "./CreateModal";
import {useEffect, useState} from "react";
import axios from "axios";
import UpdateModal from "./UpdateModal";
import {BiUserPlus} from "react-icons/bi";
import {useDispatch, useSelector} from "react-redux";
import {getOrganizations} from "../../store/features/reducers/organizationsSlice";
import {getUsers} from "../../store/features/reducers/usersSlice";
import {toggleCreate} from "../../store/features/reducers/modalSlice";
import CreateUserModal from "./CreateUserModal";

const Admins = () =>{

    const dispatch  = useDispatch();
    const administrators = useSelector((state) => state.users.data);
    const organizations = useSelector((state) => state.organizations.data);
    const create = useSelector((state) => state.modal.showCreate);


    //Get organizations
    useEffect(() => {
        dispatch(getOrganizations());
    }, []);
    //Get admins
    useEffect(() => {
        dispatch(getUsers());
    }, []);


    const handleModal = () =>{
        dispatch(toggleCreate())
    }
    const closeModals = () =>{

    }

    const handleUpdateModal = () =>{

    }

    return(
        <>
            <div className="right_panel">
                <div className="top_menu">
                    <button className={`btn_dashboard ${create ? 'disabled' : ''}`} onClick={handleModal} disabled={create}>
                        <div className="btn_icon">
                            <BiUserPlus/>
                        </div>
                        <li>Create Admin</li>
                    </button>
                </div>
                <CreateUserModal  />
                <UpdateModal   />
                <TableList
                    administrators={administrators}
                    admins={true}
                />
            </div>
        </>
    )
}

export default Admins;
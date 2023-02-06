import '../../assets/scss/dashboard.scss'

import {MdCreate} from "react-icons/md";
import TableList from "./TableList";
import CreateModal from "./CreateModal";
import {useEffect, useState} from "react";
import UpdateModal from "./UpdateModal";
import {useDispatch, useSelector} from "react-redux";
import {getOrganizations} from "../../store/features/reducers/organizationsSlice";
import {toggleCreate} from "../../store/features/reducers/modalSlice"

const Organization = () =>{
    const mapStateToProps = (state) => ({
        showCreate: state.modal.showCreate,
        showUpdate: state.modal.showUpdate
    });

    const dispatch  = useDispatch();
    const organizations = useSelector((state) => state.organizations.data);
    const create = useSelector((state) => state.modal.showCreate);

    useEffect(() => {
        dispatch(getOrganizations());
    }, []);
    const handleModal = () =>{
        dispatch(toggleCreate());
        console.log(create);
    }

    return(
        <>
            <div className="right_panel">
                <div className="top_menu">
                    <button className={`btn_dashboard ${create ? 'disabled' : ''}`} onClick={handleModal} disabled={create}>
                        <div className="btn_icon">
                            <MdCreate/>
                        </div>
                        <li>Create Org</li>
                    </button>
                </div>
                <CreateModal isCreate={true}/>
                <UpdateModal/>
                <TableList org={true} organizations={organizations}/>
            </div>
        </>
    )
}

export default Organization;
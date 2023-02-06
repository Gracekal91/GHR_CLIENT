import {GoDashboard} from "react-icons/go";
import {RiAdminLine, RiOrganizationChart} from "react-icons/ri";
import {useDispatch} from "react-redux";
import {closeModal} from "../../store/features/reducers/modalSlice";

const LeftPanel = ({setCurrentTab, admin}) =>{

    const dispatch = useDispatch();
    const gotToDashboard = () =>{
        setCurrentTab(0)
        dispatch(closeModal());
    }
    const goToOrganization = () =>{
        setCurrentTab(1)
        dispatch(closeModal());
    }
    const goToAdmins = () =>{
        setCurrentTab(2)
        dispatch(closeModal());
    }

    return (
        <>
            { !admin &&
            <div className="left_panel">
                <h3 className="left_title">Dashboard</h3>
                <ul>
                    <a href="#" className="link_item" onClick={gotToDashboard}>
                        <div className="link_icon">
                            <GoDashboard/>
                        </div>
                        <li>Dashboard</li>
                    </a>
                    <a href="#" className="link_item" onClick={goToOrganization}>
                        <div className="link_icon">
                            <RiOrganizationChart/>
                        </div>
                        <li>Organization</li>
                    </a>
                    <a href="#" className="link_item" onClick={goToAdmins}>
                        <div className="link_icon">
                            <RiAdminLine/>
                        </div>
                        <li>Admins</li>
                    </a>
                </ul>
            </div>
            }
            {
                admin &&
                <div className="left_panel">
                    <h3 className="left_title">Dashboard</h3>
                    <ul>
                        <a href="#" className="link_item" onClick={gotToDashboard}>
                            <div className="link_icon">
                                <GoDashboard/>
                            </div>
                            <li>Dashboard</li>
                        </a>
                        <a href="#" className="link_item" onClick={goToAdmins}>
                            <div className="link_icon">
                                <RiAdminLine/>
                            </div>
                            <li>Employees</li>
                        </a>
                    </ul>
                </div>
            }
        </>
    )
}

export default LeftPanel
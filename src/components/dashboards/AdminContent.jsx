import axios from 'axios';
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getOrganizations} from "../../store/features/reducers/organizationsSlice";
import {BsThreeDots} from "react-icons/bs";
import {AiTwotoneEdit} from "react-icons/ai";
import {MdDeleteSweep} from "react-icons/md";

const AdminContent = ({administrator, index, admins}) => {
    const [message, setMessage] = useState('');
    const dispatch  = useDispatch();
    const organizations = useSelector((state) => state.organizations.data);

    useEffect(() => {
        dispatch(getOrganizations());
    }, []);

    const mapStateToProps = (state) => ({
        showCreate: state.modal.showCreate,
        showUpdate: state.modal.showUpdate
    });

    const config = {
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    }

    const deleteAdmin = async () => {
        try {
            const deleteOrg = await axios.delete(`http://localhost:8000/api/users/delete_user/${administrator.id}`, config);
            window.location.reload();
            setMessage(`${administrator.name} was successfully deleted`);
        } catch (e) {
            console.error(e);
        }
    }

/*    const handleUpdateModal = () => {
        localStorage.setItem('itemIdentifier', organization.id);
        dispatch(updateCounter());
        dispatch(toggleUpdate());
    }*/

//Grab specific organization
    if(!organizations) return 'no orgs'
        const userOrganization = organizations.find(item => item.id === administrator.org_id);
    if(!administrator) return 'loading admins'
    return (
        <>
            {admins &&
                <tr>
                    <td>
                        <span className="profile_picture"></span>
                        {administrator.name}</td>
                    <td>{administrator.surname}</td>
                    <td>
                        {administrator.email}
                        <span className="three-dots-more">
                             <BsThreeDots />
                        </span>
                    </td>
                </tr>
            }
        </>
    )
}

export default AdminContent;
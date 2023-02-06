import {AiTwotoneEdit} from "react-icons/ai";
import {MdDeleteSweep} from "react-icons/md";
import axios from 'axios';
import {useState} from "react";
import {useDispatch} from "react-redux";
import {toggleUpdate, updateCounter} from "../../store/features/reducers/modalSlice";


const OrganizationContent = ({organization, index, org}) => {
    const [message, setMessage] = useState('');

    const dispatch = useDispatch();
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


    const deleteOrganization = async () => {
        try {
            const deleteOrg = await axios.delete(`http://localhost:8000/api/organizations/delete_organization/${organization.id}`, config);
            window.location.reload();
            setMessage(`${organization.organizations} was successfully deleted`);
        } catch (e) {
            console.error(e);
        }
    }

    const handleUpdateModal = () => {
        localStorage.setItem('itemIdentifier', organization.id);
        dispatch(updateCounter());
        dispatch(toggleUpdate());
    }
    if (!organization) return 'loading orgs'

    return (
        <>
            {org &&
                <tr>
                    <td>{organization.organizations}</td>
                    <td>{organization.suspended === true ? 'Active' : 'Inactive'}</td>
                    <td style={{display: 'flex'}}>
                        <a href="#" style={{marginLeft: '.5rem', fontSize: '.8rem'}} onClick={handleUpdateModal}
                        >
                            <div className="btn_icon">
                                <AiTwotoneEdit/>
                            </div>
                        </a>
                        <a href="#" style={{marginLeft: '1rem', fontSize: '.8rem', color: 'red'}}
                           onClick={deleteOrganization}>
                            <div className="btn_icon">
                                <MdDeleteSweep/>
                            </div>
                        </a>
                    </td>
                </tr>
            }
        </>
    )
}

export default OrganizationContent;
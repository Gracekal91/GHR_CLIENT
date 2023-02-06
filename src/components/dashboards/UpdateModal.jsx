import {SlOrganization} from "react-icons/sl";
import axios from 'axios';
import {useEffect, useState} from 'react';
import FlashMessages from "../shared/FlashMessages";
import {closeModal} from "../../store/features/reducers/modalSlice";
import {useDispatch, useSelector} from "react-redux";
import {getOrganizations} from "../../store/features/reducers/organizationsSlice";
const UpdateModal = ({isUpdate}) => {

    const [message, setMessage] = useState('');
    const [displayFlash, setDisplayFlash] = useState(false);
    const [error, setError] = useState('');
    const id = JSON.parse(localStorage.getItem('itemIdentifier'));
    const mapStateToProps = (state) => ({
        showCreate: state.modal.showCreate,
        showUpdate: state.modal.showUpdate,
        counter : state.modal.counter
    });

    const organizations = useSelector((state) => state.organizations.data);

    const update = useSelector((state) => state.modal.showUpdate);
    const counter = useSelector((state) => state.modal.counter);
    const dispatch = useDispatch();

    let userItem;

    const [organization, setOrganization] = useState([]);

    useEffect(() => {
        dispatch(getOrganizations());
        if(organizations.length > 0){
            userItem = organizations.find(item => item.id === id);
            setOrganization(userItem);
        }
    }, [counter]);

    const config = {
        headers:{
            'Content-type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    }

    const handleFlash = () =>{
        setTimeout(() => {
            setDisplayFlash(false);
        }, 3000);
    }
    //handle change
    const handleChange = (evt) =>{
        const {name,value} = evt.target;
        setOrganization({...organization, [name]:value})
    }

    const handleOrganizationUpdate = async (evt) =>{
        try{
            evt.preventDefault();
            const data = {
                organizations: organization.name,
                org_desc: organization.description,
                suspended: organization.suspended
            }
            const response = await axios.put(`/api/organizations/update_organization/${id}`, data, config);
            setMessage(`${organization.name} was successful updated`);
            setDisplayFlash(true);
            setError('');
            handleFlash();
            dispatch(getOrganizations());
            dispatch(closeModals());
            return response.data;
        }catch(err){
            setError(err.response.data);
        }
    }

    const closeModals = () =>{
        setOrganization([]);
        dispatch(closeModal());
    }


if(!organization) return ''
    return (
        <>
            {displayFlash &&  <FlashMessages message={message}/>}
            <div className={`create_modal_container ${update ? 'showUpdate' : ''}` }>
                <span className="close" onClick={closeModals}>x</span>
                <div className="head_section">
                    <h4>UPDATE AN ORGANIZATION</h4>
                    <p>Here's where you update your client's organization,
                        As the name should be unique</p>
                </div>
                <form onSubmit={handleOrganizationUpdate}>
                    <div>
                        <label style={{fontSize: '12px'}}> Organization *</label>
                        <span><SlOrganization/></span>
                        <input type="text" required
                               defaultValue={organization.organizations}
                               name="name"
                               onChange={handleChange}
                        />

                    </div>
                    <div>
                        <label style={{fontSize: '12px'}}> Organization Description</label>
                        <textarea rows="5"
                                  defaultValue={organization.org_desc}
                                  name="description"
                                  onChange={handleChange}
                        ></textarea>
                    </div>
                    <div>
                        <select name="suspended" id="select" value={organization.status}
                                onChange={handleChange}>
                            <option value={true}>Active</option>
                            <option value={false}>Inactive</option>
                        </select>
                    </div>
                    {<p className={`error_text ${error ? 'error_visible' : ''}`}>{error}</p>}
                    <div>
                        <button type="submit" > Update</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default UpdateModal;
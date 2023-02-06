import {SlOrganization} from "react-icons/sl";
import axios from 'axios';
import {useState} from 'react';
import FlashMessages from "../shared/FlashMessages";
import {useDispatch, useSelector} from "react-redux";
import {getOrganizations} from "../../store/features/reducers/organizationsSlice";
import {closeModal} from "../../store/features/reducers/modalSlice";

const CreateModal = () => {
    const [organization, setOrganization] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState(false);
    const [message, setMessage] = useState('');
    const [displayFlash, setDisplayFlash] = useState(false);
    const [error, setError] = useState('');
    const mapStateToProps = (state) => ({
        showCreate: state.modal.showCreate,
        showUpdate: state.modal.showUpdate
    });
    const create = useSelector((state) => state.modal.showCreate);

    const config = {
        headers:{
            'Content-type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    }


    //Dispatch the action on create
    const dispatch  = useDispatch();

    const handleFlash = () =>{
        setTimeout(() => {
            setDisplayFlash(false);
        }, 3000);
    }
    //handle reload to update the list
    const closeModals = () =>{
        dispatch(closeModal());
    }
const handleOrganizationCreate = async (evt) =>{
    try{
        evt.preventDefault();
        const data = {
            organizations: organization,
            org_desc: description,
            suspended: status
        }
        const response = await axios.post('/api/organizations/create_organization', data, config);
        setStatus(false);
        setOrganization('');
        setDescription('');
        dispatch(getOrganizations());
        closeModals();
        setMessage(`${organization} was successful created`);
        setDisplayFlash(true);
        setError('');
        handleFlash();
        return response.data;
    }catch(err){
        setError(err.response.data);
    }
}
    return (
        <>
            {displayFlash &&  <FlashMessages message={message}/>}
            <div className={`create_modal_container ${create ? 'showCreate' : ''}` }>
                <span className="close" onClick={closeModals}>x</span>
                <div className="head_section">
                    <h4>CREATE AN ORGANIZATION</h4>
                    <p>Here's where you create your client's organization,
                        As the name should be unique</p>
                </div>
                <form onSubmit={handleOrganizationCreate}>
                    <div>
                        <label style={{fontSize: '12px'}}> Organization *</label>
                        <span><SlOrganization/></span>
                        <input type="text" required
                               value={organization}
                               onChange={(e)=>{setOrganization(e.target.value)}}
                        />

                    </div>
                    <div>
                        <label style={{fontSize: '12px'}}> Organization Description</label>
                        <textarea rows="5"
                                  value={description}
                                  onChange={(e) => {setDescription(e.target.value)}}
                        ></textarea>
                    </div>
                    <div>
                        <select name="" id="select" value={status} onChange={(e)=>{setStatus(e.target.value)}}>
                            <option value={true}>Active</option>
                            <option value={false}>Inactive</option>
                        </select>
                    </div>
                    {<p className={`error_text ${error ? 'error_visible' : ''}`}>{error}</p>}
                    <div>
                        <button type="submit" > Submit</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default CreateModal;
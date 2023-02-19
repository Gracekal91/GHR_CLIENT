import {SlOrganization} from "react-icons/sl";
import axios from 'axios';
import {useEffect, useState} from 'react';
import FlashMessages from "../shared/FlashMessages";
import {useDispatch, useSelector} from "react-redux";
import {getOrganizations} from "../../store/features/reducers/organizationsSlice";
import {getRoles} from "../../store/features/reducers/rolesSlice";
import {closeModal} from "../../store/features/reducers/modalSlice";
import {FiUserCheck, FiUsers} from "react-icons/fi";
import {MdEmail} from "react-icons/md";

const CreateUserModal = () => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState(3);
    const [employee, setEmployee] = useState('');
    const [message, setMessage] = useState('');
    const [displayFlash, setDisplayFlash] = useState(false);
    const [error, setError] = useState('');
    const organizations = useSelector((state) => state.organizations.data);
    const roles = useSelector((state) => state.roles.data);
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    const orgId = JSON.parse(localStorage.getItem('userTypedOrgId'));
    const userOrg = JSON.parse(localStorage.getItem('organization'));

    const mapStateToProps = (state) => ({
        showCreate: state.modal.showCreate,
        showUpdate: state.modal.showUpdate
    });

    useEffect(() => {
        dispatch(getOrganizations());
        dispatch(getRoles());
    }, []);

    //grab roles
    const DisplayRole = () =>{
        if(!roles) return 'no role';
        if(loggedInUser.role === 1){
            return roles.filter(role => role.id === 2);
        }else if(loggedInUser.role === 2){
            return roles.filter(role => role.id > 2)
        }
    }

    const create = useSelector((state) => state.modal.showCreate);

    const config = {
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    }

    //Dispatch the action on create
    const dispatch = useDispatch();

    const handleFlash = () => {
        setTimeout(() => {
            setDisplayFlash(false);
        }, 3000);
    }
    const closeModals = () => {
        dispatch(closeModal());
    }

    const handleUserCreate = async (evt) => {
        console.log('submit clicked')
        try {
            evt.preventDefault();
            const data = {
                name: name,
                surname: surname,
                email: email,
                password: 'password',
                employee_uname: employee,
                org_id: Number(orgId),
                user_role: role
            }
            const response = await axios.post('/api/users/create_user', data, config);
            dispatch(getOrganizations());
            closeModals();
            setMessage(`${name} was successful created`);
            setDisplayFlash(true);
            setError('');
            handleFlash();
            return response.data;
        } catch (err) {
            setError(err.response.data);
        }
    }

    if(!roles) return 'hhhhh'
    console.log('role', role)
    return (
        <>
            {displayFlash && <FlashMessages message={message}/>}
            <div className={`create_modal_container ${create ? 'showCreate' : ''}`}>
                <span className="close" onClick={closeModals}>x</span>
                <div className="head_section">
                    <h4>CREATE A USER</h4>
                    <p>Here's where you create your client's organization,
                        As the name should be unique</p>
                </div>
                <form onSubmit={handleUserCreate}>
                    <div className="group-input-2">
                        <div>
                            <label style={{fontSize: '12px'}}> Name *</label>
                            <span><FiUserCheck/></span>
                            <input type="text" required
                                   value={name}
                                   onChange={(e) => {
                                       setName(e.target.value)
                                   }}
                            />
                        </div>
                        <div>
                            <label style={{fontSize: '12px'}}> Surname *</label>
                            <span><FiUserCheck/></span>
                            <input type="text" required
                                   value={surname}
                                   onChange={(e) => {
                                       setSurname(e.target.value)
                                   }}
                            />
                        </div>
                    </div>
                    <div>
                        <label style={{fontSize: '12px'}}> Employee username *</label>
                        <span><FiUsers/></span>
                        <input type="text" required
                               value={employee}
                               onChange={(e) => {
                                   setEmployee(e.target.value)
                               }}
                               style={{width: '310px'}}
                        />
                    </div>
                    <div>
                        <label style={{fontSize: '12px'}}> Email Address *</label>
                        <span><MdEmail/></span>
                        <input type="text" required
                               value={email}
                               onChange={(e) => {
                                   setEmail(e.target.value)
                               }}
                               style={{width: '310px'}}
                        />
                    </div>
                    <div>
                        <label style={{fontSize: '12px'}}> Organization</label>
                        <select name="" id="select"
                        >
                            <option >{userOrg}</option>
                        </select>
                    </div>
                    <div>
                        <label style={{fontSize: '12px'}}> Role</label>
                        <select name="" id="select" value={role} onChange={(e) => {
                            setRole(e.target.value)
                        }}>
                            {
                               DisplayRole().map((item) =>{
                                    return <option value={item.id}>{item.role}</option>
                                })
                            }
                        </select>
                    </div>
                    {<p className={`error_text ${error ? 'error_visible' : ''}`}>{error}</p>}
                    <div>
                        <button type="submit" style={{width: '345px'}}> Create</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default CreateUserModal;
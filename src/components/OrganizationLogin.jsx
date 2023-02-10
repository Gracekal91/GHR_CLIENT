import "../assets/scss/auth.scss"
import {SlOrganization} from 'react-icons/sl';
import {MdEmail, MdOutlineLogin} from 'react-icons/md';
import {useEffect, useState} from 'react';
import { redirect } from 'react-router-dom';
import axios from 'axios';
import {RiLockPasswordLine} from "react-icons/ri";

const OrganizationLogin = () => {
    const [orgExist, setOrgExist] = useState(false);
    const [orgs, setOrganizations] = useState([]);
    const [organization, setOrganization] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [genError, setGenError] = useState(null);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get('/api/organizations/find_organization');
                const data = response.data;
                setOrganizations(data);
            } catch (e) {
                console.error(e);
            }
        }
        getData();
    }, []);

    const handleOrgLogin = (evt) => {
        evt.preventDefault();
        const orgIn = organization.toLowerCase();
        const findOrg = orgs.find(item => item.organizations === orgIn);
        localStorage.setItem('userTypedOrgId', JSON.stringify(findOrg.id));
        console.log('organization', orgIn);
        if(findOrg) {
            console.log('Your organization exist');
            setOrgExist(true);
        }else{
            console.log('Your organization does not exist');
            setError('This organization does not exist');
        }
    }

    //Handle User login
    const handleUserLogin = async (evt) =>{
        evt.preventDefault();
        let orgId = JSON.parse(localStorage.getItem('userTypedOrgId'));
        try{
            const {data} = await axios.post('/api/auth/login', {email, password});
            const {token, user, authenticate} = data;

            localStorage.setItem('organization', JSON.stringify(organization));
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('isAuthenticated', authenticate);
            localStorage.setItem('token', token);

            if(user.org_id !== orgId) {
                console.log('user was not fount in the organization')
                return window.location.href = `/login`
            }
            if(user.user_role === 1) return window.location.href = `/dashboard_super`
            if(user.user_role === 2) return window.location.href = `/dashboard_admin`
            if(user.user_role === 3 || user.user_role === 4) return window.location.href = `/home`

          /*  if(token) return window.location.href = `/dashboard_super`*/
            window.location.href = `/login`
        }catch(err){
            setGenError(err.response.data)
        }
    }

    return (
        <>
            {
            <div className="login_container">
                { !orgExist &&
                <div className="content">
                    <h3>Sign In</h3>
                    <form onSubmit={handleOrgLogin}>
                        <label>Organization or company name :)</label>
                        <div>
                            <span><SlOrganization/></span>
                            <input type="text" placeholder="enter your company"
                                   value={organization}
                                   onChange={(e) => setOrganization(e.target.value)}
                            />
                        </div>
                        {<p className={`error_text ${!orgExist && error ? 'error_visible' : ''}`}>{error}</p>}
                        <div className="btn_login">
                                <button type="submit" className="submit_btn" >Next</button>
                            <span><MdOutlineLogin/></span>
                        </div>
                    </form>
                </div>
                }
                {
                    orgExist &&
                    <div className="content" style={{height:'180px'}}>
                        <h3>Login with {organization}</h3>
                        <form onSubmit={handleUserLogin}>
                            <div>
                                <span><MdEmail/></span>
                                <input type="email" placeholder="enter your email"
                                value={email}
                                       onChange={(e) =>{setEmail(e.target.value)}}
                                />
                            </div>
                            <div>
                                <span><RiLockPasswordLine/></span>
                                <input type="password" placeholder="enter your password"
                                       value={password}
                                       onChange={(e) =>{setPassword(e.target.value)}}
                                />
                            </div>
                            {<p className={`error_text ${genError ? 'error_visible' : ''}`}>{genError}</p>}
                            <div className="btn_login">
                                <button type="submit" className="submit_btn">Submit</button>
                                <span><MdOutlineLogin/></span>
                            </div>
                        </form>
                    </div>
                }
            </div>
        }
        </>
    )
}

export default OrganizationLogin;
import {useEffect, useState} from 'react';
import {Route, useNavigate} from "react-router-dom";

const AdminAdmin = (props) =>{
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const checkUserToken = () =>{
        const userToken = localStorage.getItem('token')
        const user = JSON.parse(localStorage.getItem('user'))
        console.log(user.role);
        if(!userToken || userToken === 'undefined' || user.role !== 2){
            setIsLoggedIn(false);
            return navigate('/login');
        }
        setIsLoggedIn(true);
    }

    useEffect(() => {
        checkUserToken();
    }, [isLoggedIn]);

    return (
        <>
            {
                isLoggedIn ? props.children : null
            }
        </>
    )

}

export default AdminAdmin;
import {useEffect, useState} from 'react';
import {Route, useNavigate} from "react-router-dom";

const _EmployeeAndManager = (props) =>{
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const checkUserToken = () =>{
        const userToken = localStorage.getItem('token')
        const user = JSON.parse(localStorage.getItem('user'))
        console.log(user.user_role);
        if(!userToken || userToken === 'undefined' || user.user_role < 3){
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

export default _EmployeeAndManager;
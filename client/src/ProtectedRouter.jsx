import React from 'react'
import {useNavigate} from 'react-router-dom'
import { useUserAuth } from './context/UserAuthContext';

function ProtectedRouter({children}) {
    const {user} = useUserAuth();
    const navigate = useNavigate();
    if (!user) {
        navigate('/newlogin');
        return null;
    } 
    return children;
  
}

export default ProtectedRouter
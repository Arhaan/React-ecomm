import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import axios from 'axios';
const ProfileView = (props) => {
    const user = localStorage.getItem("user")
    const history = useHistory()
    if(!user){
        history.push("/login")
    }
    const [fullProfile, setFullProfile] = useState({})
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/users/`)
            .then((response)=> {
                    setFullProfile(response.data)
                }
            )
            .catch((error)=>{
                localStorage.clear()
                history.push('/login')
            })
    }, [])
    return(
        <div>
            {fullProfile.first_name}
        </div>
    )
}

export default ProfileView;
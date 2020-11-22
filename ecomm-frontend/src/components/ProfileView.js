import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import axios from 'axios';
import Button from "react-bootstrap/cjs/Button";
const ProfileView = (props) => {
    const user = localStorage.getItem("user")
    const history = useHistory()
    if(!user){
        history.push("/login")
    }
    const [fullProfile, setFullProfile] = useState({})
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/users/`, {headers:{
                        "Authorization": `Token ${localStorage.getItem("auth_token")}`
                    }})
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
            <h1>{fullProfile.first_name} {fullProfile.last_name}</h1>
            <Button onClick={() => history.push("/orders")}>Your Orders</Button>
        </div>
    )
}

export default ProfileView;
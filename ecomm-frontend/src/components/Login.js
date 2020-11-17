import {React, useState,} from "react";
import { useHistory } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/cjs/Button";
import axios from "axios";
import Alert from "react-bootstrap/cjs/Alert";

const FailedBanner = ({handleClose}) => {

    return(
        <>
            <Alert variant="danger" onClose={handleClose} dismissible>
                The values you entered were incorrect.
            </Alert>
        </>
    )
}
const LoginForm = (props) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [failed, setFailed] = useState(false)
    const history = useHistory()
    const handleFormSubmit = (event) => {
        event.preventDefault()
        setFailed(false)
        axios.post(`${process.env.REACT_APP_API_ENDPOINT}/api-auth-token/`, {
            'username': username,
            'password': password,
        })
            .then((response) => {
                let token = response.data.token
                localStorage.setItem('auth_token', token)
                console.log(response.data)
                axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/users/`, {headers:{
                        "Authorization": `Token ${token}`
                    }})
                        .then((response)=>{
                            // Add username to localstorage as well as state
                            localStorage.setItem("user", response.data.username)
                            props.handleUserChange(response.data.username)
                        })
                history.push('/home')
                //console.log(response)
            })
            .then(
                () => {

                }
            )
            .catch((error) => {
                //console.log(error.message)
                setFailed(true)
                }
            )
    }

    const handleFailedBannerClose = () => {
        setFailed(false);
    }
    return(
        <div>
            {failed?<FailedBanner handleClose={handleFailedBannerClose}/>: <></>}
            <Form onSubmit={handleFormSubmit}>
                <Form.Group controlId="formEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="username" placeholder="Enter Username" value={username} onChange={(event => setUsername(event.target.value))}/>
                </Form.Group>
                <Form.Group controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="password" value={password} onChange={event => setPassword(event.target.value)}/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default LoginForm;
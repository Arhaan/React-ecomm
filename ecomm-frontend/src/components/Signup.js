import { React, useState } from 'react';
import Form from 'react-bootstrap/Form'
import Button from "react-bootstrap/cjs/Button";
import axios from "axios";
const Signup = (props) => {
    const [username, setUsername] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [address, setAddress] = useState("")
    const [pincode, setPincode] = useState("")
    const [pass, setPass] = useState("")
    const [confirmPass, setConfirmPass] = useState("")
    const [email, setEmail] = useState("")

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log("Submit")
        axios.post(`${process.env.REACT_APP_API_ENDPOINT}/api/users/`, {
            'username': username,
            'email': email,
            'address': address,
            'pin_code': pincode,
            'first_name': firstName,
            'last_name': lastName,
            'password': pass,
            'confirm-pass': confirmPass,
        })
            .then((response)=> {
                console.log(response)
                axios.post(`${process.env.REACT_APP_API_ENDPOINT}/api-auth-token/`, {
                    "username": username,
                    "password": pass,
                })
                    .then((response) => {
                        localStorage.setItem('auth_token', response.data.token)
                        //console.log(response)
                    })
            })
                .catch((error)=>{
                    console.log(error)
                })

    }
   return(
       <Form onSubmit={handleSubmit}>
           <Form.Group controlId={"username"}>
               <Form.Label>Username</Form.Label>
               <Form.Control type="username" placeholder="Enter Username" value={username} onChange={e => setUsername(e.target.value)}/>
           </Form.Group>
           <Form.Group controlId={"password"}>
               <Form.Label>Password</Form.Label>
               <Form.Control type="password"  value={pass} onChange={e => setPass(e.target.value)}/>
           </Form.Group>
           <Form.Group controlId={"confirm-password"}>
               <Form.Label>Confirm Password</Form.Label>
               <Form.Control type="password"  value={confirmPass} onChange={e => setConfirmPass(e.target.value)}/>
           </Form.Group>
           <Form.Group controlId={"email"}>
               <Form.Label>Email</Form.Label>
               <Form.Control type="email" placeholder="Enter Email" value={email} onChange={e => setEmail(e.target.value)}/>
           </Form.Group>
           <Form.Group controlId={"first_name"}>
               <Form.Label>First Name</Form.Label>
               <Form.Control type="username" placeholder="First Name" value={firstName} onChange={e => setFirstName(e.target.value)}/>
           </Form.Group>
           <Form.Group controlId={"last_name"}>
               <Form.Label>Last Name</Form.Label>
               <Form.Control type="username" placeholder="Last Name" value={lastName} onChange={e => setLastName(e.target.value)}/>
           </Form.Group>
           <Form.Group controlId="address">
               <Form.Label>Address</Form.Label>
               <Form.Control as="textarea" placeholder="Enter Address" value={address} rows={3} onChange={e => setAddress(e.target.value)}/>
           </Form.Group>
           <Form.Group controlId={"pin"}>
               <Form.Label>Pin Code</Form.Label>
               <Form.Control placeholder="Pin Code" value={pincode} onChange={e => setPincode(e.target.value)}/>
           </Form.Group>
           <Button variant={"primary"} type={"submit"}>Submit</Button>
       </Form>
   ) 
}

export default Signup;
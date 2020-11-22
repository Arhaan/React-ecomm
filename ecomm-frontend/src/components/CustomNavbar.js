import Navbar from "react-bootstrap/cjs/Navbar";
import Nav from "react-bootstrap/cjs/Nav";
import {Link} from "react-router-dom";
import SearchBar from "./SearchBar";
import {React} from "react";
import '../App.css';

const CustomNavbar = ({user}) => {
    console.log(user)
    if(user){
        return(
            <Navbar expand={"lg"} sticky={"top"} className={"custom-navbar"}>
                <Nav className={"mr-auto"}>
                    <Navbar.Brand><Link to={"/home"}>Moce</Link></Navbar.Brand>
                </Nav>
                <Nav className={"justify-content-center mr-auto"}>
                    <SearchBar/>
                </Nav>
                <Nav className={"justify-content-end"}>
                    <Nav.Link><Link to="/profile">{user}</Link></Nav.Link>
                    <Nav.Link><Link to="/logout">Logout </Link></Nav.Link>
                </Nav>
            </Navbar>
        )
    }
    else{
        return(
            <Navbar expand={"lg"} sticky={"top"} className={"custom-navbar"}>
                <Nav className={"mr-auto"}>
                    <Navbar.Brand><Link to={"/home"}>Moce</Link></Navbar.Brand>
                </Nav>
                <Nav className={"justify-content-center mr-auto"}>
                    <SearchBar/>
                </Nav>
                <Nav className={"justify-content-end"}>
                    <Nav.Link><Link to="/login">Login</Link></Nav.Link>
                    <Nav.Link><Link to="/signup">Signup</Link></Nav.Link>
                </Nav>
            </Navbar>
        )
    }

}

export default CustomNavbar;
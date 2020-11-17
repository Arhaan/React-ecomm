import './App.css';
import {React, useContext, createContext, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./components/home";
import { Route, Switch, Redirect, useLocation, Link} from "react-router-dom";
import Navbar from "react-bootstrap/cjs/Navbar";
import LoginForm from "./components/Login";
import Logout from "./components/Logout";
import Signup from "./components/Signup";
import Container from "react-bootstrap/cjs/Container";
import OrdersView from "./components/Orders";
import ProfileView from "./components/ProfileView";
import Nav from "react-bootstrap/cjs/Nav";
const CustomNavbar = ({user}) => {

    if(user){
        return(
            <Navbar>
                <Nav className={"mr-auto"}>
                    <Nav.Link><Navbar.Brand><Link to={"/home"}>Ecommerce</Link></Navbar.Brand></Nav.Link>
                </Nav>
                <Nav className={"justify-content-end"}>
                    <Nav.Link><Navbar.Text><Link to="/profile">{user}</Link></Navbar.Text></Nav.Link>
                    <Nav.Link><Navbar.Text><Link to="/logout">Logout </Link></Navbar.Text></Nav.Link>
                </Nav>
            </Navbar>
        )
    }
    else{
        return(
            <Navbar>
                <Nav className={"mr-auto"}>
                    <Navbar.Brand><Link to={"/home"}>Ecommerce</Link></Navbar.Brand>
                </Nav>
                <Nav className={"justify-content-end"}>
                    <Nav.Link><Navbar.Text><Link to="/login">Login</Link></Navbar.Text></Nav.Link>
                    <Nav.Link><Navbar.Text><Link to="/signup">Signup</Link></Navbar.Text></Nav.Link>
                </Nav>
            </Navbar>
        )
    }

}

const Footer = () => {
    return(
        <div className={"footer"}>
            <Container>
            <p>Made by <a target="_blank" href="https://github.com/arhaan" rel="noopener">Arhaan Ahmad</a></p>
            </Container>
        </div>
    )
}
function App() {
    const { pathname } = useLocation();
    const [Username, setUserName] = useState(localStorage.getItem("user"))
    const handleUserChange = (username) => {
        setUserName(username)
    }
    return(
        <div className={"App"}>
            <CustomNavbar user={Username} className={"navbar"}/>
            <Container>

            <Switch>
                <Redirect from="/:url*(/+)" to={pathname.slice(0,-1)}/>
                <Route path="/home"><Home/></Route>
                <Route path="/login"><LoginForm handleUserChange={handleUserChange}/></Route>
                <Route path="/logout"><Logout handleUserChange={handleUserChange}/></Route>
                <Route path="/signup"><Signup handleUserChange={handleUserChange}/></Route>
                <Route path="/orders"><OrdersView/></Route>
                <Route path="/profile"><ProfileView/></Route>
            </Switch>
            <Footer/>
            </Container>
        </div>

    )
}

export default App;

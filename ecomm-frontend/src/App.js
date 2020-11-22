import './App.css';
import {React, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./components/home";
import {Route, Switch, Redirect, useLocation, Link} from "react-router-dom";
import LoginForm from "./components/Login";
import Logout from "./components/Logout";
import Signup from "./components/Signup";
import Container from "react-bootstrap/cjs/Container";
import OrdersView from "./components/Orders";
import ProfileView from "./components/ProfileView";
import CustomNavbar from "./components/CustomNavbar";




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
            <CustomNavbar user={Username}/>
            <Container>
            <Switch>
                <Redirect from="/:url*(/+)" to={pathname.slice(0,-1)}/>
                <Route path="/home"><Home/></Route>
                <Route path="/login"><LoginForm handleUserChange={handleUserChange}/></Route>
                <Route path="/logout"><Logout handleUserChange={handleUserChange}/></Route>
                <Route path="/signup"><Signup handleUserChange={handleUserChange}/></Route>
                <Route path="/orders"><OrdersView/></Route>
                <Route path="/profile"><ProfileView/></Route>
                <Route path="/"><Home/></Route>
            </Switch>
            </Container>
            <Footer/>
        </div>

    )
}

export default App;

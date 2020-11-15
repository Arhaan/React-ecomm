import './App.css';
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./components/home";
import { Route, Switch, Redirect, useLocation} from "react-router-dom";
import Navbar from "react-bootstrap/cjs/Navbar";
import LoginForm from "./components/Login";
import Logout from "./components/Logout";
import Signup from "./components/Signup";
import Container from "react-bootstrap/cjs/Container";
function App() {
    const { pathname } = useLocation();
    return(
        <div>
            <Navbar bg="dark">
                <Navbar.Brand href="/home">Ecomm</Navbar.Brand>

            </Navbar>
            <Container>
            <Switch>
                <Redirect from="/:url*(/+)" to={pathname.slice(0,-1)}/>
                <Route path="/home"><Home/></Route>
                <Route path="/login"><LoginForm/></Route>
                <Route path="/logout"><Logout/></Route>
                <Route path="/signup"><Signup/></Route>
            </Switch>
            </Container>
        </div>

    )
}

export default App;

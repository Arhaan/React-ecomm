import './App.css';
import { React, useContext, createContext } from "react";
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

const UserContext = createContext(localStorage.getItem("user"))
const CustomNavbar = () => {
    const user = useContext(UserContext)
    if(user){
        return(
            <Navbar bg="dark">
                <Navbar.Brand href="/home">Ecommerce</Navbar.Brand>
                <Navbar.Text><Link to="/profile">{user.username}</Link></Navbar.Text>
                <Navbar.Text><Link to="/logout">Logout </Link></Navbar.Text>
            </Navbar>
        )
    }
    else{
        return(
            <Navbar bg="dark">
                <Navbar.Brand href="/home">Ecommerce</Navbar.Brand>
                <Navbar.Text><Link to="/login">Login</Link></Navbar.Text>
                <Navbar.Text><Link to="/signup">Signup</Link></Navbar.Text>
            </Navbar>
        )
    }

}
function App() {
    const { pathname } = useLocation();

    return(
        <div>
            <Container>
            <UserContext.Provider>
                <CustomNavbar/>
            </UserContext.Provider>

            <Switch>
                <Redirect from="/:url*(/+)" to={pathname.slice(0,-1)}/>
                <Route path="/home"><Home/></Route>
                <Route path="/login"><LoginForm/></Route>
                <Route path="/logout"><Logout/></Route>
                <Route path="/signup"><Signup/></Route>
                <Route path="/orders"><OrdersView/></Route>
                <Route path="/profile"><ProfileView/></Route>
            </Switch>
            </Container>
        </div>

    )
}

export default App;

import React, {useEffect} from "react";

const Logout = (props) => {
    useEffect(() => {
        localStorage.removeItem("auth_token")
        localStorage.removeItem("user")
        props.handleUserChange(null)
    }, [])

    return(
        <div>
            <h1>You have been logged out.</h1>
        </div>
    )
}

export default Logout;
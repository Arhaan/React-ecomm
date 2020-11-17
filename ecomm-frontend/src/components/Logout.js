import React, {useEffect} from "react";

const Logout = (props) => {
    useEffect(() => {
        localStorage.removeItem("auth_token")
        localStorage.removeItem("user")
        props.handleUserChange(null)
    }, [])

    return(
        <div>
            You have been logged out.
        </div>
    )
}

export default Logout;
import React, {useEffect} from "react";

const Logout = () => {
    useEffect(() => {
        localStorage.removeItem("auth_token")
        localStorage.removeItem("user")
    }, [])

    return(
        <div>
            You have been logged out.
        </div>
    )
}

export default Logout;
import React from "react";

const Logout = () => {
    localStorage.removeItem("auth_token")
    return(
        <div>
            You have been logged out.
        </div>
    )
}

export default Logout;
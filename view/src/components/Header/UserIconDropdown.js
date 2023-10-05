import React from "react";
import { NavLink } from "react-router-dom";


const UserIconDropdown = ({userInfo}) => {
    
    return (
        <section className="header-function-dropdown-cube">
            <NavLink className="header-function-dropdown-list"
                to={`/${userInfo.firstName.toLowerCase()}`}
            >
                Profile
            </NavLink>
            <NavLink className="header-function-dropdown-list"
                to='/orders'
            >
                My Orders
            </NavLink>
            <NavLink className="header-function-dropdown-list"
                
            >
                Log Out
            </NavLink>
        </section>
    )
}


export default UserIconDropdown;

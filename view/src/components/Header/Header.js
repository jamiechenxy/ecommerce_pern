import "../../stylesheets/Header.css";
import React from "react";
import { NavLink } from "react-router-dom";
import { selectLoginStatus, selectUser } from "../../features/sessionSlice";
import { useSelector } from "react-redux";

const Header = () => {
    const loginStatus = useSelector(selectLoginStatus);
    const userInfo = useSelector(selectUser);

    return(
        <>
            <div id={loginStatus ? "user-active-header" : "primitive-header"}>
                <NavLink className={({isActive})=>isActive?"active-navigator":"navigator"} to="/">Home</NavLink>
                <NavLink className={({isActive})=>isActive?"active-navigator":"navigator"} to="/product">Product</NavLink>
                {
                loginStatus ?
                    <>
                    <NavLink className={({isActive})=>isActive?"active-navigator":"navigator"} to={`/${userInfo.firstName.toLowerCase()}`}>
                        Profile
                    </NavLink>
                    <NavLink className={({isActive})=>isActive?"active-navigator":"navigator"} to="/cart">My Cart</NavLink>
                    <NavLink className={({isActive})=>isActive?"active-navigator":"navigator"} to="/orders">My Oders</NavLink>
                    </>
                : 
                    <>
                    <NavLink className={({isActive})=>isActive?"active-navigator":"navigator"} to="/login">Login</NavLink>
                    <NavLink className={({isActive})=>isActive?"active-navigator":"navigator"} to="/register">Register</NavLink>
                    </>
                }

            </div>  

        </>
    );
};


export default Header;
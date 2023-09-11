import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser, selectLoginStatus, selectUser } from "../../features/sessionSlice";
import { useNavigate } from "react-router-dom";
import catImg from "../../img/profile_pic_cat.jpg";
import "../../stylesheets/User.css";

const User = () => {
    const userInfo = useSelector(selectUser);
    const loginStatus = useSelector(selectLoginStatus);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    useEffect(() => {
        if (!loginStatus) {
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        }
    }, []);

    const handleSignOut = async(e) => {
        e.preventDefault();
        await dispatch(logOutUser());
        navigate('/login');
    };


    return (
        <>
        {
            !loginStatus 
            ?   
            <>
                <h4>You have not signed in. Redirecting to login page in 3 seconds...</h4>
            </>
            :
            <div id="profile-page-body-container">

                <h2 id="profile-page-greeting">
                    {userInfo.firstName}, Welcome Back! 
                </h2>

                <div id="profile-page-main-container">
                    
                    <img id="user-profile-pic" alt="user-profile-pic"
                        src={userInfo.picture || catImg} 
                    />

                    <div id="profile-page-user-info-box">
                        <h3 id="profile-page-user-name">
                            {<span>{userInfo.firstName} {userInfo.lastName}</span>|| ''}
                        </h3>
                        <button id="edit-profile-button">
                            <h5>Edit</h5>
                        </button>
                    </div>

                </div>

                <button id="sign-out-button" onClick={handleSignOut}>
                    <h4>Sign Out</h4>
                </button>

            </div>
        }
        </>
    );

};

export default User;